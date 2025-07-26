import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MantineButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outline' | 'subtle' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'quantum' | 'purple' | 'electric' | 'gray';
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const MantineButton: React.FC<MantineButtonProps> = ({
  children,
  variant = 'filled',
  size = 'md',
  color = 'quantum',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const colorClasses = {
    quantum: {
      filled: 'bg-gradient-to-r from-quantum-500 to-quantum-600 hover:from-quantum-600 hover:to-quantum-700 text-white shadow-lg hover:shadow-xl',
      outline: 'border-2 border-quantum-500 text-quantum-600 dark:text-quantum-400 hover:bg-quantum-50 dark:hover:bg-quantum-900/20',
      subtle: 'text-quantum-600 dark:text-quantum-400 hover:bg-quantum-50 dark:hover:bg-quantum-900/20',
      gradient: 'bg-gradient-to-r from-quantum-400 via-purple-500 to-electric-500 hover:from-quantum-500 hover:via-purple-600 hover:to-electric-600 text-white shadow-lg hover:shadow-xl',
    },
    purple: {
      filled: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
      outline: 'border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20',
      subtle: 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20',
      gradient: 'bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white shadow-lg hover:shadow-xl',
    },
    electric: {
      filled: 'bg-gradient-to-r from-electric-500 to-electric-600 hover:from-electric-600 hover:to-electric-700 text-white shadow-lg hover:shadow-xl',
      outline: 'border-2 border-electric-500 text-electric-600 dark:text-electric-400 hover:bg-electric-50 dark:hover:bg-electric-900/20',
      subtle: 'text-electric-600 dark:text-electric-400 hover:bg-electric-50 dark:hover:bg-electric-900/20',
      gradient: 'bg-gradient-to-r from-electric-400 to-quantum-500 hover:from-electric-500 hover:to-quantum-600 text-white shadow-lg hover:shadow-xl',
    },
    gray: {
      filled: 'bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg',
      outline: 'border-2 border-gray-400 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800',
      subtle: 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800',
      gradient: 'bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white shadow-md hover:shadow-lg',
    },
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${colorClasses[color][variant]}
        ${fullWidth ? 'w-full' : ''}
        font-medium rounded-xl
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center space-x-2
        ${className}
      `}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && LeftIcon && <LeftIcon className="w-4 h-4" />}
      <span>{children}</span>
      {!loading && RightIcon && <RightIcon className="w-4 h-4" />}
    </motion.button>
  );
};