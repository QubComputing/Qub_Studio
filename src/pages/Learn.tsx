import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, Users } from 'lucide-react';

export const Learn: React.FC = () => {
  const courses = [
    {
      title: 'Quantum Computing Fundamentals',
      description: 'Start your quantum journey with the basics',
      duration: '4 hours',
      students: '12,534',
      lessons: 12,
      difficulty: 'Beginner',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Quantum Algorithms Deep Dive',
      description: 'Master famous quantum algorithms',
      duration: '6 hours',
      students: '8,421',
      lessons: 18,
      difficulty: 'Intermediate',
      image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Quantum Machine Learning',
      description: 'Explore the intersection of quantum and AI',
      duration: '8 hours',
      students: '3,892',
      lessons: 24,
      difficulty: 'Advanced',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400'
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Learn Quantum Computing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Comprehensive courses designed to take you from quantum novice to expert
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-video bg-gradient-to-r from-quantum-400 to-purple-500 relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-4 right-4">
                  <span className={`text-xs px-2 py-1 rounded text-white ${
                    course.difficulty === 'Beginner' ? 'bg-green-500' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-300">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>
                
                <button className="w-full bg-quantum-600 dark:bg-quantum-500 text-white py-3 rounded-lg hover:bg-quantum-700 dark:hover:bg-quantum-600 transition-colors duration-300 flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Start Course</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};