import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Code, Gamepad2, BookOpen, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Zap },
    { path: '/ide', label: 'IDE', icon: Code },
    { path: '/playground', label: 'Playground', icon: Play },
    { path: '/challenges', label: 'Challenges', icon: Gamepad2 },
    { path: '/learn', label: 'Learn', icon: BookOpen },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo copy.png" 
              alt="Qub Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-lg transition-all duration-300 text-sm xl:text-base ${
                  location.pathname === path
                    ? 'bg-quantum-100 dark:bg-quantum-900 text-quantum-700 dark:text-quantum-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-quantum-600 dark:hover:text-quantum-400 hover:bg-quantum-50 dark:hover:bg-quantum-900/50'
                }`}
              >
                <Icon className="w-3 h-3 xl:w-4 xl:h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
            
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-quantum-600 dark:hover:text-quantum-400 p-1.5 sm:p-2 transition-all duration-300"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-screen overflow-y-auto">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all duration-300 text-base ${
                  location.pathname === path
                    ? 'bg-quantum-100 dark:bg-quantum-900 text-quantum-700 dark:text-quantum-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-quantum-600 dark:hover:text-quantum-400 hover:bg-quantum-50 dark:hover:bg-quantum-900/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};