-- +goose Up
ALTER TABLE users ADD COLUMN session_id VARCHAR(172) NOT NULL DEFAULT '';

-- +goose Down
ALTER TABLE users DROP COLUMN session_id;
