// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0
// source: item.sql

package queries

import (
	"context"

	"github.com/google/uuid"
)

const createItem = `-- name: CreateItem :one
INSERT INTO items(
    id,
    name,
    placement,
    content,
    page
) VALUES (
    $1, $2, $3, $4, $5
)
RETURNING id, name, placement, content, page
`

type CreateItemParams struct {
	ID        uuid.UUID
	Name      string
	Placement string
	Content   string
	Page      string
}

func (q *Queries) CreateItem(ctx context.Context, arg CreateItemParams) (Item, error) {
	row := q.db.QueryRow(ctx, createItem,
		arg.ID,
		arg.Name,
		arg.Placement,
		arg.Content,
		arg.Page,
	)
	var i Item
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Placement,
		&i.Content,
		&i.Page,
	)
	return i, err
}

const deleteItem = `-- name: DeleteItem :one
DELETE FROM items
WHERE id = $1
RETURNING id, name, placement, content, page
`

func (q *Queries) DeleteItem(ctx context.Context, id uuid.UUID) (Item, error) {
	row := q.db.QueryRow(ctx, deleteItem, id)
	var i Item
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Placement,
		&i.Content,
		&i.Page,
	)
	return i, err
}

const getItem = `-- name: GetItem :one
SELECT id, name, placement, content, page FROM items
WHERE id = $1
`

func (q *Queries) GetItem(ctx context.Context, id uuid.UUID) (Item, error) {
	row := q.db.QueryRow(ctx, getItem, id)
	var i Item
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Placement,
		&i.Content,
		&i.Page,
	)
	return i, err
}

const getItems = `-- name: GetItems :many
SELECT id, name, placement, content, page FROM items
WHERE page = $1
`

func (q *Queries) GetItems(ctx context.Context, page string) ([]Item, error) {
	rows, err := q.db.Query(ctx, getItems, page)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Item
	for rows.Next() {
		var i Item
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Placement,
			&i.Content,
			&i.Page,
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

const updateItem = `-- name: UpdateItem :one
UPDATE items
SET name = $1,
    placement = $2,
    content = $3
WHERE id = $4
RETURNING id, name, placement, content, page
`

type UpdateItemParams struct {
	Name      string
	Placement string
	Content   string
	ID        uuid.UUID
}

func (q *Queries) UpdateItem(ctx context.Context, arg UpdateItemParams) (Item, error) {
	row := q.db.QueryRow(ctx, updateItem,
		arg.Name,
		arg.Placement,
		arg.Content,
		arg.ID,
	)
	var i Item
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Placement,
		&i.Content,
		&i.Page,
	)
	return i, err
}