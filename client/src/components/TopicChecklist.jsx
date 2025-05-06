import React, { useState, useEffect } from 'react';

const TopicChecklist = ({ topics, domainName, onProgressChange }) => {
  const [checkedTopics, setCheckedTopics] = useState(topics);

  // Update parent component with progress whenever checked topics change
  useEffect(() => {
    if (onProgressChange) {
      const completedCount = checkedTopics.filter(topic => topic.completed).length;
      const progress = Math.round((completedCount / checkedTopics.length) * 100);
      onProgressChange(progress);
    }
  }, [checkedTopics, onProgressChange]);

  const handleCheckboxChange = (id) => {
    const updatedTopics = checkedTopics.map(topic => 
      topic.id === id ? { ...topic, completed: !topic.completed } : topic
    );
    
    setCheckedTopics(updatedTopics);
    
    // Save to localStorage
    try {
      const key = `domain_${domainName.replace(/\s+/g, '_').toLowerCase()}`;
      localStorage.setItem(key, JSON.stringify(updatedTopics));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium mb-3">Topics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {checkedTopics.map(topic => (
          <div key={topic.id} className="flex items-center p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              id={`topic-${topic.id}`}
              checked={topic.completed}
              onChange={() => handleCheckboxChange(topic.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label 
              htmlFor={`topic-${topic.id}`} 
              className={`ml-2 block text-sm ${topic.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {topic.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicChecklist; 