import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  email: string
  user_name: string
  tier: string
  photo_url?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  loginRedirect: () => void
  logout: () => Promise<boolean> // returns success flag
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const BACKEND_URL = import.meta.env["VITE_BACKEND_URL"] as string
const LANDING_URL = (import.meta.env["VITE_LANDING_URL"] as string) || "https://rubito.jp"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refresh()
  }, [])

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND_URL}/user`, {
        credentials: "include",
      })
      if (!res.ok) throw new Error("Not logged in")
      const data = await res.json()
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const loginRedirect = () => {
    window.location.href = LANDING_URL // send to main site (auth flow)
  }

  // React (Vite) version of your Next.js logout snippet
  const logout = async (): Promise<boolean> => {
    try {
      const res = await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        credentials: "include",
      })
      if (!res.ok) {
        // attempt to read message if server returns JSON
        try {
          const data = await res.json()
          console.error("Logout failed:", data?.error || res.statusText)
        } catch {
          console.error("Logout failed:", res.status, res.statusText)
        }
        return false
      }
      setUser(null)
      return true
    } catch (err) {
      console.error("Logout failed:", err)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginRedirect, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
