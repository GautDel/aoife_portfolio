-- +goose Up
CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL UNIQUE, 
  username VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

-- +goose Down
DROP TABLE users;
