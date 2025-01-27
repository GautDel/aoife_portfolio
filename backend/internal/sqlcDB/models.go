// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0

package queries

import (
	"time"

	"github.com/google/uuid"
)

type Item struct {
	ID        uuid.UUID
	Name      string
	Placement string
	Content   string
	Page      string
}

type Page struct {
	ID        uuid.UUID
	Name      string
	ItemShow  bool
	ItemOrder int32
	TabColor  string
}

type User struct {
	ID        uuid.UUID
	Username  string
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}
