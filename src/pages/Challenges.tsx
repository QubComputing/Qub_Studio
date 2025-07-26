import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Lock, CheckCircle } from 'lucide-react';

export const Challenges: React.FC = () => {
  const challenges = [
    {
      id: 1,
      title: 'Quantum Basics',
      description: 'Learn the fundamentals of quantum gates',
      difficulty: 'Beginner',
      completed: true,
      locked: false,
      stars: 3,
      totalStars: 3
    },
    {
      id: 2,
      title: 'Superposition Master',
      description: 'Create and manipulate quantum superposition',
      difficulty: 'Beginner',
      completed: true,
      locked: false,
      stars: 2,
      totalStars: 3
    },
    {
      id: 3,
      title: 'Entanglement Explorer',
      description: 'Build entangled quantum states',
      difficulty: 'Intermediate',
      completed: false,
      locked: false,
      stars: 0,
      totalStars: 3
    },
    {
      id: 4,
      title: 'Quantum Algorithms',
      description: 'Implement famous quantum algorithms',
      difficulty: 'Advanced',
      completed: false,
      locked: true,
      stars: 0,
      totalStars: 3
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Quantum Challenges</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Master quantum computing through gamified challenges and earn stars
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                challenge.locked ? 'opacity-60' : 'hover:-translate-y-2'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      challenge.completed ? 'bg-green-100 dark:bg-green-900' : challenge.locked ? 'bg-gray-100 dark:bg-gray-700' : 'bg-quantum-100 dark:bg-quantum-900'
                    }`}>
                      {challenge.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      ) : challenge.locked ? (
                        <Lock className="w-6 h-6 text-gray-400" />
                      ) : (
                        <Trophy className="w-6 h-6 text-quantum-600 dark:text-quantum-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">{challenge.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{challenge.description}</p>
                    </div>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded ${
                    challenge.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                    'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: challenge.totalStars }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < challenge.stars ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 transition-colors duration-300">
                      {challenge.stars}/{challenge.totalStars} stars
                    </span>
                  </div>
                  
                  <button 
                    disabled={challenge.locked}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                      challenge.locked 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        : challenge.completed
                        ? 'bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600'
                        : 'bg-quantum-600 dark:bg-quantum-500 text-white hover:bg-quantum-700 dark:hover:bg-quantum-600'
                    }`}
                  >
                    {challenge.locked ? 'Locked' : challenge.completed ? 'Completed' : 'Start Challenge'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};