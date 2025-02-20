package auth

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"
)

type contextKey string
const ResponseWriterKey contextKey = "ResponseWriter"

func SetCookie(ctx context.Context,token string) {
	w, ok := ctx.Value(ResponseWriterKey).(http.ResponseWriter)
	if !ok {
		fmt.Println("ResponseWriter not found")
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     os.Getenv("COOKIE_NAME"),
		Value:    token,
		Expires:  time.Now().Add(72 * time.Hour),
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		//Secure:   true,
	})
}