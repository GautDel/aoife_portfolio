package handlers

import (
	"am_server/connection"
	"context"
	"fmt"
	"log"
	"os"
    
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
)

type connPool struct {
	DB *pgxpool.Pool
}

func New() chi.Router {

	// Create new router
	r := chi.NewRouter()

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
	cfg := connPool{
		DB: pool,
	}

	// Create version control for router
    Admin(r, cfg)
    V1(r, cfg)

	return r
}
