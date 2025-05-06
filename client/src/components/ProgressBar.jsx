import React from 'react';

const ProgressBar = ({ value, color = 'bg-blue-500' }) => {
  // Ensure value is between 0-100
  const progress = Math.min(Math.max(0, value), 100);
  
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-300 ease-in-out`} 
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
};

export default ProgressBar; 