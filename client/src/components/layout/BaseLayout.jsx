import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import Footer from '../layout/Footer';
import { useTheme } from '../../context/ThemeContext';

const BaseLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BaseLayout;