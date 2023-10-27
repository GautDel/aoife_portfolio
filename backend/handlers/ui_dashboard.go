package handlers

import (
	"fmt"
	"html/template"
	"net/http"
)

func Dashboard(w http.ResponseWriter, r *http.Request) {
    files := []string{
        "./ui/pages/dashboard.html",
    }

    tmpl := template.Must(template.ParseFiles(files...))
    err := tmpl.ExecuteTemplate(w, "dashboard", nil)
    if err != nil {
        fmt.Print(err.Error())
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    } 
}
