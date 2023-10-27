package handlers

import (
	"am_server/connection"
	"context"
	"fmt"
	"log"
	"os"
    "net/http"
    
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
    "github.com/gorilla/sessions"
)


type config struct {
    Store *sessions.CookieStore
	DB *pgxpool.Pool
}

func New() chi.Router {

	// Create new router
	r := chi.NewRouter()

    // Allows us to serve up tailwind css and htmx files
    fs := http.FileServer(http.Dir("ui/dist"))

	// Implement CORS
	r.Use(cors.Handler(cors.Options{
        AllowedOrigins:   []string{"https://192.168.1.15:5174", "http://192.168.1.15:5174"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{
            "Accept", 
            "Authorization", 
            "Content-Type", 
            "X-CSRF-Token",
        },
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

    r.Use(middleware.Logger)
    r.Use(middleware.RequestID)
    r.Use(middleware.RealIP)
    r.Use(middleware.Recoverer)
    
    r.Handle("/ui/dist/*", http.StripPrefix("/ui/dist/", fs))

	// Connect to Database
    DBUrl := os.Getenv("DB_URL")
    if DBUrl == "" {
        log.Fatal("Database URL does not exist...")
    }

	ctx := context.Background()

	pool, err := db.NewConn(ctx, DBUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not create connection: %v", err)
	}

	// Use struct to pass global connection to handlers
    sessionKey := os.Getenv("SESSION_KEY")
    if sessionKey == "" {
        log.Fatal("Session Key does not exist. FIX ASAP")
    }
	cfg := config{
        Store: sessions.NewCookieStore([]byte(sessionKey)),
		DB: pool,
	}

	// Create version control for router
    Admin(r, cfg)
    V1(r, cfg)

	return r
}
