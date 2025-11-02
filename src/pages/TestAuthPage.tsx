import NotLoggedInUI from "@/components/NotLoggedIn"
import { useAuth } from "@/context/AuthContext"
import { showToast } from "@/lib/toastSetting"

const LANDING_URL =
  (import.meta.env["VITE_LANDING_URL"] as string) || "https://rubito.jp"

export function TestAuthPage() {
  const { user, loading, logout } = useAuth()

  const handleLogout = async () => {
    const ok = await logout()
    if (!ok) {
      showToast("error", "Logout failed")
      return
    }
    showToast("success", "Logged out successfully")
    // hard redirect to landing (external domain)
    window.location.href = LANDING_URL
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
     <NotLoggedInUI/>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <img
        src={user.photo_url || "https://placehold.co/100x100"}
        alt="User avatar"
        className="w-20 h-20 rounded-full shadow"
      />
      <h1 className="text-xl font-semibold">{user.user_name}</h1>
      <p className="text-gray-600">{user.email}</p>
      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
        {user.tier}
      </span>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  )
}
