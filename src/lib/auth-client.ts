import { createAuthClient } from 'better-auth/react'
import { env } from '@/env'
import { usernameClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  /** The base URL of server (optional if you're using the same domain) */
  baseURL: env.VITE_BETTER_AUTH_URL || 'http://localhost:3000',
  plugins: [usernameClient()],
})

export const { useSession, signIn, signUp, signOut } = authClient
