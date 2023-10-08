package handlers

import (
    "github.com/go-chi/chi/v5"
)

func  V1(r chi.Router, cfg connPool) chi.Router {

    v1 := chi.NewRouter()

    r.Mount("/v1", v1)


    ////// GET \\\\\\
    v1.Get("/navitem", cfg.GetNavItems)
    v1.Get("/user", cfg.GetUser)
    v1.Get("/users", cfg.GetUsers)
    v1.Get("/signin", cfg.SignIn)

    ////// POST \\\\\\
    v1.Post("/navitem", cfg.CreateNavItems)
    v1.Post("/user", cfg.CreateUser)
    v1.Post("/signin", cfg.SignIn)

    ////// PUT \\\\\\
    v1.Put("/navitem", cfg.UpdateNavItem)
    v1.Put("/updatepassword", cfg.UpdateUserPassword)
    v1.Put("/updateusername", cfg.UpdateUserUsername)

    ////// DELETE \\\\\\
    v1.Delete("/navitem", cfg.DeleteNavItems)
    v1.Delete("/user", cfg.DeleteUser)

    return r
}
