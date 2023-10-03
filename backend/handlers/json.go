package handlers

import (
  "net/http"
  "encoding/json"
  "log"
)


func ErrRes(w http.ResponseWriter, code int, msg string) {
 
  if code > 499 {
    log.Println("Responding with 5xx error:", msg)
  }

  type errRes struct {
    Error string `json:"error"`
  } 

  JSONRes(w, code, errRes{
    Error: msg,
  })

}

func JSONRes(w http.ResponseWriter, code int, payload interface{}) {
  data, err := json.Marshal(payload) 

  if err != nil {
    log.Printf("Failed to Marshal JSON response %v", payload)
    w.WriteHeader(500)
    return
  }

  w.Header().Add("Content-Type", "application/json") 
  w.WriteHeader(code)
  w.Write(data)
}
