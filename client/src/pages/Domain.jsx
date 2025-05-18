import React from 'react';
import DomainCard from '../components/DomainCard';
import { domainList } from '../data/domainList';

const Domain = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Learning Domains
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose from a variety of technology domains and track your learning progress
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {domainList.map((domain, index) => (
          <DomainCard key={index} name={domain} />
        ))}
      </div>
    </div>
  );
};

export default Domain;