import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BookOpen, Target, Trophy } from 'lucide-react';

export const Playground: React.FC = () => {
  const examples = [
    {
      title: 'Bell State',
      description: 'Create an entangled pair of qubits',
      difficulty: 'Beginner',
      icon: Zap,
      color: 'from-quantum-500 to-purple-500 dark:from-quantum-400 dark:to-purple-400'
    },
    {
      title: 'Quantum Teleportation',
      description: 'Transfer quantum state between qubits',
      difficulty: 'Intermediate',
      icon: Target,
      color: 'from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400'
    },
    {
      title: 'GHZ State',
      description: 'Three-qubit entangled state',
      difficulty: 'Advanced',
      icon: Trophy,
      color: 'from-electric-500 to-quantum-500 dark:from-electric-400 dark:to-quantum-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Quantum Playground</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Explore quantum circuits with pre-built examples and interactive tutorials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className={`h-32 bg-gradient-to-r ${example.color} flex items-center justify-center`}>
                <example.icon className="w-12 h-12 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">{example.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded transition-colors duration-300">
                    {example.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">{example.description}</p>
                <button className="w-full bg-quantum-600 dark:bg-quantum-500 text-white py-2 rounded-lg hover:bg-quantum-700 dark:hover:bg-quantum-600 transition-colors duration-300">
                  Try Example
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};