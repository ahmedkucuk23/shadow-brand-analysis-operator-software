import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Authorized users
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

        // Return email as temporary ID - will be resolved to real DB ID in jwt callback
        return {
          id: authorizedUser.email.toLowerCase(),
          email: authorizedUser.email.toLowerCase(),
          name: authorizedUser.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig
