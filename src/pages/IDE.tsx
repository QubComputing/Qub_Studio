import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Save, Share, Settings, Code, Eye, Zap, Activity } from 'lucide-react';
import { QubIDE } from '../components/QubIDE';
import { QuantumCircuitBuilder } from '../components/QuantumCircuitBuilder';
import { OutputPanel } from '../components/OutputPanel';
import { BlochSphere3D } from '../components/BlochSphere3D';
import { MantineCard } from '../components/MantineCard';
import { MantineButton } from '../components/MantineButton';

export const IDE: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('code');
  const [code, setCode] = useState(`# Quantum Circuit Example
from qiskit import QuantumCircuit, execute, Aer
from qiskit.visualization import plot_histogram
import numpy as np

# Create a quantum circuit with 3 qubits
qc = QuantumCircuit(3, 3)

# Add quantum gates
qc.h(0)  # Hadamard gate on qubit 0
qc.cx(0, 1)  # CNOT gate between qubit 0 and 1
qc.cx(1, 2)  # CNOT gate between qubit 1 and 2

# Add rotation gates
qc.ry(np.pi/4, 0)  # Y-rotation on qubit 0
qc.rz(np.pi/3, 1)  # Z-rotation on qubit 1

# Measure all qubits
qc.measure_all()

# Execute the circuit
backend = Aer.get_backend('qasm_simulator')
job = execute(qc, backend, shots=1024)
result = job.result()
counts = result.get_counts(qc)

print("Measurement results:", counts)
print("Circuit depth:", qc.depth())
print("Circuit width:", qc.width())
`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedGate, setSelectedGate] = useState<string>('');
  const [theta, setTheta] = useState(0);
  const [phi, setPhi] = useState(0);

  const runCode = async () => {
    setIsRunning(true);
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOutput(`Measurement results: {'000': 127, '001': 128, '010': 131, '011': 125, '100': 128, '101': 127, '110': 129, '111': 129}

Circuit depth: 4
Circuit width: 3
Total gates: 6
Quantum gates used: H, CNOT, RY, RZ
Qubits measured: 3

Execution time: 1.23s
Backend: qasm_simulator
Shots: 1024`);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-700 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8"
        >
          <div>
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-quantum-600 via-purple-600 to-electric-600 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Qub-code IDE
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base text-gray-600 dark:text-gray-300 transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Professional quantum development environment with 3D visualization
            </motion.p>
          </div>
          
          <motion.div 
            className="flex items-center space-x-2 sm:space-x-3 mt-4 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <MantineButton variant="outline" leftIcon={Save}>
              Save
            </MantineButton>
            <MantineButton variant="outline" leftIcon={Share}>
              Share
            </MantineButton>
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-6 sm:mb-8"
        >
          <MantineButton
            variant={activeTab === 'code' ? 'gradient' : 'subtle'}
            leftIcon={Code}
            onClick={() => setActiveTab('code')}
          >
            Qub-code Editor
          </MantineButton>
          
          <MantineButton
            variant={activeTab === 'visual' ? 'gradient' : 'subtle'}
            leftIcon={Eye}
            onClick={() => setActiveTab('visual')}
          >
            Visual Builder
          </MantineButton>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* IDE / Circuit Builder */}
          <div className="xl:col-span-2 min-h-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
            >
              {activeTab === 'code' ? (
                <QubIDE 
                  code={code} 
                  onChange={setCode} 
                  onRun={runCode}
                  isRunning={isRunning}
                  output={output}
                />
              ) : (
                <MantineCard className="h-full" padding="sm">
                  <QuantumCircuitBuilder 
                    onGateSelect={setSelectedGate}
                    onCircuitChange={(gates) => {
                      // Update code based on circuit changes
                      console.log('Circuit updated:', gates);
                    }}
                  />
                </MantineCard>
              )}
            </motion.div>
          </div>

          {/* Right Panel */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            {/* Output Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <MantineCard className="h-[250px] sm:h-[300px] md:h-[340px]" gradient>
                <OutputPanel output={output} isRunning={isRunning} />
              </MantineCard>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <MantineCard padding="lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <MantineButton 
                    variant="gradient" 
                    fullWidth 
                    leftIcon={Play}
                    onClick={runCode}
                    loading={isRunning}
                  >
                    {isRunning ? 'Running Circuit...' : 'Run Quantum Circuit'}
                  </MantineButton>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <MantineButton variant="outline" size="sm">
                      Export
                    </MantineButton>
                    <MantineButton variant="outline" size="sm">
                      Import
                    </MantineButton>
                  </div>
                </div>
              </MantineCard>
            </motion.div>
          </div>
        </div>

        {/* 3D Bloch Sphere Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 sm:mt-8"
        >
          <BlochSphere3D 
            theta={theta}
            phi={phi}
            onThetaChange={setTheta}
            onPhiChange={setPhi}
            selectedGate={selectedGate}
          />
        </motion.div>
      </div>
    </div>
  );
};