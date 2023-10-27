package handlers

import (
	"fmt"
	"html/template"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
    files := []string{
        "./ui/pages/login.html",
    }

    tmpl := template.Must(template.ParseFiles(files...))
    err := tmpl.ExecuteTemplate(w, "login", nil)
    if err != nil {
        fmt.Print(err.Error())
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    } 
}
