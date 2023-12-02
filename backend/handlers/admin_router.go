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
    a.Get("/dashboard", cfg.Dashboard)
    a.Get("/postform", PostForm)
    a.Get("/editform", cfg.EditForm)
    a.Get("/viewitem", cfg.ViewData)
    a.Get("/deleteprompt", cfg.DeletePrompt)


	return r
}
