import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import useMagneticMouse from '../hooks/useMagneticMouse';

const MagneticButton = forwardRef(function MagneticButton(
  { children, className = '', strength = 0.25, onClick, ...props },
  _
) {
  const magneticRef = useMagneticMouse(strength);

  return (
    <motion.div
      ref={magneticRef}
      className="inline-block"
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <div onClick={onClick} className={className} {...props}>
        {children}
      </div>
    </motion.div>
  );
});

export default MagneticButton;
