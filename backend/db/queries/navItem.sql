-- name: GetPages :many
SELECT * FROM pages;

-- name: CreatePage :one
INSERT INTO pages (
  name,
  item_order,
  item_show
) VALUES (
  $1, $2, $3 
)
RETURNING *;

-- name: UpdatePage :one
UPDATE pages
SET name = $1, item_order = $2, item_show = $3
WHERE name = $4
RETURNING name;

-- name: DeletePage :one
DELETE FROM pages 
WHERE name = $1
RETURNING name;
