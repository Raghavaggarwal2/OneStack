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
  const baseClasses = 'bg-white dark:bg-black text-purple-900 dark:text-purple-100 rounded-lg border border-purple-100 dark:border-purple-900';
  const hoverClasses = hover ? 'transition-all duration-200 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600' : 'shadow-sm';
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