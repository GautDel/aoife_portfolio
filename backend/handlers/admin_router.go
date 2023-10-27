package handlers

import (
	"github.com/go-chi/chi/v5"
)

func Admin(r chi.Router, cfg config) chi.Router {

	a := chi.NewRouter()

	r.Mount("/admin", a)

    a.Use(cfg.AuthMiddleware)


	////// UI \\\\\\
	a.Get("/login", Login)
    a.Get("/dashboard", Dashboard)

	return r
}
