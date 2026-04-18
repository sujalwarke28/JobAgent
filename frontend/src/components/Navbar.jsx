import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Briefcase } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold gradient-text">JobCopilot AI</span>
        </Link>
        <div className="flex items-center gap-6">
          {user.role === 'applicant' ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                            <Link to="/applications" className="text-gray-300 hover:text-white transition-colors">My Applications</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">Admin Dashboard</Link>
              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>
            </>
          )}

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-700">
            <span className="text-sm text-gray-400">{user.displayName || user.email}</span>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-full hover:bg-gray-800"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
