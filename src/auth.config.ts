import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/lib/db"

// Authorized users (credentials only - IDs come from database)
const AUTHORIZED_USERS = [
  {
    email: "ahmed@mita.ba",
    password: "ahminProfil12!!",
    name: "Ahmed",
  },
  {
    email: "andrej@mita.ba",
    password: "Andraa12BEG!",
    name: "Andrej",
  },
]

export default {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const authorizedUser = AUTHORIZED_USERS.find(
          (u) =>
            u.email.toLowerCase() === (credentials.email as string).toLowerCase() &&
            u.password === credentials.password
        )

        if (!authorizedUser) {
          return null
        }

        // Find or create user in database
        let dbUser = await db.user.findUnique({
          where: { email: authorizedUser.email.toLowerCase() }
        })

        if (!dbUser) {
          // Create user in database
          dbUser = await db.user.create({
            data: {
              email: authorizedUser.email.toLowerCase(),
              name: authorizedUser.name,
            }
          })
        }

        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig
