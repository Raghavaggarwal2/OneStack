import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm dark:bg-indigo-700 dark:hover:bg-indigo-600',
  secondary: 'bg-teal-500 hover:bg-teal-600 text-white shadow-sm dark:bg-teal-600 dark:hover:bg-teal-500',
  outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 bg-white dark:border-indigo-400 dark:text-indigo-400 dark:bg-transparent dark:hover:bg-indigo-900',
  ghost: 'text-indigo-600 hover:bg-indigo-50 bg-transparent dark:text-indigo-400 dark:hover:bg-indigo-900',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm dark:bg-red-700 dark:hover:bg-red-600',
  success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm dark:bg-green-700 dark:hover:bg-green-600',
};

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  isLoading = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
  onClick,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800
    disabled:opacity-60 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <LoadingSpinner 
          size="sm" 
          color={(variant === 'outline' || variant === 'ghost') ? 'primary' : 'white'} 
          className="mr-2"
        />
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger', 'success']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;