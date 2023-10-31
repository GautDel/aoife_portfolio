package handlers

import (
	"fmt"
	"html/template"
	"net/http"
)

func Dashboard(w http.ResponseWriter, r *http.Request) {
    files := []string{
        "./ui/pages/dashboard.html",
        "./ui/pages/header.html",
        "./ui/pages/sidenav.html",
        "./ui/pages/sidenavButton.html",
        "./ui/pages/datacontainer.html",
        "./ui/pages/dataItem.html",
        "./ui/pages/postForm.html",
        "./ui/pages/putForm.html",
        "./ui/pages/deletePrompt.html",
    }

    tmpl := template.Must(template.ParseFiles(files...))
    err := tmpl.ExecuteTemplate(w, "dashboard", nil)
    if err != nil {
        fmt.Print(err.Error())
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    } 
}
