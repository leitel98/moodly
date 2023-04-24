import { compare } from 'bcryptjs'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToMongoDB } from '../../../lib/mongodb'
import User from '../../../models/user'
import { IUser } from '<leitel>/types'

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env

if(!GOOGLE_CLIENT_ID) {
  throw new Error("Invalid env variable: GOOGLE_CLIENT_ID")
}
if(!GOOGLE_CLIENT_SECRET) {
  throw new Error("Invalid env variable: GOOGLE_CLIENT_SECRET")
}

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // check if valid
      async authorize(credentials) {
        await connectToMongoDB().catch(err => { throw new Error(err) })

        const user = await User.findOne({
          email: credentials?.email
        }).select("+password")

        if (!user) {
          throw new Error("Invalid credentials")
        }
        //the ! is necessary
        const isPasswordCorrect = await compare(credentials!.password, user.password)

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials")
        }

        return user
      }
    })
  ],
  pages: { //here it redirects after signin
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      const user = token.user as IUser
      session.user = user
      return session
    }
  }
}

export default NextAuth(options)