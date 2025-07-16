"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Simulated auth check
    const isLoggedIn = true;
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-black mb-4 drop-shadow-lg">
          🎛️ Welcome to your Dashboard
        </h1>
        <p className="text-lg text-gray-700 max-w-md mx-auto mb-10">
          This is your central hub to manage events, clients, music preferences, and more. Let’s build something amazing.
        </p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="border-4 border-black rounded-xl p-6 shadow-lg hover:bg-cyan-50 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">📆 Events</h2>
            <p className="text-sm text-gray-600">View & manage your upcoming events.</p>
          </div>
          <div className="border-4 border-black rounded-xl p-6 shadow-lg hover:bg-cyan-50 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">📝 Forms</h2>
            <p className="text-sm text-gray-600">Create or edit intake forms and client questionnaires.</p>
          </div>
          <div className="border-4 border-black rounded-xl p-6 shadow-lg hover:bg-cyan-50 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">🎨 Branding</h2>
            <p className="text-sm text-gray-600">Customize your branding and client experience.</p>
          </div>
          <div className="border-4 border-black rounded-xl p-6 shadow-lg hover:bg-cyan-50 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">🎵 Music Preferences</h2>
            <p className="text-sm text-gray-600">View or update client music requests and playlists.</p>
          </div>
          <div className="border-4 border-black rounded-xl p-6 shadow-lg hover:bg-cyan-50 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">💬 Messages</h2>
            <p className="text-sm text-gray-600">Check messages or send updates to your clients.</p>
          </div>
          <div className="border-4 border-black rounded-xl p-6 shadow-lg hover:bg-cyan-50 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">⚙️ Settings</h2>
            <p className="text-sm text-gray-600">Manage your account, preferences, and notifications.</p>
          </div>
        </div>
      </div>
      <footer className="mt-16 text-xs text-gray-500 font-semibold text-center">
        &copy; {new Date().getFullYear()} Foundation Vibes. All rights reserved.
      </footer>
    </main>
  );
}
