// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0
// source: user.sql

package queries

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users (
  created_at,
  updated_at,
  username,
  password
) VALUES (
  $1, $2, $3, $4 
)
RETURNING id, username, password, created_at, updated_at
`

type CreateUserParams struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	Username  string
	Password  string
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, createUser,
		arg.CreatedAt,
		arg.UpdatedAt,
		arg.Username,
		arg.Password,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Password,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteUser = `-- name: DeleteUser :one
DELETE FROM users 
WHERE username = $1
RETURNING username
`

func (q *Queries) DeleteUser(ctx context.Context, username string) (string, error) {
	row := q.db.QueryRow(ctx, deleteUser, username)
	err := row.Scan(&username)
	return username, err
}

const getUser = `-- name: GetUser :one
SELECT created_at, updated_at, password, username
FROM users 
WHERE username = $1
`

type GetUserRow struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	Password  string
	Username  string
}

func (q *Queries) GetUser(ctx context.Context, username string) (GetUserRow, error) {
	row := q.db.QueryRow(ctx, getUser, username)
	var i GetUserRow
	err := row.Scan(
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Password,
		&i.Username,
	)
	return i, err
}

const getUsers = `-- name: GetUsers :many
SELECT id, username, password, created_at, updated_at FROM users
`

func (q *Queries) GetUsers(ctx context.Context) ([]User, error) {
	rows, err := q.db.Query(ctx, getUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.Username,
			&i.Password,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const login = `-- name: Login :one
SELECT id, username, password FROM users
WHERE username = $1
`

type LoginRow struct {
	ID       pgtype.UUID
	Username string
	Password string
}

func (q *Queries) Login(ctx context.Context, username string) (LoginRow, error) {
	row := q.db.QueryRow(ctx, login, username)
	var i LoginRow
	err := row.Scan(&i.ID, &i.Username, &i.Password)
	return i, err
}

const updateUserPassword = `-- name: UpdateUserPassword :one
UPDATE users
SET password = $1, updated_at = $2
WHERE username = $3
RETURNING username
`

type UpdateUserPasswordParams struct {
	Password  string
	UpdatedAt time.Time
	Username  string
}

func (q *Queries) UpdateUserPassword(ctx context.Context, arg UpdateUserPasswordParams) (string, error) {
	row := q.db.QueryRow(ctx, updateUserPassword, arg.Password, arg.UpdatedAt, arg.Username)
	var username string
	err := row.Scan(&username)
	return username, err
}

const updateUserUsername = `-- name: UpdateUserUsername :one
UPDATE users
SET username = $1, updated_at = $2
WHERE username = $3
RETURNING username
`

type UpdateUserUsernameParams struct {
	Username   string
	UpdatedAt  time.Time
	Username_2 string
}

func (q *Queries) UpdateUserUsername(ctx context.Context, arg UpdateUserUsernameParams) (string, error) {
	row := q.db.QueryRow(ctx, updateUserUsername, arg.Username, arg.UpdatedAt, arg.Username_2)
	var username string
	err := row.Scan(&username)
	return username, err
}
