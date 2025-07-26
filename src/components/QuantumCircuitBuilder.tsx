import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Copy, RotateCcw, Zap, Sparkles } from 'lucide-react';
import { MantineButton } from './MantineButton';

interface QuantumGate {
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT' | 'CZ' | 'RX' | 'RY' | 'RZ' | 'S' | 'T';
  qubit: number;
  control?: number;
  angle?: number;
  position: number;
}

interface QuantumCircuitBuilderProps {
  onGateSelect?: (gate: string) => void;
  onCircuitChange?: (gates: QuantumGate[]) => void;
}

export const QuantumCircuitBuilder: React.FC<QuantumCircuitBuilderProps> = ({
  onGateSelect,
  onCircuitChange
}) => {
  const [gates, setGates] = useState<QuantumGate[]>([]);
  const [selectedGate, setSelectedGate] = useState<QuantumGate['type']>('H');
  const [numQubits] = useState(3);
  const [circuitLength] = useState(8);

  const gateTypes = [
    { type: 'H' as const, name: 'Hadamard', color: 'from-blue-400 to-blue-600', equation: 'H = (1/√2)[1 1; 1 -1]' },
    { type: 'X' as const, name: 'Pauli-X', color: 'from-red-400 to-red-600', equation: 'X = [0 1; 1 0]' },
    { type: 'Y' as const, name: 'Pauli-Y', color: 'from-green-400 to-green-600', equation: 'Y = [0 -i; i 0]' },
    { type: 'Z' as const, name: 'Pauli-Z', color: 'from-purple-400 to-purple-600', equation: 'Z = [1 0; 0 -1]' },
    { type: 'CNOT' as const, name: 'CNOT', color: 'from-orange-400 to-orange-600', equation: 'CNOT = [1 0 0 0; 0 1 0 0; 0 0 0 1; 0 0 1 0]' },
    { type: 'RX' as const, name: 'RX(θ)', color: 'from-pink-400 to-pink-600', equation: 'RX(θ) = cos(θ/2)I - i sin(θ/2)σₓ' },
    { type: 'RY' as const, name: 'RY(θ)', color: 'from-indigo-400 to-indigo-600', equation: 'RY(θ) = cos(θ/2)I - i sin(θ/2)σᵧ' },
    { type: 'RZ' as const, name: 'RZ(φ)', color: 'from-teal-400 to-teal-600', equation: 'RZ(φ) = e^(-iφσᵤ/2)' },
    { type: 'S' as const, name: 'S Gate', color: 'from-cyan-400 to-cyan-600', equation: 'S = [1 0; 0 i]' },
    { type: 'T' as const, name: 'T Gate', color: 'from-amber-400 to-amber-600', equation: 'T = [1 0; 0 e^(iπ/4)]' },
  ];

  const addGate = (qubit: number, position: number) => {
    const newGate: QuantumGate = {
      type: selectedGate,
      qubit,
      position,
      angle: ['RX', 'RY', 'RZ'].includes(selectedGate) ? Math.PI/4 : undefined,
    };

    const updatedGates = [...gates, newGate];
    setGates(updatedGates);
    onCircuitChange?.(updatedGates);
  };

  const removeGate = (index: number) => {
    const updatedGates = gates.filter((_, i) => i !== index);
    setGates(updatedGates);
    onCircuitChange?.(updatedGates);
  };

  const clearCircuit = () => {
    setGates([]);
    onCircuitChange?.([]);
  };

  const handleGateSelect = (gateType: QuantumGate['type']) => {
    setSelectedGate(gateType);
    onGateSelect?.(gateType);
  };

  const getGateAtPosition = (qubit: number, position: number) => {
    return gates.find(gate => gate.qubit === qubit && gate.position === position);
  };

  const renderGate = (gate: QuantumGate, index: number) => {
    const gateInfo = gateTypes.find(g => g.type === gate.type);
    
    return (
      <motion.div
        key={`${gate.qubit}-${gate.position}-${index}`}
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, rotate: 180, opacity: 0 }}
        whileHover={{ 
          scale: 1.15, 
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.3 }
        }}
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gateInfo?.color} text-white flex items-center justify-center font-bold text-sm cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden`}
        onClick={() => removeGate(index)}
        title={`${gateInfo?.name} gate - Click to remove\n${gateInfo?.equation}`}
      >
        {/* Sparkle effect */}
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
        
        {gate.type}
        {gate.angle && (
          <motion.span 
            className="absolute -bottom-1 -right-1 text-xs bg-white text-gray-800 rounded-full px-1.5 py-0.5 font-medium shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {(gate.angle * 180 / Math.PI).toFixed(0)}°
          </motion.span>
        )}
      </motion.div>
    );
  };

  const generateQiskitCode = () => {
    const codeLines = [
      '# Generated Quantum Circuit',
      'from qiskit import QuantumCircuit, execute, Aer',
      'from qiskit.visualization import plot_histogram',
      'import numpy as np',
      '',
      `qc = QuantumCircuit(${numQubits}, ${numQubits})`,
      ''
    ];

    // Sort gates by position for proper execution order
    const sortedGates = [...gates].sort((a, b) => a.position - b.position);

    sortedGates.forEach(gate => {
      switch (gate.type) {
        case 'H':
          codeLines.push(`qc.h(${gate.qubit})  # Hadamard gate on qubit ${gate.qubit}`);
          break;
        case 'X':
          codeLines.push(`qc.x(${gate.qubit})  # Pauli-X gate on qubit ${gate.qubit}`);
          break;
        case 'Y':
          codeLines.push(`qc.y(${gate.qubit})  # Pauli-Y gate on qubit ${gate.qubit}`);
          break;
        case 'Z':
          codeLines.push(`qc.z(${gate.qubit})  # Pauli-Z gate on qubit ${gate.qubit}`);
          break;
        case 'CNOT':
          const controlQubit = gate.qubit === 0 ? 1 : gate.qubit - 1;
          codeLines.push(`qc.cx(${controlQubit}, ${gate.qubit})  # CNOT gate`);
          break;
        case 'RX':
          codeLines.push(`qc.rx(${gate.angle?.toFixed(4) || 'np.pi/4'}, ${gate.qubit})  # RX rotation on qubit ${gate.qubit}`);
          break;
        case 'RY':
          codeLines.push(`qc.ry(${gate.angle?.toFixed(4) || 'np.pi/4'}, ${gate.qubit})  # RY rotation on qubit ${gate.qubit}`);
          break;
        case 'RZ':
          codeLines.push(`qc.rz(${gate.angle?.toFixed(4) || 'np.pi/4'}, ${gate.qubit})  # RZ rotation on qubit ${gate.qubit}`);
          break;
        case 'S':
          codeLines.push(`qc.s(${gate.qubit})  # S gate on qubit ${gate.qubit}`);
          break;
        case 'T':
          codeLines.push(`qc.t(${gate.qubit})  # T gate on qubit ${gate.qubit}`);
          break;
      }
    });

    codeLines.push('');
    codeLines.push('qc.measure_all()');
    codeLines.push('print(qc.draw())');

    return codeLines.join('\n');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.div 
        className="p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-quantum-500 to-purple-600 rounded-xl flex items-center justify-center"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-quantum-600 to-purple-600 bg-clip-text text-transparent">
                Visual Circuit Builder
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Drag and drop quantum gates</p>
            </div>
          </div>
          <MantineButton
            variant="outline"
            leftIcon={RotateCcw}
            onClick={clearCircuit}
            size="sm"
          >
            Clear Circuit
          </MantineButton>
        </div>

        {/* Gate Palette */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {gateTypes.map((gate, index) => (
            <motion.button
              key={gate.type}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGateSelect(gate.type)}
              className={`p-2 sm:p-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border-2 ${
                selectedGate === gate.type
                  ? `bg-gradient-to-br ${gate.color} text-white shadow-lg border-transparent`
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600'
              }`}
              title={gate.equation}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="font-bold">{gate.type}</span>
                <span className="text-xs opacity-80 hidden sm:block">{gate.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Circuit Grid */}
      <div className="flex-1 p-3 sm:p-6 overflow-auto">
        <motion.div 
          className="inline-block min-w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="grid gap-2 sm:gap-4" style={{ 
            gridTemplateColumns: `80px repeat(${circuitLength}, ${window.innerWidth < 640 ? '60px' : '80px'})` 
          }}>
            {/* Column Headers */}
            <div className="font-bold text-gray-700 dark:text-gray-300 text-center py-2 sm:py-4 bg-gradient-to-r from-quantum-100 to-purple-100 dark:from-quantum-900 dark:to-purple-900 rounded-xl text-xs sm:text-sm">
              Qubit
            </div>
            {Array.from({ length: circuitLength }).map((_, i) => (
              <motion.div 
                key={i} 
                className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 py-2 sm:py-4 bg-gray-50 dark:bg-gray-700 rounded-xl font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <span className="hidden sm:inline">Step </span>{i + 1}
              </motion.div>
            ))}

            {/* Circuit Rows */}
            {Array.from({ length: numQubits }).map((_, qubit) => (
              <React.Fragment key={qubit}>
                {/* Qubit Label */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + qubit * 0.1 }}
                  className="flex items-center justify-center bg-gradient-to-r from-quantum-100 via-purple-100 to-electric-100 dark:from-quantum-800 dark:via-purple-800 dark:to-electric-800 rounded-xl py-2 sm:py-4 font-bold text-gray-700 dark:text-gray-300 shadow-sm text-xs sm:text-sm"
                >
                  |q{qubit}⟩
                </motion.div>
                
                {/* Gate Positions */}
                {Array.from({ length: circuitLength }).map((_, position) => {
                  const gateAtPosition = getGateAtPosition(qubit, position);
                  const gateIndex = gates.findIndex(g => g.qubit === qubit && g.position === position);
                  
                  return (
                    <motion.div
                      key={`${qubit}-${position}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + (qubit * circuitLength + position) * 0.02 }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: gateAtPosition ? undefined : 'rgba(99, 102, 241, 0.1)',
                        transition: { duration: 0.2 }
                      }}
                      className="h-12 sm:h-16 md:h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center cursor-pointer hover:border-quantum-400 dark:hover:border-quantum-500 transition-all duration-300 relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                      onClick={() => !gateAtPosition && addGate(qubit, position)}
                    >
                      <AnimatePresence>
                        {gateAtPosition ? (
                          renderGate(gateAtPosition, gateIndex)
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-400 dark:border-gray-500 border-dashed rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 transition-all duration-300"
                          >
                            <Plus className="w-3 h-3 sm:w-5 sm:h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Quantum wire */}
                      <div className="absolute inset-0 flex items-center pointer-events-none">
                        <motion.div 
                          className="w-full h-0.5 sm:h-1 bg-gradient-to-r from-quantum-300 via-purple-300 to-electric-300 dark:from-quantum-600 dark:via-purple-600 dark:to-electric-600 rounded-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.8 + position * 0.1, duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Generated Code Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-t border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
          <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-quantum-600 to-purple-600 bg-clip-text text-transparent">
            Generated Qiskit Code
          </h3>
          <MantineButton
            variant="gradient"
            leftIcon={Copy}
            onClick={() => navigator.clipboard.writeText(generateQiskitCode())}
            size="sm"
          >
            Copy Code
          </MantineButton>
        </div>
        <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-3 sm:p-4 rounded-xl text-xs sm:text-sm overflow-x-auto font-mono max-h-32 sm:max-h-48 overflow-y-auto shadow-inner border border-gray-700">
          <pre>{generateQiskitCode()}</pre>
        </div>
      </motion.div>
    </div>
  );
};