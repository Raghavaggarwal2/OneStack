import React from 'react';
import PropTypes from 'prop-types';

const Section = ({
  children,
  title,
  description,
  className = '',
}) => {
  return (
    <section className={`py-8 ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};

export default Section;