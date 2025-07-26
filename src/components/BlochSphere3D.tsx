import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Vector3, BufferGeometry, Float32BufferAttribute } from 'three';
import { RotateCcw, Play, Pause, Settings } from 'lucide-react';

interface BlochSphere3DProps {
  theta: number;
  phi: number;
  onThetaChange: (theta: number) => void;
  onPhiChange: (phi: number) => void;
  selectedGate?: string;
}

const StateVector: React.FC<{ theta: number; phi: number }> = ({ theta, phi }) => {
  const vectorRef = useRef<any>();
  
  useFrame(() => {
    if (vectorRef.current) {
      const x = Math.sin(theta) * Math.cos(phi);
      const y = Math.cos(theta);
      const z = Math.sin(theta) * Math.sin(phi);
      
      vectorRef.current.position.set(x, y, z);
    }
  });

  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.cos(theta);
  const z = Math.sin(theta) * Math.sin(phi);

  const points = [
    new Vector3(0, 0, 0),
    new Vector3(x, y, z)
  ];

  return (
    <group>
      {/* State vector line */}
      <Line
        points={points}
        color="#ef4444"
        lineWidth={4}
      />
      
      {/* State vector tip */}
      <mesh ref={vectorRef} position={[x, y, z]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

const BlochSphereGeometry: React.FC = () => {
  const sphereRef = useRef<any>();
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Create meridian lines
  const createMeridian = (angle: number) => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI;
      const x = Math.sin(theta) * Math.cos(angle);
      const y = Math.cos(theta);
      const z = Math.sin(theta) * Math.sin(angle);
      points.push(new Vector3(x, y, z));
    }
    return points;
  };

  // Create equator
  const createEquator = () => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      const x = Math.cos(angle);
      const y = 0;
      const z = Math.sin(angle);
      points.push(new Vector3(x, y, z));
    }
    return points;
  };

  return (
    <group ref={sphereRef}>
      {/* Main sphere wireframe */}
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial 
          color="#6366f1" 
          wireframe 
          transparent 
          opacity={0.2}
        />
      </Sphere>

      {/* Meridian lines */}
      <Line points={createMeridian(0)} color="#a5b4fc" lineWidth={1} transparent opacity={0.6} />
      <Line points={createMeridian(Math.PI/2)} color="#a5b4fc" lineWidth={1} transparent opacity={0.6} />
      <Line points={createMeridian(Math.PI)} color="#a5b4fc" lineWidth={1} transparent opacity={0.6} />
      <Line points={createMeridian(3*Math.PI/2)} color="#a5b4fc" lineWidth={1} transparent opacity={0.6} />

      {/* Equator */}
      <Line points={createEquator()} color="#a5b4fc" lineWidth={2} transparent opacity={0.8} />

      {/* Coordinate axes */}
      <Line points={[new Vector3(-1.2, 0, 0), new Vector3(1.2, 0, 0)]} color="#4f46e5" lineWidth={3} />
      <Line points={[new Vector3(0, -1.2, 0), new Vector3(0, 1.2, 0)]} color="#4f46e5" lineWidth={3} />
      <Line points={[new Vector3(0, 0, -1.2), new Vector3(0, 0, 1.2)]} color="#4f46e5" lineWidth={3} />

      {/* Labels */}
      <Text position={[0, 1.3, 0]} fontSize={0.15} color="#4f46e5" anchorX="center" anchorY="middle">
        |0⟩
      </Text>
      <Text position={[0, -1.3, 0]} fontSize={0.15} color="#4f46e5" anchorX="center" anchorY="middle">
        |1⟩
      </Text>
      <Text position={[1.3, 0, 0]} fontSize={0.15} color="#4f46e5" anchorX="center" anchorY="middle">
        |+⟩
      </Text>
      <Text position={[-1.3, 0, 0]} fontSize={0.15} color="#4f46e5" anchorX="center" anchorY="middle">
        |-⟩
      </Text>
      <Text position={[0, 0, 1.3]} fontSize={0.15} color="#4f46e5" anchorX="center" anchorY="middle">
        |+i⟩
      </Text>
      <Text position={[0, 0, -1.3]} fontSize={0.15} color="#4f46e5" anchorX="center" anchorY="middle">
        |-i⟩
      </Text>
    </group>
  );
};

export const BlochSphere3D: React.FC<BlochSphere3DProps> = ({
  theta,
  phi,
  onThetaChange,
  onPhiChange,
  selectedGate
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Gate equations and transformations
  const gateEquations = {
    'H': {
      equation: 'H = (1/√2)[1 1; 1 -1]',
      description: 'Hadamard gate creates superposition',
      transform: () => ({ theta: Math.PI/2, phi: 0 })
    },
    'X': {
      equation: 'X = σₓ = [0 1; 1 0]',
      description: 'Pauli-X gate (bit flip)',
      transform: () => ({ theta: Math.PI - theta, phi: phi + Math.PI })
    },
    'Y': {
      equation: 'Y = σᵧ = [0 -i; i 0]',
      description: 'Pauli-Y gate (bit and phase flip)',
      transform: () => ({ theta: Math.PI - theta, phi: phi + Math.PI/2 })
    },
    'Z': {
      equation: 'Z = σᵤ = [1 0; 0 -1]',
      description: 'Pauli-Z gate (phase flip)',
      transform: () => ({ theta: theta, phi: phi + Math.PI })
    },
    'RX': {
      equation: `RX(θ) = cos(θ/2)I - i sin(θ/2)σₓ`,
      description: 'Rotation around X-axis',
      transform: () => ({ theta: theta, phi: phi })
    },
    'RY': {
      equation: `RY(θ) = cos(θ/2)I - i sin(θ/2)σᵧ`,
      description: 'Rotation around Y-axis',
      transform: () => ({ theta: theta + Math.PI/4, phi: phi })
    },
    'RZ': {
      equation: `RZ(φ) = e^(-iφσᵤ/2)`,
      description: 'Rotation around Z-axis',
      transform: () => ({ theta: theta, phi: phi + Math.PI/4 })
    },
    'S': {
      equation: 'S = [1 0; 0 i]',
      description: 'Phase gate (π/2 phase)',
      transform: () => ({ theta: theta, phi: phi + Math.PI/2 })
    },
    'T': {
      equation: 'T = [1 0; 0 e^(iπ/4)]',
      description: 'T gate (π/4 phase)',
      transform: () => ({ theta: theta, phi: phi + Math.PI/4 })
    }
  };

  const animateGateTransformation = () => {
    if (!selectedGate || !gateEquations[selectedGate as keyof typeof gateEquations]) return;

    setIsAnimating(true);
    const gate = gateEquations[selectedGate as keyof typeof gateEquations];
    const targetState = gate.transform();
    
    const startTheta = theta;
    const startPhi = phi;
    const deltaTheta = targetState.theta - startTheta;
    const deltaPhi = targetState.phi - startPhi;
    
    let frame = 0;
    const totalFrames = 60;
    
    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      const newTheta = startTheta + deltaTheta * easeProgress;
      const newPhi = startPhi + deltaPhi * easeProgress;
      
      onThetaChange(newTheta);
      onPhiChange(newPhi);
      
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const resetState = () => {
    onThetaChange(0);
    onPhiChange(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.h3 
          className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          3D Bloch Sphere
        </motion.h3>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowControls(!showControls)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-quantum-600 dark:hover:text-quantum-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetState}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-quantum-600 dark:hover:text-quantum-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={animateGateTransformation}
            disabled={!selectedGate || isAnimating}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-quantum-500 to-purple-500 text-white rounded-lg hover:from-quantum-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm font-medium">{isAnimating ? 'Animating' : 'Animate'}</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 3D Bloch Sphere */}
        <div className="xl:col-span-2 min-h-0">
          <motion.div
            className="h-64 sm:h-80 md:h-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Canvas camera={{ 
              position: [3, 2, 3], 
              fov: window.innerWidth < 768 ? 60 : 50 
            }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} />
              
              <BlochSphereGeometry />
              <StateVector theta={theta} phi={phi} />
              
              <OrbitControls 
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={false}
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </motion.div>

          {/* Manual Controls */}
          <motion.div
            className="mt-4 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 sm:p-4 transition-colors duration-300">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      θ (Polar angle)
                    </label>
                    <span className="text-xs sm:text-sm font-mono text-quantum-600 dark:text-quantum-400 bg-white dark:bg-gray-800 px-2 py-1 rounded transition-colors duration-300">
                      {(theta * 180 / Math.PI).toFixed(1)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.PI}
                    step="0.01"
                    value={theta}
                    onChange={(e) => onThetaChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-quantum transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      φ (Azimuthal angle)
                    </label>
                    <span className="text-xs sm:text-sm font-mono text-quantum-600 dark:text-quantum-400 bg-white dark:bg-gray-800 px-2 py-1 rounded transition-colors duration-300">
                      {(phi * 180 / Math.PI).toFixed(1)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-Math.PI}
                    max={Math.PI}
                    step="0.01"
                    value={phi}
                    onChange={(e) => onPhiChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider-quantum transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Information Panel */}
        <div className="space-y-3 sm:space-y-4">
          {/* Quantum State */}
          <motion.div
            className="bg-gradient-to-br from-quantum-50 to-purple-50 dark:from-quantum-900/20 dark:to-purple-900/20 rounded-xl p-3 sm:p-4 border border-quantum-200/50 dark:border-quantum-700/50 transition-colors duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-sm sm:text-base font-semibold text-quantum-700 dark:text-quantum-300 mb-3 transition-colors duration-300">
              Quantum State
            </h4>
            <div className="font-mono text-xs sm:text-sm text-gray-700 dark:text-gray-300 space-y-2 transition-colors duration-300">
              <div className="bg-white dark:bg-gray-800 p-2 rounded border transition-colors duration-300 overflow-x-auto">
                |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
              </div>
              <div className="text-xs space-y-1 overflow-x-auto">
                <div>α = cos({(theta/2 * 180/Math.PI).toFixed(1)}°) = {Math.cos(theta/2).toFixed(3)}</div>
                <div>β = e^(i{(phi * 180/Math.PI).toFixed(1)}°)sin({(theta/2 * 180/Math.PI).toFixed(1)}°)</div>
                <div className="ml-4">= {(Math.sin(theta/2) * Math.cos(phi)).toFixed(3)} + i{(Math.sin(theta/2) * Math.sin(phi)).toFixed(3)}</div>
              </div>
            </div>
          </motion.div>

          {/* Gate Information */}
          {selectedGate && gateEquations[selectedGate as keyof typeof gateEquations] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-electric-50 to-quantum-50 dark:from-electric-900/20 dark:to-quantum-900/20 rounded-xl p-3 sm:p-4 border border-electric-200/50 dark:border-electric-700/50 transition-colors duration-300"
            >
              <h4 className="text-sm sm:text-base font-semibold text-electric-700 dark:text-electric-300 mb-3 transition-colors duration-300">
                {selectedGate} Gate
              </h4>
              <div className="space-y-2">
                <div className="font-mono text-xs sm:text-sm text-electric-600 dark:text-electric-400 bg-white dark:bg-gray-800 p-2 rounded border transition-colors duration-300 overflow-x-auto">
                  {gateEquations[selectedGate as keyof typeof gateEquations].equation}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {gateEquations[selectedGate as keyof typeof gateEquations].description}
                </div>
              </div>
            </motion.div>
          )}

          {/* Measurement Probabilities */}
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-3 sm:p-4 border border-purple-200/50 dark:border-purple-700/50 transition-colors duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-sm sm:text-base font-semibold text-purple-700 dark:text-purple-300 mb-3 transition-colors duration-300">
              Measurement Probabilities
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">P(|0⟩)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-12 sm:w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-quantum-400 to-purple-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.pow(Math.cos(theta/2), 2) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="font-mono text-xs sm:text-sm text-gray-900 dark:text-white w-10 sm:w-12 text-right transition-colors duration-300">
                    {Math.pow(Math.cos(theta/2), 2).toFixed(3)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">P(|1⟩)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-12 sm:w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.pow(Math.sin(theta/2), 2) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="font-mono text-xs sm:text-sm text-gray-900 dark:text-white w-10 sm:w-12 text-right transition-colors duration-300">
                    {Math.pow(Math.sin(theta/2), 2).toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};