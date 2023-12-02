package handlers

import (
	queries "am_server/internal/sqlcDB"
	"context"
	"fmt"
	"html/template"
	"net/http"
	"strings"

	"github.com/google/uuid"
)

type DashData struct {
        PageName string
		Items []queries.Item
}

func (c *config) GetItems(w http.ResponseWriter, r *http.Request) {
	

	ctx := context.Background()

	q := queries.New(c.DB)

	items, err := q.GetItems(ctx, r.Header.Get("Hx-Trigger-Name"))
	if err != nil {
		fmt.Printf("Could not get items, %v", err)
		return
	}

	data := DashData{
        PageName: strings.ToUpper(r.Header.Get("Hx-Trigger-Name")),
		Items: items,
	}

	files := []string{
		"./ui/pages/dataContainer.html",
		"./ui/pages/dataItem.html",
	}

	tmpl := template.Must(template.ParseFiles(files...))
	tmpErr := tmpl.ExecuteTemplate(w, "dataContainer", data)
	if tmpErr != nil {
		fmt.Print(tmpErr)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

func (c *config) CreateItem(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	q := queries.New(c.DB)

	item, err := q.CreateItem(ctx, queries.CreateItemParams{
		ID:        uuid.New(),
		Name:      r.PostFormValue("name"),
		Placement: strings.ToLower(r.PostFormValue("placement")),
		Content:   r.PostFormValue("content"),
		Page:      strings.ToLower(r.PostFormValue("page")),
	})
	if err != nil {
		fmt.Printf("Could not create item, %v", err)
		return
	}

    fmt.Printf("Item successfully create: %v", item)

    items, err := q.GetItems(ctx, strings.ToLower(r.PostFormValue("page")))
    if err != nil {
        fmt.Printf("Could not get items, %v", err)
        return
    }
    
	data := DashData{
        PageName: strings.ToUpper(r.PostFormValue("page")),
		Items: items,
	}

    files := []string{
		"./ui/pages/dataContainer.html",
		"./ui/pages/dataItem.html",
	}

	tmpl := template.Must(template.ParseFiles(files...))
	tmpErr := tmpl.ExecuteTemplate(w, "dataContainer", data)
	if tmpErr != nil {
		fmt.Print(tmpErr)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

func (c *config) UpdateItem(w http.ResponseWriter, r *http.Request) {
    itemID := uuid.MustParse(r.Header.Get("Hx-Trigger-Name"))
	ctx := context.Background()
	q := queries.New(c.DB)


	item, err := q.UpdateItem(ctx, queries.UpdateItemParams{
        Name: r.PostFormValue("name"),
        Placement: r.PostFormValue("placement"),
        Content: r.PostFormValue("content"),
        ID: itemID,
    })
    if err != nil {
        fmt.Printf("Could not update item, %v", err)
        return
    }
    
    fmt.Print(item)

    items, err := q.GetItems(ctx, strings.ToLower(r.PostFormValue("page")))
    if err != nil {
        fmt.Printf("Could not get items, %v", err)
        return
    }

	data := DashData{
        PageName: strings.ToUpper(r.PostFormValue("page")),
		Items: items,
	}

    files := []string{
		"./ui/pages/dataContainer.html",
		"./ui/pages/dataItem.html",
	}

	tmpl := template.Must(template.ParseFiles(files...))
	tmpErr := tmpl.ExecuteTemplate(w, "dataContainer", data)
	if tmpErr != nil {
		fmt.Print(tmpErr)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

func (c *config) DeleteItem(w http.ResponseWriter, r *http.Request) {
    itemID := uuid.MustParse(r.Header.Get("Hx-Trigger-Name"))
    ctx := context.Background()
	q := queries.New(c.DB)

    deletedItem, err := q.DeleteItem(ctx, itemID)
    if err != nil {
        fmt.Printf("Cannot delete item, %v", err)
    }

    fmt.Print(deletedItem)

    items, err := q.GetItems(ctx, strings.ToLower(r.PostFormValue("page")))
    if err != nil {
        fmt.Printf("Could not get items, %v", err)
        return
    }

    data := DashData{
        PageName: strings.ToUpper(r.PostFormValue("page")),
        Items: items,
    }

    files := []string{
        "./ui/pages/dataContainer.html",
        "./ui/pages/dataItem.html",
    }

    tmpl := template.Must(template.ParseFiles(files...))
    tmpErr := tmpl.ExecuteTemplate(w, "dataContainer", data)
    if tmpErr != nil {
        fmt.Print(tmpErr)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    }
}
