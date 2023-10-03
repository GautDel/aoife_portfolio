package auth

import (
	db "am_server/internal/sqlcDB"
	"net/http"
  
)

type authedHandler func(http.ResponseWriter, *http.Request, db.User)

func MiddleWareAuth() {

}
