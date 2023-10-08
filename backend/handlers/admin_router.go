package handlers

import (
    "github.com/go-chi/chi/v5"
)

func  Admin(r chi.Router,  app *App, cfg connPool) chi.Router {

    a := chi.NewRouter()

    r.Mount("/admin", a)

    a.Use(app.sessionMiddleware)


    ////// GET \\\\\\
    a.Get("/navitem", cfg.GetNavItems)
    a.Get("/user", cfg.GetUser)
    a.Get("/users", cfg.GetUsers)
    a.Get("/signin", cfg.SignIn)

    ////// POST \\\\\\
    a.Post("/navitem", cfg.CreateNavItems)
    a.Post("/user", cfg.CreateUser)
    a.Post("/signin", cfg.SignIn)

    ////// PUT \\\\\\
    a.Put("/navitem", cfg.UpdateNavItem)
    a.Put("/updatepassword", cfg.UpdateUserPassword)
    a.Put("/updateusername", cfg.UpdateUserUsername)

    ////// DELETE \\\\\\
    a.Delete("/navitem", cfg.DeleteNavItems)
    a.Delete("/user", cfg.DeleteUser)

    return r
}
