-- +goose Up

CREATE TABLE pages(
   id UUID PRIMARY KEY NOT NULL,
   name VARCHAR(20) UNIQUE NOT NULL,
   item_show BOOLEAN NOT NULL,
   item_order INTEGER NOT NULL
);

-- +goose Down

DROP TABLE pages;
