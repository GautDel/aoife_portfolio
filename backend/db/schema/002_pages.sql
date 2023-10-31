-- +goose Up

CREATE TABLE pages(
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name VARCHAR(20) UNIQUE NOT NULL,
   item_show BOOLEAN NOT NULL,
   item_order INTEGER NOT NULL
);

-- +goose Down

DROP TABLE pages;
