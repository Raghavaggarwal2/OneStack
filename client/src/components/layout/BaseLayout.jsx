import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import { useTheme } from '../../context/ThemeContext';

const BaseLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;