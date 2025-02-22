package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/horiyuko0512/soccer-community/ent"
	"github.com/horiyuko0512/soccer-community/ent/migrate"
	"github.com/horiyuko0512/soccer-community/ent/user"
	"github.com/horiyuko0512/soccer-community/internal/auth"
	"github.com/horiyuko0512/soccer-community/internal/middleware"
	"github.com/horiyuko0512/soccer-community/resolver"
	"github.com/joho/godotenv"
	"github.com/vektah/gqlparser/v2/ast"

	_ "github.com/lib/pq"
)

const defaultPort = "8080"

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	dsn := os.Getenv("DB_URL")
	entOptions := []ent.Option{}
	entOptions = append(entOptions, ent.Debug())
	client, err := ent.Open("postgres", dsn, entOptions...)
	if err != nil {
		log.Fatalf("failed opening connection to postgres: %v", err)
	}
	defer client.Close()
	ctx := context.Background()
	err = client.Schema.Create(
		ctx,
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	)
	if err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.New(resolver.NewSchema(client))

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})

	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", middleware.AuthMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		setCorsHeaders(w)

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		ctx := context.WithValue(r.Context(), auth.ResponseWriterKey, w)
		r = r.WithContext(ctx)

		srv.ServeHTTP(w, r)
	})))
	http.HandleFunc("/refresh", func(w http.ResponseWriter, r *http.Request) {
		setCorsHeaders(w)

    if r.Method == "OPTIONS" {
      w.WriteHeader(http.StatusOK)
      return
    }

    newAccessToken, err := handleRefresh(r.Context(), client, r)
    if err != nil {
        log.Printf("Refresh failed: %v", err)
        http.Error(w, err.Error(), http.StatusUnauthorized)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"accessToken": newAccessToken})
	})

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func setCorsHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie")
}

func handleRefresh(ctx context.Context, client *ent.Client, r *http.Request) (string, error) {
	cookie, err := r.Cookie(os.Getenv("COOKIE_NAME"))
	if err != nil {
			return "", fmt.Errorf("refresh token not found")
	}

	refreshToken := cookie.Value
	user, err := client.User.Query().Where(user.RefreshTokenEQ(refreshToken)).Only(ctx)
	if err != nil {
			return "", fmt.Errorf("invalid refresh token")
	}

	newAccessToken, err := auth.GenerateJWT(user.ID.String())
	if err != nil {
			return "", fmt.Errorf("failed to generate access token")
	}

	newRefreshToken, err := auth.GenerateRefreshToken()
	if err != nil {
			return "", fmt.Errorf("failed to generate refresh token")
	}

	if _, err := client.User.UpdateOneID(user.ID).SetRefreshToken(newRefreshToken).Save(ctx); err != nil {
			return "", fmt.Errorf("failed to save refresh token")
	}

	http.SetCookie(r.Context().Value(auth.ResponseWriterKey).(http.ResponseWriter), &http.Cookie{
			Name:     os.Getenv("COOKIE_NAME"),
			Value:    newRefreshToken,
			Expires:  time.Now().Add(72 * time.Hour),
			HttpOnly: true,
			// Secure: true,
			SameSite: http.SameSiteLaxMode,
	})

	return newAccessToken, nil
}
