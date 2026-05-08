import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Newspaper, Bookmark, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
              <Newspaper className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Hacker<span className="text-indigo-400">Hub</span></span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/bookmarks" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <Bookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">Bookmarks</span>
                </Link>
                <div className="h-4 w-px bg-slate-700 mx-2"></div>
                <div className="flex items-center gap-2 text-sm text-slate-300 mr-2">
                  <UserIcon className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}