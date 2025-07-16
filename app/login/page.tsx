'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function LoginPage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState('');
const [focusBox, setFocusBox] = useState<"email" | "password" | null>(null); // <-- ADD THIS!
const router = useRouter();



  const handleLogin = async () => {
    setError('');
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Search all companies for this user
      const companiesSnapshot = await getDocs(collection(db, 'companies'));
      let found = false;

      for (const companyDoc of companiesSnapshot.docs) {
        const companyId = companyDoc.id;
        const userRef = doc(db, `companies/${companyId}/users/${uid}`);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const { role } = userSnap.data();

          switch (role) {
            case 'admin':
              router.push('/admin');
              break;
            case 'manager':
              router.push('/manager');
              break;
            case 'planner':
              router.push('/planner');
              break;
            case 'client':
              router.push('/client');
              break;
            case 'guest':
              router.push('/guest');
              break;
            case 'dj':
              router.push('/dj');
              break;
            default:
              setError('Unknown role.');
              break;
          }
          found = true;
          break;
        }
      }

      if (!found) setError('User not found in any company.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError('Login failed: ' + err.message);
      } else {
        setError('Login failed: An unknown error occurred.');
      }
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-[-6rem] left-[-6rem] w-[24rem] h-[24rem] bg-cyan-600 opacity-40 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-[28rem] h-[28rem] bg-cyan-900 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-950 to-black opacity-80 z-0"></div>

      {/* Top right Request Info button */}
     <a
  href="https://www.az3ntoh.com"
  target="_blank"
  rel="noopener noreferrer"
  className="absolute top-7 right-8 border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black font-semibold px-4 py-1.5 rounded-lg shadow-sm transition z-20 tracking-wide bg-white/70 backdrop-blur"
  style={{ fontSize: '1rem', fontWeight: 600 }}
>
  Request Info
</a>

      {/* Main Login Box */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Branding */}
      <div className="flex flex-col items-center mb-8 select-none">
  {/* Vinyl record DJ icon */}
  <div className="mb-2">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#06b6d4" stroke="black" strokeWidth="4"/>
      <circle cx="24" cy="24" r="7" fill="white" stroke="#0e7490" strokeWidth="3"/>
      <circle cx="24" cy="24" r="2.5" fill="#0e7490"/>
    </svg>
  </div>
 <div
  className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-wide bg-gradient-to-r from-cyan-300 via-white to-cyan-400 bg-clip-text text-transparent drop-shadow-lg px-2 text-center"
  style={{ letterSpacing: '0.09em', lineHeight: 1.12 }}
>
  Foundation Vibes
</div>
  <div className="text-lg font-mono text-cyan-400 mt-2 font-bold uppercase tracking-widest drop-shadow">
    Built by DJs for DJs
  </div>
  {/* Animated underline bar */}
  <div className="mt-2 w-24 h-2 rounded-full bg-cyan-400 blur-sm animate-pulse mx-auto" />
</div>


        {/* Email Box */}
        <div className={
          `w-full mb-5 rounded-2xl border-4 border-cyan-500 bg-white shadow-lg px-6 py-6 flex flex-col transition-all duration-200 ` +
          (focusBox === "email" ? "scale-105 shadow-cyan-400/70 z-10 border-cyan-400" : "")
        }>
          <label htmlFor="email" className="text-base font-bold text-black mb-2 uppercase tracking-wide">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="youremail@gmail.com"
            className="w-full p-3 rounded-lg border-2 border-black text-black font-extrabold bg-white placeholder-gray-400 text-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400"
            onFocus={() => setFocusBox("email")}
            onBlur={() => setFocusBox(null)}
          />
        </div>

        {/* Password Box */}
       <div className={
         `w-full mb-1 rounded-2xl border-4 border-cyan-700 bg-white shadow-lg px-6 py-6 flex flex-col transition-all duration-200 ` +
         (focusBox === "password" ? "scale-105 shadow-cyan-400/70 z-10 border-cyan-400" : "")
      }>
          <label htmlFor="password" className="text-base font-bold text-black mb-2 uppercase tracking-wide">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-lg border-2 border-black text-black font-extrabold bg-white placeholder-gray-400 text-lg focus:outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700 pr-12"
              onFocus={() => setFocusBox("password")}
              onBlur={() => setFocusBox(null)}

            />
            {/* Show/hide password button */}
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-cyan-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye Off Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-5.25-9-7s4-7 9-7c1.364 0 2.653.287 3.825.825M19.065 19.065L4.935 4.935" />
                </svg>
              ) : (
                // Eye Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.268.84-.63 1.654-1.08 2.414" />
                </svg>
              )}
            </button>
          </div>

          {/* Forgot Username/Password */}
          <div className="mt-3">
            <button
              onClick={() => router.push('/forgot')}
              className="text-cyan-700 hover:underline text-sm font-bold"
              type="button"
            >
              Forgot username/password?
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-cyan-400 font-extrabold py-3 rounded-2xl shadow-xl text-lg border-4 border-cyan-500 hover:bg-cyan-700 hover:text-white mt-4 transition-all tracking-widest"
          style={{ letterSpacing: '0.1em' }}
        >
          SIGN IN
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4 text-center font-bold">{error}</p>}

        {/* Request Demo button */}
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={() => router.push('/request-demo')}
            className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg border-4 border-black transition-all"
            type="button"
            style={{ letterSpacing: '0.09em' }}
          >
            REQUEST DEMO
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 mb-2 text-cyan-300 text-base md:text-lg italic text-center select-none font-extrabold drop-shadow-[0_4px_24px_cyan]">
  “Join the new standard for DJ event management. <span className="not-italic"></span>”


</div>

        <div className="mt-10 text-gray-400 text-xs text-center select-none font-semibold tracking-wide">
          &copy; {new Date().getFullYear()} Foundation Systems. All rights reserved.
        </div>
      </div>
    </main>
  );
}
