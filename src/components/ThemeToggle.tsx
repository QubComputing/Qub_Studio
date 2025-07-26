import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeContext } from './ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeContext();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-300">
        {themes.map(({ value, icon: Icon, label }) => (
          <motion.button
            key={value}
            onClick={() => setTheme(value)}
            className={`relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-300 ${
              theme === value
                ? 'text-quantum-600 dark:text-quantum-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            title={label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === value && (
              <motion.div
                layoutId="theme-indicator"
                className="absolute inset-0 bg-white dark:bg-gray-700 rounded-md shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <motion.div
              className="relative z-10"
              animate={{ 
                rotate: theme === value ? [0, 360] : 0,
                scale: theme === value ? [1, 1.2, 1] : 1
              }}
              transition={{ 
                duration: theme === value ? 0.6 : 0.3,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-4 h-4" />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};