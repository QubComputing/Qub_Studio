import React from 'react';
import { motion } from 'framer-motion';

interface MantineCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MantineCard: React.FC<MantineCardProps> = ({
  children,
  className = '',
  hover = true,
  gradient = false,
  padding = 'md',
  shadow = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const shadowClasses = {
    sm: 'shadow-sm hover:shadow-md',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl',
    xl: 'shadow-xl hover:shadow-2xl',
  };

  return (
    <motion.div
      className={`
        ${gradient 
          ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900' 
          : 'bg-white dark:bg-gray-800'
        }
        border border-gray-200/60 dark:border-gray-700/60
        rounded-2xl
        ${shadowClasses[shadow]}
        ${paddingClasses[padding]}
        transition-all duration-500 ease-out
        backdrop-blur-sm
        ${hover ? 'hover:border-quantum-300 dark:hover:border-quantum-600 hover:-translate-y-1' : ''}
        ${className}
      `}
      whileHover={hover ? { 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};