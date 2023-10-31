package handlers

import (
	"am_server/internal/sqlcDB"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

////// GET ALL PAGES \\\\\\
func (c *config) GetPages(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	q := queries.New(c.DB)

	pages, err := q.GetPages(ctx)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Cannot retrieve pages %v", err)
	}

    fmt.Println(pages)
}

////// CREATE A PAGE \\\\\\
func (c *config) CreatePage(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name      string `json:"name"`
		ItemOrder int32  `json:"item_order"`
		ItemShow  bool   `json:"item_show"`
	}
	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}
	ctx := context.Background()

	q := queries.New(c.DB)

	page, err := q.CreatePage(ctx, queries.CreatePageParams{
		Name:      params.Name,
		ItemOrder: params.ItemOrder,
		ItemShow:  params.ItemShow,
	})

	if err != nil {
		fmt.Println("Couldn't create page %v", err)
	}

    fmt.Println(page)
}

////// UPDATE \\\\\\

func (c *config) UpdatePage(w http.ResponseWriter, r *http.Request) {
	// "name_2 is the original name"
	type parameters struct {
		Name      string `json:"name"`
		ItemOrder int32  `json:"item_order"`
		ItemShow  bool   `json:"item_show"`
		Name_2    string `json:"name_2"`
	}

	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}
	log.Println(params)

	ctx := context.Background()

	q := queries.New(c.DB)

	page, err := q.UpdatePage(ctx, queries.UpdatePageParams{
		Name:      params.Name,
		ItemOrder: params.ItemOrder,
		ItemShow:  params.ItemShow,
		Name_2:    params.Name_2,
	})

	if err != nil {
		fmt.Println("Couldn't update page %v", err)
	}

    fmt.Println(page)
}

////// DELETE \\\\\\

func (c *config) DeletePage(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name string `json:"name"`
	}

	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}
	ctx := context.Background()

	q := queries.New(c.DB)

	page, err := q.DeletePage(ctx, params.Name)
	if err != nil {
		fmt.Println("Couldn't delete page %v", err)
	}

    fmt.Println(page)
}
