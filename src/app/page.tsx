"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Customization config – will support multi-branding later
const orgConfig = {
  logo: "squares",
  title: "Foundation Vibes",
  tagline: "The only app that connects DJs and clients with a pro touch.",
  buttonUrl: "https://www.az3ntoh.com",
};

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email && password) {
      router.push("/dashboard");
    } else {
      setError("Please enter email and password.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white relative">
      {/* Top Right Button */}
      <div className="w-full flex justify-end px-8 pt-7 absolute top-0 left-0 z-30">
        <a
          href={orgConfig.buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white font-bold px-6 py-2 rounded-full shadow hover:bg-cyan-700 border-2 border-black text-sm uppercase tracking-wider"
        >
          Request Info
        </a>
      </div>

      {/* Logo */}
      <div className="mb-6">
        <svg width="62" height="62" viewBox="0 0 62 62" fill="none">
          <rect x="11" y="18" width="32" height="32" rx="8" fill="#fff" stroke="#111" strokeWidth="6" />
          <rect x="19" y="10" width="32" height="32" rx="8" fill="#111" stroke="#111" strokeWidth="6" />
        </svg>
      </div>

      {/* Title & Tagline */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-2 text-center drop-shadow-xl tracking-tight"
        style={{ textShadow: "0px 4px 18px #000, 0px 2px 0px #06b6d4" }}>
        {orgConfig.title}
      </h1>
      <p className="text-base md:text-lg text-gray-800 mb-10 font-medium text-center max-w-sm">
        {orgConfig.tagline}
      </p>

      {/* Login Card */}
      <div className="bg-white border-[5px] border-black rounded-2xl shadow-2xl w-full max-w-sm px-8 py-8 mb-8">
        <h2 className="text-lg font-bold mb-6 text-center text-black tracking-wide">
          Login to your account
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            className="border-[3px] border-black rounded-md px-4 py-2 focus:border-cyan-500"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-[3px] border-black rounded-md px-4 py-2 focus:border-cyan-500"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 bg-black border-[3px] border-black text-white font-bold py-2 rounded-lg transition hover:bg-cyan-700"
          >
            Log In
          </button>
        </form>
        {error && <div className="mt-3 text-sm text-red-600 text-center">{error}</div>}
        <div className="flex justify-between items-center mt-4 text-xs">
          <Link href="#" className="text-black hover:underline font-semibold">
            Forgot password?
          </Link>
          <Link href="#" className="text-black hover:underline font-semibold">
            Create account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mb-4 text-center text-xs text-gray-500 font-semibold">
        &copy; {new Date().getFullYear()} Foundation Systems. All rights reserved.
      </footer>
    </main>
  );
}
