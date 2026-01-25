import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
  basePath: "/api/auth",
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // user.id from authorize is the email - find or create real DB user
        const email = user.email?.toLowerCase()
        if (email) {
          let dbUser = await db.user.findUnique({
            where: { email }
          })

          if (!dbUser) {
            dbUser = await db.user.create({
              data: {
                email,
                name: user.name,
              }
            })
          }

          token.id = dbUser.id
        } else {
          token.id = user.id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
