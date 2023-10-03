package handlers

import (
	"am_server/connection"
    "encoding/gob"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
    "github.com/gorilla/sessions"
)

type connPool struct {
	DB *pgxpool.Pool
}

func RestAPI() chi.Router {

	DBUrl := os.Getenv("DB_URL")
	if DBUrl == "" {
		log.Fatal("Database URL does not exist...")
	}

	// Create new router
	r := chi.NewRouter()

	// Implement CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

    gob.Register(map[string]interface{}{})

    os.Setenv("SESSION_KEY", secureCookie.GenerateRandomKey(32))
    var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

    session, err := store.Get(r, "session-name")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}



    // Set some session values.
	session.Values["foo"] = "bar"
	session.Values[42] = 43
	// Save it before we write to the response/return from the handler.
	err = session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
    }


	r.Use(middleware.Logger)


	// Connect to Database
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
	v1r := chi.NewRouter()

	// Mount which version of router we want
	r.Mount("/v1", v1r)

	// Routes
	v1r.Get("/", GetMainPage)

	// Nav item
	v1r.Get("/navitem", cfg.GetNavItems)
	v1r.Post("/navitem", cfg.CreateNavItems)
	v1r.Delete("/navitem", cfg.DeleteNavItems)
	v1r.Put("/navitem", cfg.UpdateNavItem)
  v1r.Get("/user", cfg.GetUser)
  v1r.Get("/users", cfg.GetUsers)
  v1r.Post("/users", cfg.CreateUser)



	v1r.Put("/updatepassword", cfg.UpdateUserPassword)
	v1r.Put("/updateusername", cfg.UpdateUserUsername)

  v1r.Post("/signin", cfg.SignIn)
  v1r.Get("/signin", cfg.SignIn)

	return r
}
