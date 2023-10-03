package handlers

import (
	"am_server/internal/sqlcDB"
	"context"
	"encoding/json"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type session struct {
	username string
	expiry   time.Time
}

type credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (s session) isExpired() bool {
	return s.expiry.Before(time.Now())
}

func (p *connPool) SignIn(w http.ResponseWriter, r *http.Request) {

	sessions := map[string]session{}
	creds := credentials{}

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	q := queries.New(p.DB)

	user, err := q.GetUser(ctx, creds.Username)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	isUser := bcrypt.CompareHashAndPassword([]byte(user.Password),
		[]byte(creds.Password))

	if isUser != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	sessionToken := "123454568-0987y6trghnrty435<F3>25<F2><F3>"
	expiresAt := time.Now().Add(120 * time.Second)

	sessions[sessionToken] = session{
		username: creds.Username,
		expiry:   expiresAt,
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   sessionToken,
		Expires: expiresAt,
	})

}
