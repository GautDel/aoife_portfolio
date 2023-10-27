-- name: GetUsers :many
SELECT * FROM users;

-- name: GetUser :one
SELECT created_at, updated_at, password, username
FROM users 
WHERE username = $1;

-- name: CreateUser :one
INSERT INTO users (
  created_at,
  updated_at,
  username,
  password
) VALUES (
  $1, $2, $3, $4 
)
RETURNING *;

-- name: UpdateUserPassword :one
UPDATE users
SET password = $1, updated_at = $2
WHERE username = $3
RETURNING username;

-- name: UpdateUserUsername :one
UPDATE users
SET username = $1, updated_at = $2
WHERE username = $3
RETURNING username;

-- name: DeleteUser :one
DELETE FROM users 
WHERE username = $1
RETURNING username;

-- name: SetSession :exec
UPDATE users 
SET session_id = $1
WHERE username = $2;

-- name: Login :one
SELECT id, username, password FROM users
WHERE username = $1;


-- LogoutUser :exec
UPDATE users
SET session_id = $1
WHERE username = $2;
