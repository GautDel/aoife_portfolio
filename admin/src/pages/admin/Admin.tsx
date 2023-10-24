import { useEffect } from "react"
import DataContainer from "../../components/DataContainer"
import Header from "../../components/Header"
import SideNav from "../../components/SideNav"

const Admin = () => {

    useEffect(() => {
        async function fetchData() {
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
                     console.log("not allowed")
                 } else if (res.status === 200) {
                     console.log("oh hey there")
                 } 

            } catch(err) {
                console.error(err)
            }
        }

        fetchData()
    },[])

    return (
            <>
                <div className="flex 
                    flex-col
                    h-[90vh] 
                    border 
                    rounded-md
                    absolute
                    top-2/4
                    left-2/4
                    bg-slate-300
                    -translate-x-2/4
                    -translate-y-2/4
                    border-slate-800 
                    w-[80vw] 
                    overflow-hidden">
                    <Header />
                    <div className="flex flex-row h-full">
                        <SideNav />
                        <div className="w-[70%] 
                                        h-[92%]
                                        flex
                                        mx-auto 
                                        content-center">
                                <DataContainer />
                            </div>
                        </div>
                    </div>
                </>
            )

}

export default Admin

