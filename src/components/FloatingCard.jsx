import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export const FloatingCard = ({ className, initial, animate, children }) => {
  return (
    <motion.div
      className={`floating-card ${className}`}
      initial={initial}
      animate={animate}
    >
      {children}
    </motion.div>
  );
};

FloatingCard.propTypes = {
  className: PropTypes.string,
  initial: PropTypes.object,
  animate: PropTypes.object,
  children: PropTypes.node.isRequired
}; 