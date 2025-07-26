import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Code, 
  Cpu, 
  Gamepad2, 
  BookOpen, 
  Zap, 
  Users,
  Star,
  Play,
  ChevronRight,
  Atom,
  Brain,
  Target
} from 'lucide-react';
import { ScrollAwareContainer } from '../components/ScrollAwareContainer';
import { GlassmorphismCard } from '../components/GlassmorphismCard';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Qub-code IDE',
      description: 'Professional development environment with syntax highlighting, IntelliSense, and quantum-specific extensions.',
      gradient: 'from-quantum-500 to-purple-500 dark:from-quantum-400 dark:to-purple-400'
    },
    {
      icon: Cpu,
      title: 'Visual Circuit Builder',
      description: 'Drag & drop quantum gates with real-time visualization. Build circuits with up to 8 qubits and see instant results.',
      gradient: 'from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400'
    },
    {
      icon: Gamepad2,
      title: 'Gamified Learning',
      description: 'Interactive challenges and puzzles make learning quantum computing fun and engaging for all skill levels.',
      gradient: 'from-electric-500 to-quantum-500 dark:from-electric-400 dark:to-quantum-400'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Tutorials',
      description: 'Step-by-step guides from basics to advanced concepts. Perfect for beginners and experienced developers.',
      gradient: 'from-pink-500 to-purple-500 dark:from-pink-400 dark:to-purple-400'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Students Learning', icon: Users },
    { value: '500+', label: 'Quantum Circuits', icon: Atom },
    { value: '50+', label: 'Interactive Challenges', icon: Target },
    { value: '95%', label: 'Success Rate', icon: Brain },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Optimized Background - More Visible in Light, More Transparent in Dark */}
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-50/30 via-purple-25/35 to-electric-50/30 dark:from-gray-900/95 dark:via-quantum-900/8 dark:to-purple-900/8 transition-colors duration-300"></div>
        
        {/* Reduced Animated Background Elements - More Transparent in Dark */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-10 left-10 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-25 dark:opacity-15"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(147, 51, 234, 0.6))',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute top-20 right-20 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-25 dark:opacity-15"
            style={{
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.6))',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-25 dark:opacity-15"
            style={{
              background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.8), rgba(99, 102, 241, 0.6))',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 35, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-3 sm:space-y-4">
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300 px-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Master{' '}
                <span 
                  className="bg-gradient-to-r from-quantum-700 to-purple-700 dark:from-quantum-400 dark:to-purple-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: 'none',
                  }}
                >
                  Quantum Computing
                </span>
                <br />
                with Interactive Learning
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto transition-colors duration-300 px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                Professional Qub-code IDE, visual circuit builder, and real quantum simulations. 
                Perfect for beginners and advanced learners alike.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/ide"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-quantum-600 to-purple-600 dark:from-quantum-500 dark:to-purple-500 text-white rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                  style={{
                    boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3), 0 4px 16px rgba(147, 51, 234, 0.2)',
                  }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/learn"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/98 dark:bg-gray-800/60 text-quantum-700 dark:text-quantum-400 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-quantum-300 dark:border-quantum-700 hover:border-quantum-500 dark:hover:border-quantum-500 backdrop-blur-sm w-full sm:w-auto"
                  style={{
                    boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2), 0 4px 16px rgba(0,0,0,0.1)',
                  }}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn First
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/85 dark:bg-gray-800/40 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAwareContainer staggerChildren staggerDelay={0.1}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <GlassmorphismCard key={index} className="text-center group p-4 sm:p-6">
                  <div className="flex items-center justify-center mb-4">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-quantum-200 dark:bg-quantum-900 rounded-xl flex items-center justify-center transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-quantum-700 dark:text-quantum-400" />
                    </motion.div>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-quantum-700 dark:text-quantum-400 mb-2 transition-colors duration-300">{stat.value}</div>
                  <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 transition-colors duration-300">{stat.label}</div>
                </GlassmorphismCard>
              ))}
            </div>
          </ScrollAwareContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50/85 dark:bg-gray-900/40 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAwareContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 px-4">
                Why Choose Qub?
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto transition-colors duration-300 px-4">
                Our platform combines professional development tools with visual learning to make quantum computing accessible to everyone.
              </p>
            </motion.div>
          </ScrollAwareContainer>

          <ScrollAwareContainer staggerChildren staggerDelay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <GlassmorphismCard key={index} className="p-6 sm:p-8">
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 sm:mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>
                </GlassmorphismCard>
              ))}
            </div>
          </ScrollAwareContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-quantum-600 to-purple-600 dark:from-quantum-500 dark:to-purple-500 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAwareContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-4">
                Ready to Start Your Quantum Journey?
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-quantum-100 dark:text-quantum-200 max-w-3xl mx-auto px-4">
                Join thousands of learners who are already building quantum circuits and exploring the future of computing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/ide"
                    className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-quantum-600 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Launch Qub-code
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/challenges"
                    className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white rounded-xl font-semibold text-base sm:text-lg border-2 border-white hover:bg-white hover:text-quantum-600 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
                  >
                    <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Try Challenges
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </ScrollAwareContainer>
        </div>
      </section>
    </div>
  );
};