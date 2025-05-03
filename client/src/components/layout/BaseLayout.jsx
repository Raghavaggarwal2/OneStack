import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout; 