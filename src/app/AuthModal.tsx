"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

export default function AuthModal({ show, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const router = useRouter();
  const { login, signup } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    
    if (mode === 'signup') {
      if (!name) {
        setError("Please enter your name.");
        return;
      }
      
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      
      // Additional password validation
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
    }
    
    if (mode === 'forgot') {
      setIsLoading(true);
      // Simulate password reset
      setTimeout(() => {
        setSuccessMessage("Password reset link sent to your email!");
        setIsLoading(false);
      }, 1000);
      return;
    }
    
    setIsLoading(true);
    
    if (mode === 'signup') {
      const result = await signup(email, name, password);
      if (result.success) {
        onClose();
        router.push("/dashboard");
      } else {
        setError(result.error || "Signup failed");
      }
    } else {
      // Login
      login(email, name || email.split('@')[0], rememberMe);
      onClose();
      router.push("/dashboard");
    }
    
    setIsLoading(false);
  }

  function switchMode(newMode: 'login' | 'signup' | 'forgot') {
    setMode(newMode);
    setError("");
    setSuccessMessage("");
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
            {mode === 'login' && "Welcome Back!"}
            {mode === 'signup' && "Join FluentHorizon"}
            {mode === 'forgot' && "Reset Password"}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {mode === 'login' && "Sign in to continue your journey"}
            {mode === 'signup' && "Start your language learning adventure"}
            {mode === 'forgot' && "Enter your email to reset password"}
          </p>
        </div>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white dark:bg-zinc-800 dark:text-white transition-all"
              />
              <p className="text-xs text-zinc-500 mt-1">This will be displayed on your profile</p>
            </div>
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white dark:bg-zinc-800 dark:text-white transition-all"
            required
          />
          
          {mode !== 'forgot' && (
            <>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white dark:bg-zinc-800 dark:text-white transition-all"
                required
              />
              
              {mode === 'signup' && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white dark:bg-zinc-800 dark:text-white transition-all"
                  required
                />
              )}
              
              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-zinc-600 dark:text-zinc-400">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              
              {mode === 'signup' && (
                <div className="text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg">
                  <p className="font-medium mb-1">Password requirements:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li className={password.length >= 8 ? "text-green-600" : ""}>At least 8 characters</li>
                    <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>One uppercase letter</li>
                    <li className={/[a-z]/.test(password) ? "text-green-600" : ""}>One lowercase letter</li>
                    <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>One number</li>
                  </ul>
                </div>
              )}
            </>
          )}
          
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="text-green-500 text-sm text-center bg-green-50 dark:bg-green-900/20 py-2 rounded-lg">
              {successMessage}
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
              <span>
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
              </span>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          {mode === 'login' && (
            <span className="text-zinc-600 dark:text-zinc-400">
              Don&apos;t have an account?{" "}
              <button 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline" 
                onClick={() => switchMode('signup')}
              >
                Sign Up Free
              </button>
            </span>
          )}
          {mode === 'signup' && (
            <span className="text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
              <button 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline" 
                onClick={() => switchMode('login')}
              >
                Sign In
              </button>
            </span>
          )}
          {mode === 'forgot' && (
            <span className="text-zinc-600 dark:text-zinc-400">
              Remember your password?{" "}
              <button 
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline" 
                onClick={() => switchMode('login')}
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
