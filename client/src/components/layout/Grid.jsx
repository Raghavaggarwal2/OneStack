import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({
  children,
  cols = 1,
  gap = 4,
  className = '',
}) => {
  const getGridCols = () => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }
    return Object.entries(cols)
      .map(([breakpoint, value]) => 
        breakpoint === 'base' ? `grid-cols-${value}` : `${breakpoint}:grid-cols-${value}`
      )
      .join(' ');
  };

  return (
    <div 
      className={`grid ${getGridCols()} gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  cols: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      base: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number,
    }),
  ]),
  gap: PropTypes.number,
  className: PropTypes.string,
};

export default Grid; 