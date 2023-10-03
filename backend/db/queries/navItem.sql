-- name: GetNavItems :many
SELECT * FROM nav_item;

-- name: CreateNavItem :one
INSERT INTO nav_item (
  name,
  item_order,
  item_show
) VALUES (
  $1, $2, $3 
)
RETURNING *;

-- name: UpdateNavItem :exec
UPDATE nav_item
SET name = $1, item_order = $2, item_show = $3
WHERE name = $4;

-- name: DeleteNavItem :exec
DELETE FROM nav_item 
WHERE name = $1;
