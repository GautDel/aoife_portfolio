package handlers

import (
  "net/http"
)


func GetMainPage(w http.ResponseWriter, r *http.Request) {
  w.Write([]byte("Welcome to main page... This is being routed")) 
}
