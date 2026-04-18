import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Briefcase, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
  const { user, loginWithGoogle, loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const handleLogin = async (admin = false) => {
    setIsLoading(true);
    try {
      if (admin) {
        await loginAsAdmin();
      } else {
        await loginWithGoogle();
      }
      // Nav handled automatically by context change -> ProtectedRoute / Navigate
    } catch (e) {
      console.error(e);
      alert('Login failed. Check console.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 blur-3xl opacity-30 pointer-events-none">
          <div className="w-48 h-48 bg-blue-500 rounded-full"></div>
        </div>

        <div className="text-center relative z-10 mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-900 border border-gray-700 shadow-lg text-blue-500 mb-6">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your AI Job Application Copilot</p>
        </div>

        <div className="space-y-4 relative z-10">
          <button
            onClick={() => handleLogin(false)}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 py-3 rounded-xl font-medium transition-colors border border-gray-200"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Sign in as Applicant
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <button
            onClick={() => handleLogin(true)}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 border border-gray-700 hover:border-gray-500 text-white py-3 rounded-xl font-medium transition-colors"
          >
            Sign in as Admin (Mock Dev)
          </button>
        </div>
      </div>
    </div>
  );
}
