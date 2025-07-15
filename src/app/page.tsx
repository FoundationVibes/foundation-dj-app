"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const orgConfig = {
  logo: "squares",
  title: "Foundation Vibes",
  tagline: "The only app that connects DJs and clients with a pro touch. We Da Best!",
  buttonUrl: "https://www.az3ntoh.com",
};

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => {
        setError("Login failed: Firebase: " + err.message);
      });
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white relative p-4">
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

      <h1 className="text-4xl font-extrabold text-black mb-4 drop-shadow-lg text-center">
        ⬜⬜ {orgConfig.title} Login
      </h1>
      <p className="text-lg text-gray-700 max-w-md mx-auto mb-6 text-center">
        {orgConfig.tagline}
      </p>

      {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

      <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
        <label className="text-black text-sm font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="partytime@gmail.com"
          className="border border-black p-3 rounded w-full text-black placeholder-gray-700"
        />

        <label className="text-black text-sm font-semibold">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="border border-black p-3 rounded w-full text-black placeholder-gray-700"
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label htmlFor="showPassword" className="text-sm text-gray-700">Show Password</label>
        </div>

        <button type="submit" className="bg-black text-white py-3 rounded hover:bg-cyan-700">
          Log In
        </button>
      </form>

      <footer className="mt-10 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} {orgConfig.title}. All rights reserved.
      </footer>
    </main>
  );
}
