package handlers

import (
	"am_server/internal/sqlcDB"
	"context"
	"crypto/rand"
	"encoding/json"
	"net/http"
	"time"
    "encoding/base64"
    "log"
	"golang.org/x/crypto/bcrypt"
)

type credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (p *connPool) SignIn(w http.ResponseWriter, r *http.Request) {
    
	creds := credentials{}

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
        log.Print("Failed body  check")
		return
	}

	ctx := context.Background()
	q := queries.New(p.DB)

	user, err := q.GetUser(ctx, creds.Username)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
        log.Print("Couldnt get user")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

    // If user exists, check if credentials are correct
	isUser := bcrypt.CompareHashAndPassword([]byte(user.Password),
    []byte(creds.Password))
	if isUser != nil {
		w.WriteHeader(http.StatusBadRequest)
        log.Print("Failed password check")
		return
	}

    // Create session here
    buf := make([]byte, 128)
    _, byteErr := rand.Read(buf)
    if byteErr != nil {
        log.Fatalf("error while generating random string: %s", byteErr)
    }

    log.Printf("username: %v", user.Username)


    sessionToken := base64.StdEncoding.EncodeToString(buf)
    sessTokenLen := len(sessionToken)
    expiresAt := time.Now().Add(120 * time.Second)
    log.Printf("token length is: %v", sessTokenLen)


    sessErr := q.LoginUser(ctx, queries.LoginUserParams{
        SessionID: sessionToken,
        Username: user.Username,
    }) 


    if sessErr  != nil {
        
        log.Printf("error: %v", sessErr)
		w.WriteHeader(http.StatusBadRequest)
		return
    }

  http.SetCookie(w,&http.Cookie{
    Name: "session_token",
    Value: sessionToken,
    Expires: expiresAt,
  })
}
