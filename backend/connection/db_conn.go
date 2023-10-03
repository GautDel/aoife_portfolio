package db

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5/pgxpool"
	"log"
	"os"
)

func NewConn(c context.Context, DBUrl string) (*pgxpool.Pool, error) {
	log.Printf("Establishing connection to %v...\n", os.Getenv("DB_NAME"))
	pool, err := pgxpool.New(c, DBUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not create connection pool: %v", err)
	}

	log.Printf("Succesfully connected to %v via connection pool...\n", os.Getenv("DB_NAME"))

	return pool, nil
}


