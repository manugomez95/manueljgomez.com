import PropTypes from 'prop-types';

export const FloatingCard = ({ className, children }) => {
  return (
    <div className={`floating-card ${className}`}>
      {children}
    </div>
  );
};

FloatingCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}; 