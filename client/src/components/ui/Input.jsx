import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  label,
  error,
  success,
  helperText,
  className = '',
  id,
  required = false,
  size = 'md',
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-2.5 text-lg',
  };

  const getInputStyles = () => {
    if (error) {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    }
    if (success) {
      return 'border-green-500 focus:border-green-500 focus:ring-green-500';
    }
    return 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500';
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={inputId}
          className={`
            block w-full rounded-lg
            ${sizes[size]}
            ${getInputStyles()}
            shadow-sm
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${className}
          `}
          required={required}
          {...props}
        />
        {(error || success) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {error && (
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            {success && (
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        )}
      </div>
      {(error || helperText || success) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-500'}`}>
          {error || helperText || (success && 'Valid input')}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.bool,
  helperText: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Input; 