-- name: GetItems :many
SELECT * FROM items
WHERE page = $1;

-- name: GetItem :one
SELECT * FROM items
WHERE id = $1;

-- name: CreateItem :one
INSERT INTO items(
    id,
    name,
    placement,
    content,
    page
) VALUES (
    $1, $2, $3, $4, $5
)
RETURNING *;


-- name: UpdateItem :one
UPDATE items
SET name = $1,
    placement = $2,
    content = $3
WHERE id = $4
RETURNING *;


-- name: DeleteItem :one
DELETE FROM items
WHERE id = $1
RETURNING *;
