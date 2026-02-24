"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

export default function AuthModal({ show, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    
    if (mode === 'signup' && !name) {
      setError("Please enter your name.");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    // Demo: Accept any credentials with slight delay for UX
    setTimeout(() => {
      const userName = mode === 'signup' ? name : email.split('@')[0];
      login(email, userName);
      onClose();
      router.push("/dashboard");
      setIsLoading(false);
    }, 500);
  }

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm relative animate-scale-in">
        <button
          className="absolute top-4 right-4 text-zinc-500 hover:text-blue-600 transition-colors"
          onClick={onClose}
          aria-label="Close auth"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {mode === 'login' ? "Welcome Back!" : "Join Fluent Horizons"}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {mode === 'login' ? "Sign in to continue your journey" : "Start your language learning adventure"}
          </p>
        </div>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white dark:bg-zinc-800 dark:text-white transition-all"
              required={mode === 'signup'}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white dark:bg-zinc-800 dark:text-white transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white dark:bg-zinc-800 dark:text-white transition-all"
            required
          />
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg">
              {error}
            </div>
          )}
          <button 
            type="submit" 
            disabled={isLoading} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:shadow-blue-500/25 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Please wait...</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          {mode === 'login' ? (
            <span className="text-zinc-600 dark:text-zinc-400">
              Don&apos;t have an account?{" "}
              <button 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline" 
                onClick={() => { setMode('signup'); setError(''); }}
              >
                Sign Up Free
              </button>
            </span>
          ) : (
            <span className="text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
              <button 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline" 
                onClick={() => { setMode('login'); setError(''); }}
              >
                Sign In
              </button>
            </span>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
          <p className="text-xs text-center text-zinc-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
