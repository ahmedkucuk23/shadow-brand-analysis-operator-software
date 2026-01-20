import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Authorized users
const USERS = [
  {
    id: "1",
    email: "ahmed@mita.ba",
    password: "ahminProfil12!!",
    name: "Ahmed",
  },
  {
    id: "2",
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

        const user = USERS.find(
          (u) =>
            u.email.toLowerCase() === (credentials.email as string).toLowerCase() &&
            u.password === credentials.password
        )

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig
