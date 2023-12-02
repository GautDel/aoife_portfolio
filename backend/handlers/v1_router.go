package handlers

import (
    "github.com/go-chi/chi/v5"
)

func  V1(r chi.Router, cfg config) chi.Router {

    v1 := chi.NewRouter()

    r.Mount("/v1", v1)

    //v1.Use(cfg.AuthMiddleware)

    ////// GET \\\\\\
    v1.Get("/navigation", cfg.GetPages)
    v1.Get("/user", cfg.GetUser)
    v1.Get("/users", cfg.GetUsers)
    v1.Get("/items", cfg.GetItems)

    ////// POST \\\\\\
    v1.Post("/page", cfg.CreatePage)
    v1.Post("/user", cfg.CreateUser)
    v1.Post("/createitem", cfg.CreateItem)
    v1.Post("/item", cfg.DeleteItem)

    ////// PUT \\\\\\
    v1.Put("/page", cfg.UpdatePage)
    v1.Put("/updatepassword", cfg.UpdateUserPassword)
    v1.Put("/updateusername", cfg.UpdateUserUsername)
    v1.Put("/item", cfg.UpdateItem)

    ////// DELETE \\\\\\
    v1.Delete("/page", cfg.DeletePage)
    v1.Delete("/user", cfg.DeleteUser)

    ////// AUTH \\\\\\
    v1.Post("/login", cfg.Login)
    v1.Post("/logout", cfg.Logout)

    return r
}
