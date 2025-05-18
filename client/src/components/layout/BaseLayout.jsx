import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import Footer from '../layout/Footer';
import { useTheme } from '../../context/ThemeContext';

const BaseLayout = () => {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <div className="flex min-h-screen bg-gradient-to-b from-purple-100 to-purple-900 dark:from-purple-900 dark:to-black">
        <Navbar />
        <div className="flex-1 flex flex-col ml-[72px]">
          <main className="flex-grow pt-20">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;