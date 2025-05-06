import React from 'react';
import DomainCard from '../components/DomainCard';
import { domainList } from '../data/domainList';

const Domain = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Domains</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Explore different technology domains and track your learning progress
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {domainList.map((domain, index) => (
          <DomainCard key={index} name={domain} />
        ))}
      </div>
    </div>
  );
};

export default Domain; 