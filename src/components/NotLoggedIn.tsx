import { useAuth } from "@/context/AuthContext";

export default function NotLoggedInUI() {
  const { loginRedirect } = useAuth();

  const SITE_LOGO =
    import.meta.env["VITE_SITE_LOGO"] ||
    "https://res.cloudinary.com/yenvietsoft/image/upload/v1749379776/Rubito/rubito-vuong_qbujjq.png";

  return (
    <div className="flex items-center justify-center h-screen w-full relative overflow-hidden bg-gradient-to-br from-pink-100 via-white to-purple-100">
      {/* Background grid + orb */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.08) 1px, transparent 1px),
            radial-gradient(circle at 60% 70%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />

      {/* Center card */}
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 border border-gray-200">
        {/* Logo */}
        <img
          src={SITE_LOGO}
          alt="Rubito Logo"
          className="h-20 w-20 rounded-xl shadow-md"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Welcome to <span className="text-pink-500">Rubito</span>
        </h1>
        <p className="text-gray-600 text-center text-sm">
          Please login to continue or report an issue if something seems wrong.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 w-full">
          <button
            onClick={loginRedirect}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-sm"
          >
            Login
          </button>
          <button
            onClick={() => {
              window.location.href = `${import.meta.env["VITE_LANDING_URL"]}/contact`;
            }}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition shadow-sm"
          >
            Report Error
          </button>
        </div>
      </div>
    </div>
  );
}
