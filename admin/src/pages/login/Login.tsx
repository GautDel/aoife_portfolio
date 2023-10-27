import { useEffect, useState } from "react"

const Login = () => {
    interface credentials {
        username: string
        password: string
    }
    
    const [creds, setCreds] = useState<credentials>({
                                username: "", 
                                password: ""
                              })


    const [initLoad, setInitLoad] = useState(true)
    const [error, setError] = useState("")
    const encodedCreds = btoa(`${creds.username}:${creds.password}`)

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setCreds({
            ...creds,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }


    useEffect(() => {
        async function isLoggedIn() {
          try {
            const res = await fetch("http://192.168.1.15:8080/admin/login", {
                                method: "GET",
                                headers: {
                                    "content-type": "application/json"
                                },
                                credentials: 'include',
                                redirect: 'follow'
                              })

                 if(res.status === 401) {
                     setError("Please login to continue")

                 } else if(res.status === 200) {
                    window.location.href = res.url 
                 }

            } catch(err) {
                console.error(err)
            }
        }

        if(initLoad) {
            isLoggedIn()
            setInitLoad(false)
        }

    }, [initLoad, encodedCreds])

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const res = await fetch("http://192.168.1.15:8080/admin/users", {
                                headers: {
                                    "authorization": `basic ${encodedCreds}`,
                                    "content-type": "application/json"
                                },
                                credentials: 'include',
                                redirect: 'follow'
                              })

            if(res.status === 401) {
                setError("Bad credentials")
            } else if(res.status === 200) {
                window.location.href = res.url
            }

         } catch(err) {
            console.error(err)
         }
    }

    return (
        <>
            <div className="flex 
                            flex-col
                            w-[400px]
                            border 
                            px-4
                            pb-10
                            rounded-md
                            content-center
                            justify-center
                            absolute
                            top-2/4
                            left-2/4
                            bg-slate-700
                            -translate-x-2/4
   ./ui/pages/.html                         -translate-y-2/4
                            overflow-hidden" >

                <h1 className="text-white
                               font-semibold
                               text-xl
                               py-7
                               text-center">LOGIN</h1>

                <form onSubmit={e => submitHandler(e)} className="flex flex-col">
                    <input type="text"
                        id="username"
                        placeholder="username"
                        name="username"
                        onChange={e => inputHandler(e)}
                        className="border-2 
                                      mb-4
                                      rChangeounded-sm 
                                      pl-2
                                      py-[0.35rem]
                                      bg-white
                                      text-lg
                                      text-slate-600
                                      focus:border-emerald-600
                                      outline-none
                                      "/>

                    <input type="password"
                        id="password"
                        placeholder="password"
                        name="password"
                        onChange={e => inputHandler(e)}
                        className="border-2 
                                      rounded-sm 
                                      pl-2
                                      py-[0.35rem]
                                      mb-4
                                      bg-white
                                      text-lg
                                      text-slate-600
                                      focus:border-emerald-600
                                      outline-none
                                      "/>

                    <button type="submit"
                        className="bg-emerald-500
                                   hover:bg-emerald-600
                                   w-[100%]
                                   rounded-full
                                   py-[0.6rem]
                                   font-semibold 
                                   text-white">LOGIN</button>
                </form>

                <p>{error}</p>
            </div>
        </>
    )
}

export default Login
