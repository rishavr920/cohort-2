"use client"
import { useRouter } from "next/navigation"
import { signIn, signOut } from "next-auth/react"

export const AppBar = () => {
    // const router = useRouter();

    // return (
    //     <div>
    //         <button onClick = {() => {
    //             router.push("/api/auth/signin")
    //         }
    //     }>SignIn</button>
    //     </div>
    // )

    return (
        <div>
            <button onClick={()=> signIn()}>Signin</button>
            <button onClick={()=> signOut()}>Signout</button>
        </div>
    )
}