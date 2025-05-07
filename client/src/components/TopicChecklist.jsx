import React, { useState, useEffect } from 'react';
import { updateDomainProgress } from '../services/domainService';

const TopicChecklist = ({ topics: initialTopics, domainName, onProgressChange }) => {
  const [topics, setTopics] = useState(initialTopics);

  // Update parent component with progress whenever checked topics change
  useEffect(() => {
    if (onProgressChange) {
      const completedCount = topics.filter(topic => topic.completed).length;
      const progress = Math.round((completedCount / topics.length) * 100);
      onProgressChange(progress);
    }
  }, [topics, onProgressChange]);

  const handleCheckboxChange = async (id) => {
    const updatedTopics = topics.map(topic => 
      topic.id === id ? { ...topic, completed: !topic.completed } : topic
    );
    
    setTopics(updatedTopics);
    
    try {
      // Sync with backend
      const domainId = domainName.toLowerCase().replace(/\s+/g, '-');
      await updateDomainProgress(domainId, domainName, updatedTopics);
      
      // Update localStorage as fallback
      const key = `domain_${domainName.replace(/\s+/g, '_').toLowerCase()}`;
      localStorage.setItem(key, JSON.stringify(updatedTopics));
    } catch (error) {
      console.error('Error syncing progress:', error);
      // Revert changes if sync fails
      setTopics(topics);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Topics</h2>
      {topics.map(topic => (
        <div key={topic.id} className="flex items-center">
          <input
            type="checkbox"
            id={`topic-${topic.id}`}
            checked={topic.completed}
            onChange={() => handleCheckboxChange(topic.id)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
          />
          <label
            htmlFor={`topic-${topic.id}`}
            className="ml-3 text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            {topic.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TopicChecklist;