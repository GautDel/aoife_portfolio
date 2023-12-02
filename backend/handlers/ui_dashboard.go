package handlers

import (
	queries "am_server/internal/sqlcDB"
	"context"
	"fmt"
	"html/template"
	"net/http"
	"os"

	"github.com/google/uuid"
)

type dashData struct {
    Pages []queries.Page 
    PageName string
    Items []queries.Item 
}

func (c *config) Dashboard(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	q := queries.New(c.DB)

	pages, err := q.GetPages(ctx)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Cannot retrieve pages %v", err)
	}

    items, err := q.GetItems(ctx, pages[0].Name)
    if err != nil {
		fmt.Fprintf(os.Stderr, "Cannot retrieve items, %v", err)
	}

    data := dashData{
        Pages: pages,
        PageName: "HOME",
        Items: items,
    }

     
    files := []string{
        "./ui/pages/dashboard.html",
        "./ui/pages/header.html",
        "./ui/pages/sidenav.html",
        "./ui/pages/sidenavButton.html",
        "./ui/pages/dataContainer.html",
        "./ui/pages/dataItem.html",
    }

    tmpl := template.Must(template.ParseFiles(files...))
    tmpErr := tmpl.ExecuteTemplate(w, "dashboard", data)
    if tmpErr != nil {
        fmt.Print(tmpErr)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    } 
}


func PostForm(w http.ResponseWriter, r *http.Request) {
    type FormData struct {
        Page string
    }

    files := []string{
        "./ui/pages/postForm.html",
    }

    data := FormData {
        Page: r.Header.Get("Hx-Trigger-Name"),
    }

    tmpl := template.Must(template.ParseFiles(files...))
    tmpErr := tmpl.ExecuteTemplate(w, "postForm", data)
    if tmpErr != nil {
        fmt.Print(tmpErr)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    }
}

func (c *config) EditForm(w http.ResponseWriter, r *http.Request) {

    itemID := uuid.MustParse(r.Header.Get("Hx-Trigger-Name"))
    ctx := context.Background()
	q := queries.New(c.DB)

	item, err := q.GetItem(ctx, itemID)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Cannot retrieve pages %v", err)
	}

    files := []string{
        "./ui/pages/putForm.html",
    }

    tmpl := template.Must(template.ParseFiles(files...))
    tmpErr := tmpl.ExecuteTemplate(w, "putForm", item)
    if tmpErr != nil {
        fmt.Print(tmpErr)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    }
}


func (c *config) ViewData(w http.ResponseWriter, r *http.Request) {
    itemID := uuid.MustParse(r.Header.Get("Hx-Trigger-Name"))

	ctx := context.Background()
	q := queries.New(c.DB)

	item, err := q.GetItem(ctx, itemID)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Cannot retrieve item %v", err)
	}
    files := []string{
        "./ui/pages/viewDataItem.html",
    }

    tmpl := template.Must(template.ParseFiles(files...))
    tmpErr := tmpl.ExecuteTemplate(w, "viewDataItem", item)
    if tmpErr != nil {
        fmt.Print(tmpErr)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    }
}

func (c *config) DeletePrompt(w http.ResponseWriter, r *http.Request) {

    itemID := uuid.MustParse(r.Header.Get("Hx-Trigger-Name"))
    ctx := context.Background()
	q := queries.New(c.DB)

	item, err := q.GetItem(ctx, itemID)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Cannot retrieve item %v", err)
	}

    files := []string{
        "./ui/pages/deletePrompt.html",
    }

    tmpl := template.Must(template.ParseFiles(files...))
    tmpErr := tmpl.ExecuteTemplate(w, "deletePrompt", item)
    if tmpErr != nil {
        fmt.Print(tmpErr)
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    }
}
