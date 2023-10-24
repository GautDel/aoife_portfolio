package handlers

import (
	queries "am_server/internal/sqlcDB"
	"context"
	"net/http"
    "os"
    "log"
	"golang.org/x/crypto/bcrypt"
    "github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

func (p *connPool )AuthMiddleware(next http.Handler ) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Get a session
        session, _ := store.Get(r, "admin")
        log.Print(session.Values)

         _, sessExists := session.Values["username"]
         log.Print(sessExists)
         if !sessExists {
        // Check credentials and create session
        
        // Get username and password from "Autherization header"
        username, password, ok := r.BasicAuth()
        if ok {
            // Establish DB connection and search for user by username
            ctx := context.Background()

            q := queries.New(p.DB) 
            user, err := q.GetUser(ctx, username)
            if err != nil {
                http.Redirect(w, r, "http://192.168.1.15:5174/login", http.StatusUnauthorized)
                w.Header().Set("WWW-Authenticate", 
                `Basic realm="admin", charset="UTF-8"`)
                return
            }

            err = bcrypt.CompareHashAndPassword(
                []byte(user.Password), 
                []byte(password))

            if err != nil {
                http.Redirect(w, r, "http://192.168.1.15:5174/login", http.StatusUnauthorized)
                w.Header().Set("WWW-Authenticate", 
                `Basic realm="admin", charset="UTF-8"`)
                return
            }

            // Set Session options
            session.Options = &sessions.Options{
                Path: "/",
                Domain: "192.168.1.15:5174",
                MaxAge: 60 * 15,
                Secure: false,
                HttpOnly: false,
                SameSite: http.SameSiteLaxMode,
            }

            session.Values["username"] = user.Username
            sessErr := session.Save(r, w)
            if sessErr != nil {
                http.Error(w, sessErr.Error(), http.StatusInternalServerError)
                return
            }

            log.Print("session is set")
            next.ServeHTTP(w, r)
            return
        }
    }

        if sessExists {
            log.Printf("logged in")
            http.Redirect(w, r, "http://192.168.1.15:5174/admin", http.StatusSeeOther)
            next.ServeHTTP(w, r)
            return
        }

        log.Print("apparently session doesnt exist")
        http.Redirect(w, r, "http://192.168.1.15:5174/login", http.StatusUnauthorized)
        w.Header().Set("WWW-Authenticate", 
                       `Basic realm="admin", charset="UTF-8"`)
    })
}
