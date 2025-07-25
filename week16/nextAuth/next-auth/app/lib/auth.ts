
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH_CONFIG = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: any) {

              return {
                  id: "user1",
                  name: "asd",
                  userId: "asd",
                  email: "ramdomEmail"
              };
          },
        }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET|| ""
      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // jwt: async ({ user, token }: any) => {
        //   if (user) {
        //     token.uid = user.id;
        //   }
        // return token;
        // },
        session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.sub
          }
          console.log(session);
          return session
        },
        pages:{
          signIn: "/signin"
        }
    },
  }