import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) => {

    useEffect(() => {
        async function isLoggedIn() {
          try {
            const res = await fetch("http://192.168.1.15:8080/admin/users", {
                                method: "GET",
                                headers: {
                                    "content-type": "application/json"
                                },
                                redirect: 'follow'
                              })
                 console.log(res)

                 if(res.status === 401) {
                     return <Navigate to="/login"/>

                 } else if(res.status === 200) {
                    return children
                 } 
            } catch(err) {
                console.error(err)
            }
        }

        isLoggedIn()
    }, [children])

    return (
        <>
    
        </>
    )
}

export default PrivateRoute
