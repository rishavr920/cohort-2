// import { NextRequest, NextResponse } from "next/server"

// export function GET(
//     req: NextRequest ,
//     { params } : { params: { authRoutes: string[] } }
// ){
//     console.log(params.authRoutes)
//     return NextResponse.json({
//         message: "HELlo"
//     })
// } 


import { NEXT_AUTH_CONFIG } from "@/app/lib/auth"
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
// const handler = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: { label: 'email', type: 'text', placeholder: 'Enter email'},
//                 password: { label: 'password', type: 'password',placeholder: 'Enter password'},
//             },
//             //writing authorization logic developer have to write to authenticate
//             async authorize(credentials: any){
//                 const username = credentials.username;
//                 const password = credentials.password;
                
//                 console.log(credentials)
//                 //abi to db ni h isily commenting
//                 // const user = await prisma.user.findOne({
//                 //     where: {
//                 //         email: username,
//                 //         password: password
//                 //     }
//                 // })

//                 // if(!user){
//                 //     return null; 
//                 // }

//                 // return {
//                 //     id: user.id,
//                 //     email: user.email
//                 // }

//                 return {
//                     id: "user1",
//                     name: "rishav singh",
//                     email: "r@123"
//                 }
//             }
//         })
//     ],
//     secret: process.env.NEXTAUTH_SECRET 
//     // callbacks: {
//     //     session: ({ session,token,user } : any) => {
//     //         console.log(session)
//     //         if()
//     //     }
//     // }
// });


const handler = NextAuth(NEXT_AUTH_CONFIG)

export { handler as GET, handler as POST}