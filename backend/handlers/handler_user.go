package handlers

import (
	"am_server/internal/sqlcDB"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// //// GET ALL USERS \\\\\\
func (p *connPool) GetUsers(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	q := queries.New(p.DB)

	users, err := q.GetUsers(ctx)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Cannot retrieve users %v", err)
		return
	}
    
	JSONRes(w, 200, users)
}

// //// GET A SINGLE USER \\\\\\
func (p *connPool) GetUser(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Username string `json:"username"`
	}
    type msg struct {

        Msg string `json:"message"`
    }

	params := parameters{}
	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}
    
}

// //// CREATE A USER \\\\\\
func (p *connPool) CreateUser(w http.ResponseWriter, r *http.Request) {
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
	}
    
	hashed := string(bytes)

	ctx := context.Background()

	q := queries.New(p.DB)

		user, err := q.CreateUser(ctx, queries.CreateUserParams{
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Username:  params.Username,
		Password:  hashed,
	})

    if err != nil {
		fmt.Println("Couldn't delete nav item:", err)
	}


	JSONRes(w, 200, user)
}

// //// UPDATE USER PASSWORD \\\\\\
func (p *connPool) UpdateUserPassword(w http.ResponseWriter, r *http.Request) {
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

	q := queries.New(p.DB)

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

	JSONRes(w, 200, user)
}

// //// UPDATE USER USERNAME \\\\\\
func (p *connPool) UpdateUserUsername(w http.ResponseWriter, r *http.Request) {
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

	q := queries.New(p.DB)

	user, err := q.UpdateUserUsername(ctx, queries.UpdateUserUsernameParams{
		Username:   params.NewUsername,
		UpdatedAt:  time.Now(),
		Username_2: params.Username,
	})

	JSONRes(w, 200, user)
}

// //// DELETE USER \\\\\\
func (p *connPool) DeleteUser(w http.ResponseWriter, r *http.Request) {
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

	q := queries.New(p.DB)

	delErr := q.DeleteNavItem(ctx, params.Username)
	if delErr != nil {
		fmt.Println("Couldn't delete user:", delErr)
	}

	JSONRes(w, 200, "Successfully deleted user")
}
