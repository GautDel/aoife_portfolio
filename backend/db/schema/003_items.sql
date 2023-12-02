-- +goose Up

CREATE TABLE items(
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    placement VARCHAR(50) NOT NULL,
    content VARCHAR(1000) NOT NULL, 
    page VARCHAR(20) REFERENCES pages(name) NOT NULL
);

-- +goose Down

DROP TABLE items;
