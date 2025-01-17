package auth

import (
	"context"
	"fmt"
	"net/http"
	"time"
)

func SetCookie(ctx context.Context,token string) {
	w, ok := ctx.Value("ResponseWriter").(http.ResponseWriter)
	if !ok {
		fmt.Println("ResponseWriter not found")
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "jwt-token",
		Value:    token,
		Expires:  time.Now().Add(72 * time.Hour),
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		//Secure:   true,
	})
}