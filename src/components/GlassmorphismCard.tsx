import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = '',
  hover = true,
  blur = 'md',
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  return (
    <motion.div
      className={`
        ${blurClasses[blur]}
        bg-white/70 dark:bg-gray-800/70
        border border-white/20 dark:border-gray-700/30
        rounded-xl shadow-xl
        transition-all duration-300
        ${hover ? 'hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-2xl hover:border-white/30 dark:hover:border-gray-600/40' : ''}
        ${className}
      `}
      whileHover={hover ? { 
        scale: 1.02,
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};