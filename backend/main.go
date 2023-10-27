package main

import (
	"am_server/handlers"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
    // Load env variables
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    port := os.Getenv("PORT")

    s := &http.Server{
        Addr:    ":" + port,
        Handler: handlers.New(),
    }
    log.Printf("Server listening on port %v...", port)
    log.Fatal(s.ListenAndServe())
}

