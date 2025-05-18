import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import Footer from '../layout/Footer';
import { useTheme } from '../../context/ThemeContext';

const BaseLayout = () => {
  const { theme } = useTheme();

  return (    <div className={theme}>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 dark:from-purple-900 dark:to-black">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BaseLayout;