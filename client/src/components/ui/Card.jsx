import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'default',
  onClick,
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700';
  const hoverClasses = hover ? 'transition-all duration-200 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600' : 'shadow-sm';
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    default: 'p-4',
    lg: 'p-6',
  };
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        ${baseClasses}
        ${hoverClasses}
        ${paddingClasses[padding]}
        ${clickableClasses}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg']),
  onClick: PropTypes.func,
};

export default Card;