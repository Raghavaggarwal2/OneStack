import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ui';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();

  return (    <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-lg">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-purple-900 dark:text-purple-100">
                One Stack
              </Link>
            </div>            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-purple-600 dark:text-purple-300 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-900 dark:hover:text-purple-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/domains"
                className="border-transparent text-purple-600 dark:text-purple-300 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-900 dark:hover:text-purple-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Domains
              </Link>
              <Link
                to="/articles"
                className="border-transparent text-purple-600 dark:text-purple-300 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-900 dark:hover:text-purple-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Articles
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <Link to="/profile" className="relative">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-300 transition duration-200">
                  {(user.profileImage || user.data?.profileImage) ? 
                    <img src={user.profileImage || user.data?.profileImage} alt="Profile" className="h-full w-full object-cover" /> : 
                    <span>{(user.data?.firstName || user?.firstName) ? (user.data?.firstName.charAt(0).toUpperCase() || user?.firstName.charAt(0).toUpperCase()) : 'A'}</span>
                  }
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;