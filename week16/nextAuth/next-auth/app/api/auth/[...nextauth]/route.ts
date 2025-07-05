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


import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: 'email', type: 'text', placeholder: 'Enter email'},
                password: { label: 'password', type: 'password',placeholder: 'Enter password'},
            },
            //writing authorization logic developer have to write to authenticate
            async authorize(credentials: any){
                const username = credentials.username;
                const password = credentials.password;
                
                console.log(credentials)
                //abi to db ni h isily commenting
                // const user = await prisma.user.findOne({
                //     where: {
                //         email: username,
                //         password: password
                //     }
                // })

                // if(!user){
                //     return null; 
                // }

                // return {
                //     id: user.id,
                //     email: user.email
                // }

                return {
                    id: "user1",
                    name: "rishav singh",
                    email: "r@123"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET 
});

export const GET = handler;
export const POST = handler;