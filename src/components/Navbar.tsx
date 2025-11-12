import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @ts-ignore
import { useAuth } from '../contexts/AuthContext'; // Assuming this context exists
// @ts-ignore
import { supabase } from '../lib/supabase'; // Assuming this supabase client exists
import {
  ChevronDown,
  Plus,
  Layers,
  Wand2, // Added for logo
  Settings, // Added for links
  LogOut, // Added for sign out
} from 'lucide-react';

// Mock AuthContext for standalone demo if not provided
// In a real app, you'd remove this and use your actual context
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  // Uncomment line below to test logged-in state
  // const [user, setUser] = useState<any>({ email: 'test@example.com', user_metadata: {} }); 
  
  const signOut = async () => {
    setUser(null);
    console.log('Signed out');
  };
  return { user, signOut };
};

// Mock Supabase for standalone demo
const supabaseMock = {
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          limit: () =>
            Promise.resolve({
              data: [
                { id: '1', title: 'Customer Feedback' },
                { id: '2', title: 'Job Application' },
              ],
              error: null,
            }),
        }),
      }),
    }),
  }),
};
// Use the mock if the real one isn't available
const supabase = (globalThis as any).supabase || supabaseMock;


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
      // In a real app, user.id would come from the auth context
      const userId = user.id || 'mock-user-id'; 
      const { data, error } = await supabase
        .from('forms')
        .select('id,title')
        .eq('user_id', userId) 
        .order('created_at', { ascending: false })
        .limit(3); // Reduced to 3 for a cleaner dropdown
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
    // Removed About/Contact for a cleaner demo, you can add them back
  ];

  // Helper component for dropdown links for cleaner code
  const DropdownLink: React.FC<{
    to: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }> = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className="group flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
    >
      <Icon className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
      {children}
    </Link>
  );

  return (
    // Assume 'font-inter' is set on the <html> tag
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/90 shadow-sm border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors duration-300"
          >
            <Wand2 className="w-6 h-6 text-blue-600" />
            AIFormGen
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side: Auth + Mobile */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative group">
                <button
                  className="flex items-center p-1 rounded-full bg-white border border-slate-200 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4 ml-1 mr-1 text-slate-500" />
                </button>

                {/* Dropdown on Hover */}
                <div
                  className="absolute right-0 mt-2 w-72 origin-top-right bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden
                             opacity-0 invisible group-hover:visible group-hover:opacity-100 
                             transform translate-y-2 group-hover:translate-y-0 
                             transition-all duration-200 ease-out z-50"
                >
                  <div className="p-2">
                    <div className="px-2 py-1 mb-1">
                      <p className="text-sm font-medium text-slate-800">
                        {user.email}
                      </p>
                      <p className="text-xs text-slate-500">Personal Account</p>
                    </div>
                    
                    <div className="border-t border-slate-100 my-1"></div>

                    <h3 className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Quick Links
                    </h3>
                    <div className="grid grid-cols-1 gap-1 p-1">
                      <DropdownLink to="/dashboard" icon={Layers}>
                        Dashboard
                      </DropdownLink>
                      <DropdownLink to="/generator" icon={Plus}>
                        Create Form
                      </DropdownLink>
                      <DropdownLink to="/settings" icon={Settings}>
                        Settings
                      </DropdownLink>
                    </div>
                    
                    <div className="border-t border-slate-100 my-1"></div>

                    <h3 className="px-3 pt-2 pb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Recent Forms
                    </h3>
                    <div className="p-1">
                      {recentForms.length > 0 ? (
                        recentForms.map((form) => (
                          <Link
                            key={form.id}
                            to={`/form/${form.id}`}
                            className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 truncate"
                          >
                            {form.title}
                          </Link>
                        ))
                      ) : (
                        <p className="px-3 py-2 text-slate-400 text-sm">
                          No forms yet
                        </p>
                      )}
                    </div>

                    <div className="border-t border-slate-100 my-1"></div>
                    
                    <button
                      onClick={handleSignOut}
                      className="group w-full text-left flex items-center p-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5 mr-3 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-md transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Sign Up Free
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors duration-300"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white border-t border-slate-200 shadow-lg z-40
                    transition-all duration-300 ease-in-out
                    ${
                      isMobileMenuOpen
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-4'
                    }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="border-t border-slate-200 pt-4 mt-4 space-y-1">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Layers className="w-5 h-5 mr-3 text-slate-500" />
                  Dashboard
                </Link>
                <Link
                  to="/generator"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus className="w-5 h-5 mr-3 text-slate-500" />
                  Create Form
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-3 text-slate-500" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5 mr-3 text-red-500" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-3 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// To make this component runnable in isolation, we'd need a mock App
// This part is just for demo and not part of the core component
/*
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = () => <div className="p-8">Home Page Content</div>;
const Features = () => <div className="p-8">Features Page Content</div>;
const Pricing = () => <div className="p-8">Pricing Page Content</div>;
const Dashboard = () => <div className="p-8">Dashboard Page Content</div>;
const Generator = () => <div className="p-8">Form Generator Page</div>;
const Settings = () => <div className="p-8">Settings Page</div>;
const Login = () => <div className="p-8">Login Page</div>;
const Signup = () => <div className="p-8">Signup Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-inter bg-slate-50 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};
*/

export default Navbar;
