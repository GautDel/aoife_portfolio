-- +goose Up
ALTER TABLE pages
ADD tab_color VARCHAR(20) NOT NULL DEFAULT '#ffffff';

-- +goose Down
ALTER TABLE pages
DROP COLUMN tab_color;
