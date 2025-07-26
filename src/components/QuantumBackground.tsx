import React from 'react';
import { motion } from 'framer-motion';

const quantumEquations = [
  'ψ = α|0⟩ + β|1⟩',
  'H|0⟩ = (|0⟩ + |1⟩)/√2',
  'CNOT|00⟩ = |00⟩',
  'U = e^(-iHt/ℏ)',
  '⟨ψ|ψ⟩ = 1',
  'σₓ = |0⟩⟨1| + |1⟩⟨0|',
  'ρ = |ψ⟩⟨ψ|',
  'S = -Tr(ρ log ρ)',
];

export const QuantumBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Moving Equations - Base Visibility Reference */}
      {quantumEquations.map((equation, index) => (
        <motion.div
          key={index}
          className="absolute select-none font-mono text-xl md:text-2xl font-bold opacity-25 dark:opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: '-500px',
          }}
          animate={{
            x: ['0px', `${window.innerWidth + 1000}px`],
            y: [0, Math.random() * 20 - 10],
            rotate: [0, Math.random() * 10 - 5],
            scale: [0.95, 1.1, 1.0],
          }}
          transition={{
            duration: 80 + Math.random() * 40,
            repeat: Infinity,
            delay: index * 8,
            ease: 'linear',
          }}
        >
          <span 
            className="bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 dark:from-quantum-300 dark:via-purple-300 dark:to-electric-300 bg-clip-text text-transparent"
            style={{
              textShadow: '0 2px 8px rgba(67, 56, 202, 0.8), 0 4px 16px rgba(99, 102, 241, 0.6)',
              filter: 'drop-shadow(0 2px 4px rgba(67, 56, 202, 0.7)) drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
            }}
          >
            {equation}
          </span>
        </motion.div>
      ))}

      {/* Floating Particles - SAME VISIBILITY AS EQUATIONS */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute rounded-full shadow-lg opacity-25 dark:opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '14px',
            height: '14px',
            background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 50%, #0891b2 100%)',
            boxShadow: `
              0 0 15px rgba(67, 56, 202, 0.9), 
              0 0 30px rgba(124, 58, 237, 0.7), 
              0 0 45px rgba(8, 145, 178, 0.5),
              inset 0 1px 0 rgba(255,255,255,0.4)
            `,
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [0.8, 1.3, 0.8],
            opacity: [0.8, 1.0, 0.8],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: index * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced Grid Pattern - More Visible in Light, Very Transparent in Dark */}
      <div className="absolute inset-0 opacity-8 dark:opacity-3 transition-opacity duration-300">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(67, 56, 202, 0.9) 1px, transparent 1px),
              linear-gradient(90deg, rgba(67, 56, 202, 0.9) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Static Quantum Circuit Lines - Slower Motion */}
      <div className="absolute inset-0 opacity-10 dark:opacity-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`line-${index}`}
            className="absolute h-1 rounded-full"
            style={{
              top: `${25 + index * 25}%`,
              width: '100%',
              background: 'linear-gradient(to right, transparent, #4338ca, #7c3aed, #4338ca, transparent)',
              boxShadow: '0 0 12px rgba(67, 56, 202, 0.6), 0 0 24px rgba(124, 58, 237, 0.4)',
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              delay: index * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Quantum Gates - SAME VISIBILITY AS EQUATIONS */}
      {['H', 'X', 'CNOT'].map((gate, index) => (
        <motion.div
          key={`gate-${index}`}
          className="absolute w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-base border-2 backdrop-blur-md shadow-xl opacity-25 dark:opacity-20 transition-opacity duration-300"
          style={{
            top: `${Math.random() * 70 + 15}%`,
            left: `${Math.random() * 70 + 15}%`,
            background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
            borderColor: 'rgba(255, 255, 255, 0.4)',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
            boxShadow: `
              0 8px 32px rgba(67, 56, 202, 0.5), 
              0 4px 16px rgba(124, 58, 237, 0.4), 
              inset 0 1px 0 rgba(255,255,255,0.3)
            `,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 120, 240, 360],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            delay: index * 8,
            ease: "easeInOut",
          }}
        >
          {gate}
        </motion.div>
      ))}

      {/* Enhanced Gradient Overlay - More Transparent in Dark */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-purple-50/15 to-blue-50/20 dark:from-transparent dark:via-quantum-900/2 dark:to-purple-900/2 transition-colors duration-300" />
      
      {/* Radial Gradient for Hero Section - More Transparent in Dark */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-100/25 via-transparent to-transparent dark:from-quantum-900/7 dark:via-transparent dark:to-transparent" />
    </div>
  );
};