import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({
  progress,
  size = 'md',
  color = 'primary',
  showPercentage = true,
  label,
  animated = true,
  className = '',
}) => {
  const sizes = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colors = {
    primary: 'bg-indigo-600',
    secondary: 'bg-teal-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  };

  const percentage = Math.min(Math.max(progress, 0), 100);
  const animationClass = animated ? 'transition-all duration-500 ease-in-out' : '';

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-medium text-gray-700">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-500">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
        <div
          className={`${sizes[size]} ${colors[color]} rounded-full ${animationClass}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error']),
  showPercentage: PropTypes.bool,
  label: PropTypes.string,
  animated: PropTypes.bool,
  className: PropTypes.string,
};

export default ProgressBar; 