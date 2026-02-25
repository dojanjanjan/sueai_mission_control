'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

const PASSWORD = 'dragonfly';
const STORAGE_KEY = 'grande_beach_authenticated';

export default function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem(STORAGE_KEY) === 'true';
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEY, 'true');
      setError(false);
      setPassword('');
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-black flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-electric-blue" />
              </div>
              <h1 className="text-2xl font-bold mb-2">
                <span className="text-gradient">Grande Beach</span>
              </h1>
              <p className="text-white/60 text-sm">AI powered Control Center</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2 text-white/80">
                  Passwort
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-electric-blue/50 focus:outline-none text-white placeholder-white/40 transition-colors"
                  placeholder="Passwort eingeben"
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    Falsches Passwort. Bitte versuchen Sie es erneut.
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-deep-purple text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Anmelden
              </button>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return <>{children}</>;
}
