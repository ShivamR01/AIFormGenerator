import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ChevronDown, Plus, Layers } from 'lucide-react';

interface Form {
  id: string;
  title: string;
}

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [recentForms, setRecentForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('forms')
        .select('id,title')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      if (!error && data) setRecentForms(data as Form[]);
    };
    fetchForms();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/50 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-600 hover:text-blue-500 transition-colors duration-300"
          >
            AIFormGenerator
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="relative group">
                <button
                  className="flex items-center px-3 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 hover:shadow-lg transition-all duration-300 focus:outline-none"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4 ml-2 text-gray-700" />
                </button>

                {/* Dropdown on Hover */}
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-50">
                  <div className="p-4">
                    <h3 className="text-gray-600 text-sm font-semibold mb-2">Quick Links</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Layers className="w-5 h-5 mr-2 text-blue-600" />
                        Dashboard
                      </Link>
                      <Link
                        to="/generator"
                        className="flex items-center px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Plus className="w-5 h-5 mr-2 text-blue-600" />
                        Create Form
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-3">
                    <h3 className="text-gray-600 text-sm font-semibold mb-2">Recent Forms</h3>
                    {recentForms.length > 0 ? (
                      recentForms.map((form) => (
                        <Link
                          key={form.id}
                          to={`/form/${form.id}`}
                          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          {form.title}
                        </Link>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No forms yet</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button + Dashboard Icon */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <Link
                to="/dashboard"
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-white/20 transition-colors duration-300"
              >
                <Layers className="w-6 h-6" />
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-white/20 transition-colors duration-300"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/generator"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Form
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
