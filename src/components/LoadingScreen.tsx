import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    // Show logo after initial delay
    const logoTimer = setTimeout(() => setShowLogo(true), 300);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Complete loading after a brief delay
          setTimeout(() => onLoadingComplete(), 800);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  // Generate quantum particles
  const particleCount = windowSize.width < 768 ? 15 : windowSize.width < 1024 ? 20 : 25;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: windowSize.width < 768 ? Math.random() * 6 + 3 : Math.random() * 8 + 4,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 3,
  }));

  const quantumEquations = [
    'ψ = α|0⟩ + β|1⟩',
    'H|0⟩ = (|0⟩ + |1⟩)/√2',
    'U = e^(-iHt/ℏ)',
    '⟨ψ|ψ⟩ = 1',
    'σₓ = |0⟩⟨1| + |1⟩⟨0|',
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, exit: { duration: 0.8 } }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-quantum-900 via-purple-900 to-electric-900 flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Floating Quantum Equations */}
        {quantumEquations.map((equation, index) => (
          <motion.div
            key={index}
            className="absolute text-white/30 font-mono text-sm sm:text-base md:text-lg font-bold select-none"
            style={{
              top: `${20 + index * 15}%`,
              left: '-200px',
            }}
            animate={{
              x: ['0px', `${windowSize.width + 400}px`],
              y: [0, Math.sin(index) * 30],
              rotate: [0, 360],
              scale: [0.8, 1.2, 1.0],
            }}
            transition={{
              duration: 12 + index * 2,
              repeat: Infinity,
              delay: index * 1.5,
              ease: 'linear',
            }}
          >
            {equation}
          </motion.div>
        ))}

        {/* Quantum Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-quantum-400 to-electric-400 shadow-lg"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              boxShadow: `
                0 0 ${particle.size * 2}px rgba(99, 102, 241, 0.8),
                0 0 ${particle.size * 4}px rgba(8, 145, 178, 0.6),
                inset 0 1px 0 rgba(255,255,255,0.4)
              `,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(particle.id) * 30, 0],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Quantum Gates Floating */}
        {['H', 'X', 'CNOT', 'RY', 'Z'].map((gate, index) => (
          <motion.div
            key={gate}
            className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base md:text-lg border-2 backdrop-blur-md shadow-xl text-white"
            style={{
              top: `${15 + index * 15}%`,
              left: `${10 + index * 20}%`,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(147, 51, 234, 0.3))',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: `
                0 8px 32px rgba(99, 102, 241, 0.4),
                0 4px 16px rgba(147, 51, 234, 0.3),
                inset 0 1px 0 rgba(255,255,255,0.2)
              `,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              delay: index * 1.2,
              ease: "easeInOut",
            }}
          >
            {gate}
          </motion.div>
        ))}

        {/* Central Content */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center min-h-screen">
          {/* Logo Container */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20,
                  duration: 1.2 
                }}
                className="mb-12 flex items-center justify-center"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative flex items-center justify-center"
                >
                  {/* Glowing Ring Around Logo */}
                  <motion.div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.8), transparent, rgba(8, 145, 178, 0.8), transparent)',
                      filter: 'blur(20px)',
                      width: windowSize.width < 768 ? '120px' : windowSize.width < 1024 ? '160px' : '200px',
                      height: windowSize.width < 768 ? '120px' : windowSize.width < 1024 ? '160px' : '200px',
                      transform: 'scale(1.2)',
                    }}
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Logo */}
                  <motion.img
                    src="/logo copy.png"
                    alt="Qub Logo"
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 relative z-10 drop-shadow-2xl object-contain"
                    animate={{
                      filter: [
                        'drop-shadow(0 0 20px rgba(99, 102, 241, 0.8))',
                        'drop-shadow(0 0 40px rgba(8, 145, 178, 0.8))',
                        'drop-shadow(0 0 20px rgba(99, 102, 241, 0.8))',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="space-y-6 flex flex-col items-center"
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center"
              animate={{
                textShadow: [
                  '0 0 20px rgba(99, 102, 241, 0.8)',
                  '0 0 40px rgba(8, 145, 178, 0.8)',
                  '0 0 20px rgba(99, 102, 241, 0.8)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Qub
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-quantum-200 mb-6 sm:mb-8 md:mb-10 text-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Quantum Computing Platform
            </motion.p>

            {/* Progress Bar */}
            <div className="w-72 sm:w-80 md:w-96 px-4">
              <div className="flex justify-between text-sm text-quantum-300 mb-2">
                <span className="text-xs sm:text-sm">Initializing Quantum Environment</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2 overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-quantum-400 to-electric-400 rounded-full shadow-lg transition-all duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(8, 145, 178, 0.6)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Loading States */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-quantum-300 text-xs sm:text-sm space-y-1 text-center px-4"
            >
              <motion.div
                animate={{ opacity: progress > 20 ? 1 : 0.3 }}
                className="flex items-center justify-center space-x-2 flex-wrap"
              >
                <div className="w-2 h-2 bg-quantum-400 rounded-full animate-pulse" />
                <span>Loading quantum gates...</span>
              </motion.div>
              <motion.div
                animate={{ opacity: progress > 50 ? 1 : 0.3 }}
                className="flex items-center justify-center space-x-2 flex-wrap"
              >
                <div className="w-2 h-2 bg-electric-400 rounded-full animate-pulse" />
                <span>Initializing Bloch sphere...</span>
              </motion.div>
              <motion.div
                animate={{ opacity: progress > 80 ? 1 : 0.3 }}
                className="flex items-center justify-center space-x-2 flex-wrap"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span>Preparing IDE environment...</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quantum Circuit Lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: windowSize.width < 768 ? 3 : 5 }).map((_, index) => (
            <motion.div
              key={`line-${index}`}
              className="absolute h-0.5 sm:h-1 rounded-full"
              style={{
                top: `${20 + index * 15}%`,
                width: '100%',
                background: 'linear-gradient(to right, transparent, rgba(99, 102, 241, 0.8), rgba(8, 145, 178, 0.8), rgba(99, 102, 241, 0.8), transparent)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.6), 0 0 40px rgba(8, 145, 178, 0.4)',
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: index * 1.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};