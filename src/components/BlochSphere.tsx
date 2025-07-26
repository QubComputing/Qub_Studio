import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface BlochSphereProps {
  theta: number;
  phi: number;
  onThetaChange: (theta: number) => void;
  onPhiChange: (phi: number) => void;
  selectedGate?: string;
}

export const BlochSphere: React.FC<BlochSphereProps> = ({
  theta,
  phi,
  onThetaChange,
  onPhiChange,
  selectedGate
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);

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

  const drawBlochSphere = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sphere outline
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw equator
    ctx.strokeStyle = '#a5b4fc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw meridians
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius * 0.3, radius, 0, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw axes
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 2;
    
    // Z-axis (vertical)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX, centerY + radius + 10);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(centerX - radius - 10, centerY);
    ctx.lineTo(centerX + radius + 10, centerY);
    ctx.stroke();

    // Y-axis (perspective)
    ctx.beginPath();
    ctx.moveTo(centerX - radius * 0.7, centerY + radius * 0.7);
    ctx.lineTo(centerX + radius * 0.7, centerY - radius * 0.7);
    ctx.stroke();

    // Draw state vector
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi) * 0.3; // Perspective
    const z = radius * Math.cos(theta);

    const vectorX = centerX + x;
    const vectorY = centerY - z;

    // State vector
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(vectorX, vectorY);
    ctx.stroke();

    // State vector tip
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(vectorX, vectorY, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Labels
    ctx.fillStyle = '#4f46e5';
    ctx.font = '14px JetBrains Mono';
    ctx.fillText('|0⟩', centerX - 10, centerY - radius - 15);
    ctx.fillText('|1⟩', centerX - 10, centerY + radius + 25);
    ctx.fillText('|+⟩', centerX + radius + 5, centerY + 5);
    ctx.fillText('|-⟩', centerX - radius - 25, centerY + 5);

    // Draw angle indicators
    if (theta > 0.1) {
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, -Math.PI/2, -Math.PI/2 + theta);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.fillStyle = '#8b5cf6';
      ctx.font = '12px JetBrains Mono';
      ctx.fillText('θ', centerX + 35, centerY - 10);
    }

    if (Math.abs(phi) > 0.1) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, phi);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.fillStyle = '#06b6d4';
      ctx.font = '12px JetBrains Mono';
      ctx.fillText('φ', centerX + 45, centerY + 15);
    }
  };

  useEffect(() => {
    drawBlochSphere();
  }, [theta, phi, animationFrame]);

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
      setAnimationFrame(frame);
      
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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
          Bloch Sphere Visualization
        </h3>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={animateGateTransformation}
            disabled={!selectedGate || isAnimating}
            className="flex items-center space-x-1 px-3 py-1 bg-quantum-600 dark:bg-quantum-500 text-white rounded-md hover:bg-quantum-700 dark:hover:bg-quantum-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm"
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isAnimating ? 'Animating' : 'Animate'}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetState}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bloch Sphere Canvas */}
        <div className="flex flex-col items-center">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-300"
          />
          
          {/* Manual Controls */}
          <div className="mt-4 w-full space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                θ (Polar angle): {(theta * 180 / Math.PI).toFixed(1)}°
              </label>
              <input
                type="range"
                min="0"
                max={Math.PI}
                step="0.01"
                value={theta}
                onChange={(e) => onThetaChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer transition-colors duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                φ (Azimuthal angle): {(phi * 180 / Math.PI).toFixed(1)}°
              </label>
              <input
                type="range"
                min={-Math.PI}
                max={Math.PI}
                step="0.01"
                value={phi}
                onChange={(e) => onPhiChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        {/* Gate Information */}
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Quantum State
            </h4>
            <div className="font-mono text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <div>|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩</div>
              <div className="mt-2">
                <div>α = cos({(theta/2 * 180/Math.PI).toFixed(1)}°) = {Math.cos(theta/2).toFixed(3)}</div>
                <div>β = e^(i{(phi * 180/Math.PI).toFixed(1)}°)sin({(theta/2 * 180/Math.PI).toFixed(1)}°) = {(Math.sin(theta/2) * Math.cos(phi)).toFixed(3)} + i{(Math.sin(theta/2) * Math.sin(phi)).toFixed(3)}</div>
              </div>
            </div>
          </div>

          {selectedGate && gateEquations[selectedGate as keyof typeof gateEquations] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-quantum-50 dark:bg-quantum-900/20 rounded-lg p-4 border border-quantum-200 dark:border-quantum-700 transition-colors duration-300"
            >
              <h4 className="font-semibold text-quantum-700 dark:text-quantum-300 mb-2 transition-colors duration-300">
                {selectedGate} Gate
              </h4>
              <div className="space-y-2">
                <div className="font-mono text-sm text-quantum-600 dark:text-quantum-400 transition-colors duration-300">
                  {gateEquations[selectedGate as keyof typeof gateEquations].equation}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {gateEquations[selectedGate as keyof typeof gateEquations].description}
                </div>
              </div>
            </motion.div>
          )}

          {/* Measurement Probabilities */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Measurement Probabilities
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">P(|0⟩)</span>
                <span className="font-mono text-sm text-gray-900 dark:text-white transition-colors duration-300">
                  {Math.pow(Math.cos(theta/2), 2).toFixed(3)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">P(|1⟩)</span>
                <span className="font-mono text-sm text-gray-900 dark:text-white transition-colors duration-300">
                  {Math.pow(Math.sin(theta/2), 2).toFixed(3)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};