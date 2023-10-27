package handlers

import (
	"net/http"
)

func (c *config )AuthMiddleware(next http.Handler ) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        session, _ := c.Store.Get(r, "admin")
        _, sessExists := session.Values["userID"]
        
        if (sessExists && r.URL.Path == "v1/login") ||
           (sessExists && r.URL.Path == "/admin/login") {
            http.Redirect(w, r, "/admin/dashboard", http.StatusSeeOther)
            return
        }

        if (r.URL.Path == "/v1/login") || 
        (r.URL.Path == "/admin/login"){
            next.ServeHTTP(w, r)
            return
        }

        if !sessExists {
            http.Redirect(w, r, "/admin/login", http.StatusSeeOther)
            return
        }

        next.ServeHTTP(w, r)
        return
    })
}
