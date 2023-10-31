package handlers

import (
	"am_server/internal/sqlcDB"
	"context"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
)

////// GET ALL USERS \\\\\\
func (c *config) GetUsers(w http.ResponseWriter, r *http.Request) {

	ctx := context.Background()

	q := queries.New(c.DB)

	users, err := q.GetUsers(ctx)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Cannot retrieve users %v", err)
		return
	}

    fmt.Println(users)
}

////// GET A SINGLE USER UPDATE THIS\\\\\\
func (c *config) GetUser(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Username string `json:"username"`
	}

	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}
}

////// CREATE A USER \\\\\\
func (c *config) CreateUser(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}
    
	// Password hashing
	bytes, err := bcrypt.GenerateFromPassword([]byte(params.Password), 14)
	if err != nil {
		fmt.Printf("Something went wrong with password creation %v", err)
        return
	}
    
	hashed := string(bytes)

	ctx := context.Background()

	q := queries.New(c.DB)

		user, err := q.CreateUser(ctx, queries.CreateUserParams{
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Username:  params.Username,
		Password:  hashed,
	})

    if err != nil {
		fmt.Println("Couldn't create user", err)
	}
    
    fmt.Printf("User created: %v", user.Username)
}

/////// LOGIN A USER \\\\\\
func (c *config) Login(w http.ResponseWriter, r *http.Request) {

    session, _ := c.Store.Get(r, "admin")
    _, sessExists := session.Values["userID"]
    if sessExists {
        http.Redirect(w, r, "/admin/dashboard", http.StatusSeeOther)
        return
    }

    type Credentials struct {
        Username string
        Password string
    }

    creds := Credentials{
        Username: r.PostFormValue("username"),        
        Password: r.PostFormValue("password"),        
    }

    ctx := context.Background()

    q := queries.New(c.DB) 
    user, err := q.Login(ctx, creds.Username)
    if err != nil {
        http.Error(w, "Wrong Credentials", http.StatusUnauthorized)
        return
    }

    err = bcrypt.CompareHashAndPassword(
        []byte(user.Password), 
        []byte(creds.Password))
    if err != nil {
        http.Error(w, "Wrong Credentials", http.StatusUnauthorized)
        return
    }

    session.Options = &sessions.Options{
        Path: "/",
        Domain: "192.168.1.15",
        MaxAge: 28800, // 8 hours
        Secure: false,
        HttpOnly: true,
        SameSite: http.SameSiteStrictMode,
    }

    session.Values["userID"] = hex.EncodeToString(user.ID.Bytes[:])  
    sessErr := session.Save(r, w)
    if sessErr != nil {
        http.Error(w, sessErr.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Add("HX-Redirect", "http://192.168.1.15:8080/admin/dashboard")
}

////// LOGOUT A USER \\\\\\
func (c *config) Logout(w http.ResponseWriter, r *http.Request) {
    fmt.Println("logout hit")
    session, _ := c.Store.Get(r, "admin")
    session.Options.MaxAge = -1
    sessErr := session.Save(r, w)
    if sessErr != nil {
        http.Error(w, sessErr.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Add("HX-Redirect", "http://192.168.1.15:8080/admin/login")
}


////// UPDATE USER PASSWORD \\\\\\
func (c *config) UpdateUserPassword(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		NewPassword string `json:"new_password"`
		Username    string `json:"username"`
	}

	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}

	ctx := context.Background()

	q := queries.New(c.DB)

	// Password hashing
	bytes, err := bcrypt.GenerateFromPassword([]byte(params.NewPassword), 14)
	if err != nil {
		fmt.Printf("Something went wrong with password creation %v", err)
	}

	hashed := string(bytes)

	user, err := q.UpdateUserPassword(ctx, queries.UpdateUserPasswordParams{
		Password:  hashed,
		UpdatedAt: time.Now(),
		Username:  params.Username,
	})

    fmt.Printf("Password changed for user: %v", user)
}


// //// UPDATE USER USERNAME \\\\\\
func (c *config) UpdateUserUsername(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		NewUsername string `json:"new_username"`
		Username    string `json:"username"`
	}

	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}

	ctx := context.Background()

	q := queries.New(c.DB)

	user, err := q.UpdateUserUsername(ctx, queries.UpdateUserUsernameParams{
		Username:   params.NewUsername,
		UpdatedAt:  time.Now(),
		Username_2: params.Username,
	})

    fmt.Printf("Username changed for user: %v", user)
}

// //// DELETE USER \\\\\\
func (c *config) DeleteUser(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Username string `json:"username"`
	}

	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}
	ctx := context.Background()

	q := queries.New(c.DB)

	user, err := q.DeleteUser(ctx, params.Username)
	if err != nil {
		fmt.Println("Couldn't delete user %v", err)
	}

    fmt.Printf("User: %v deleted", user)
}
