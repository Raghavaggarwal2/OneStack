import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Users, 
  Info,
  LogOut
} from 'lucide-react';
import { ThemeToggle } from '../ui';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', route: '/' },
    { icon: BookOpen, label: 'Domains', route: '/domains' },
    { icon: FileText, label: 'Articles', route: '/articles' },
    { icon: Users, label: 'Team', route: '/team' },
    { icon: Info, label: 'About Us', route: '/about' },
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <>      {/* Welcome Header - Outside Navbar */}
      <div className="fixed top-0 left-[72px] right-0 bg-white/95 dark:bg-black/95 backdrop-blur-sm p-4 z-10">
        <div className="max-w-[1920px] mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hello, {user?.firstName || 'there'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Deep Dive into the tech world with One Stack
          </p>
        </div>
      </div>

      {/* Vertical Sidebar */}
      <nav className="fixed left-0 top-0 h-full w-[72px] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-4 z-20">        {/* Logo */}
        <Link to="/" className="mb-12">
          <img 
            src="/logo.png" 
            alt="OneStack Logo" 
            className="w-24 h-24 rounded-lg hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Navigation Items */}
        <div className="flex flex-col items-center space-y-6 flex-grow">
          {menuItems.map((item) => (
            <motion.div
              key={item.label}
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <button
                onClick={() => handleNavigation(item.route)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <item.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              {/* Tooltip */}
              <motion.div
                className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <Link to="/profile" className="relative group">
              <motion.div 
                className="w-10 h-10 mb-5 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                {(user.profileImage || user.data?.profileImage) ? (
                  <img src={user.profileImage || user.data?.profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span>{(user.data?.firstName || user?.firstName)?.charAt(0).toUpperCase() || 'A'}</span>
                )}
              </motion.div>
              
              {/* Profile Tooltip */}
              <motion.div
                className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                View Profile
              </motion.div>
            </Link>
          ) : (
            <Link
              to="/login"
              className="w-10 h-10 mb-5 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;