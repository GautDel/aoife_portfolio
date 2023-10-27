package handlers

import (
    "github.com/go-chi/chi/v5"
)

func  V1(r chi.Router, cfg config) chi.Router {

    v1 := chi.NewRouter()

    r.Mount("/v1", v1)

    v1.Use(cfg.AuthMiddleware)

    ////// GET \\\\\\
    v1.Get("/navitem", cfg.GetNavItems)
    v1.Get("/user", cfg.GetUser)
    v1.Get("/users", cfg.GetUsers)

    ////// POST \\\\\\
    v1.Post("/navitem", cfg.CreateNavItems)
    v1.Post("/user", cfg.CreateUser)

    ////// AUTH \\\\\\
    v1.Post("/login", cfg.Login)
    v1.Post("/logout", cfg.Logout)


    ////// PUT \\\\\\
    v1.Put("/navitem", cfg.UpdateNavItem)
    v1.Put("/updatepassword", cfg.UpdateUserPassword)
    v1.Put("/updateusername", cfg.UpdateUserUsername)

    ////// DELETE \\\\\\
    v1.Delete("/navitem", cfg.DeleteNavItems)
    v1.Delete("/user", cfg.DeleteUser)

    return r
}
