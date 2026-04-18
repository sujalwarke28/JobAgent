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
    <nav className="border-b border-slate-200 bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold gradient-text">Jobice</span>
        </Link>
        <div className="flex items-center gap-6">
          {user.role === 'applicant' ? (
            <>
              <Link to="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">Dashboard</Link>
                            <Link to="/applications" className="text-slate-600 hover:text-slate-900 transition-colors">My Applications</Link>
              <Link to="/profile" className="text-slate-600 hover:text-slate-900 transition-colors">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/admin" className="text-slate-600 hover:text-slate-900 transition-colors">Admin Dashboard</Link>
              <Link to="/profile" className="text-slate-600 hover:text-slate-900 transition-colors">Profile</Link>
            </>
          )}

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-300">
            <span className="text-sm text-slate-500">{user.displayName || user.email}</span>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-full hover:bg-slate-100"
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
