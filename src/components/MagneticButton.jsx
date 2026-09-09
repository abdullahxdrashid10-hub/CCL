import { motion } from 'motion/react';
import useMagneticMouse from '../hooks/useMagneticMouse';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.25,
  onClick,
  ...props
}) {
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
}
