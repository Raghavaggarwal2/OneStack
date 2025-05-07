import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { getDomainProgress } from '../services/domainService';
import { domainColors } from '../data/domainList';

const DomainCard = ({ name }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  
  // Generate a URL-friendly version of the domain name
  const domainId = name.toLowerCase().replace(/\s+/g, '-');
  
  // Get domain color or use default blue
  const colorClass = domainColors[name] || 'bg-blue-500';
  
  // Load progress from backend on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const domainProgress = await getDomainProgress(domainId);
        if (domainProgress) {
          const calculatedProgress = Math.round(
            (domainProgress.completedTopics / domainProgress.totalTopics) * 100
          );
          setProgress(calculatedProgress);
        } else {
          // Fallback to localStorage if no backend data
          const key = `domain_${name.replace(/\s+/g, '_').toLowerCase()}`;
          const savedData = localStorage.getItem(key);
          
          if (savedData) {
            const topics = JSON.parse(savedData);
            const completedCount = topics.filter(topic => topic.completed).length;
            const calculatedProgress = Math.round((completedCount / topics.length) * 100);
            setProgress(calculatedProgress);
          }
        }
      } catch (error) {
        console.error('Error loading domain progress:', error);
        // Try localStorage as fallback
        try {
          const key = `domain_${name.replace(/\s+/g, '_').toLowerCase()}`;
          const savedData = localStorage.getItem(key);
          
          if (savedData) {
            const topics = JSON.parse(savedData);
            const completedCount = topics.filter(topic => topic.completed).length;
            const calculatedProgress = Math.round((completedCount / topics.length) * 100);
            setProgress(calculatedProgress);
          }
        } catch (localError) {
          console.error('Error loading from localStorage:', localError);
        }
      }
    };

    loadProgress();
  }, [name, domainId]);
  
  const handleClick = () => {
    navigate(`/domain/${domainId}`);
  };

  const getCardStyle = () => {
    let style = "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1";
    if (progress > 0) {
      style += " border-l-4 border-indigo-500";
    }
    return style;
  };
  
  return (
    <div 
      className={getCardStyle()}
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
        <ProgressBar 
          value={progress} 
          color={colorClass}
          showPercentage={false}
        />
      </div>

      {progress === 100 && (
        <div className="mt-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Completed
          </span>
        </div>
      )}
    </div>
  );
};

export default DomainCard;