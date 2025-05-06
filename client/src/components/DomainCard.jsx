import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { domainColors } from '../data/domainList';

const DomainCard = ({ name }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  
  // Generate a URL-friendly version of the domain name
  const domainSlug = name.toLowerCase().replace(/\s+/g, '-');
  
  // Get domain color or use default blue
  const colorClass = domainColors[name] || 'bg-blue-500';
  
  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const key = `domain_${name.replace(/\s+/g, '_').toLowerCase()}`;
      const savedData = localStorage.getItem(key);
      
      if (savedData) {
        const topics = JSON.parse(savedData);
        const completedCount = topics.filter(topic => topic.completed).length;
        const calculatedProgress = Math.round((completedCount / topics.length) * 100);
        setProgress(calculatedProgress);
      }
    } catch (error) {
      console.error('Error loading domain progress:', error);
    }
  }, [name]);
  
  const handleClick = () => {
    navigate(`/domain/${domainSlug}`);
  };
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{name}</h3>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-300">Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <ProgressBar value={progress} color={colorClass} />
      </div>
    </div>
  );
};

export default DomainCard; 