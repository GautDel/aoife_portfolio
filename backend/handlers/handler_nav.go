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

////// GET \\\\\\

func (p *connPool) GetNavItems(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	q := queries.New(p.DB)

	navItems, err := q.GetNavItems(ctx)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Cannot retreive nav items %v", err)
	}

	JSONRes(w, 200, navItems)
}

////// CREATE \\\\\\

func (p *connPool) CreateNavItems(w http.ResponseWriter, r *http.Request) {
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

	q := queries.New(p.DB)

	navItem, err := q.CreateNavItem(ctx, queries.CreateNavItemParams{
		Name:      params.Name,
		ItemOrder: params.ItemOrder,
		ItemShow:  params.ItemShow,
	})

	if err != nil {
		fmt.Println("Couldn't create nav item:", err)
	}

	JSONRes(w, 201, navItem)
}

////// UPDATE \\\\\\

func (p *connPool) UpdateNavItem(w http.ResponseWriter, r *http.Request) {
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

	q := queries.New(p.DB)

	updateErr := q.UpdateNavItem(ctx, queries.UpdateNavItemParams{
		Name:      params.Name,
		ItemOrder: params.ItemOrder,
		ItemShow:  params.ItemShow,
		Name_2:    params.Name_2,
	})

	if updateErr != nil {
		fmt.Println("Couldn't update nav item:", updateErr)
	}

	JSONRes(w, 200, "Successfully updated nav item")
}

////// DELETE \\\\\\

func (p *connPool) DeleteNavItems(w http.ResponseWriter, r *http.Request) {
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

	q := queries.New(p.DB)

	delErr := q.DeleteNavItem(ctx, params.Name)
	if delErr != nil {
		fmt.Println("Couldn't delete nav item:", delErr)
	}

	JSONRes(w, 200, "Successfully deleted nav item")
}
