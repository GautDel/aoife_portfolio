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
    ory "github.com/ory/client-go"
)

type connPool struct {
	DB *pgxpool.Pool
}

type App struct {
    ory *ory.APIClient
}

func New() chi.Router {

	// Create new router
	r := chi.NewRouter()

	// Implement CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{
            "Accept", 
            "Authorization", 
            "Content-Type", 
            "X-CSRF-Token",
        },
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

    r.Use(middleware.Logger)
    r.Use(middleware.RequestID)
    r.Use(middleware.RealIP)
    r.Use(middleware.Recoverer)



    // ORY Initialisation
    proxyPort := os.Getenv("PROXY_PORT")
    if proxyPort == "" {
        log.Fatal("Ory proxy port does not exist...")
    }

    config := ory.NewConfiguration()
    config.Servers = ory.ServerConfigurations{
        {URL: fmt.Sprintf("http://localhost:%s/.ory", os.Getenv("PROXY_PORT"))},
    }

    app := &App{
        ory: ory.NewAPIClient(config),
    }

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
    Admin(r, app, cfg)
    V1(r, cfg)

	return r
}
