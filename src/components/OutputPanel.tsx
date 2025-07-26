import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BarChart3, Play, Download } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  isRunning: boolean;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ output, isRunning }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-full flex flex-col transition-colors duration-300"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Output</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
              <BarChart3 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Output Content */}
      <div className="flex-1 p-4 overflow-auto">
        {isRunning ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-quantum-500 dark:border-quantum-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Running quantum circuit...</p>
            </div>
          </div>
        ) : output ? (
          <div className="space-y-4">
            <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg font-mono transition-colors duration-300">
              <pre className="text-sm whitespace-pre-wrap">{output}</pre>
            </div>
            
            {/* Mock Histogram */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Measurement Results</h4>
              <div className="space-y-2">
                {[
                  { state: '000', count: 127, probability: 0.124 },
                  { state: '001', count: 128, probability: 0.125 },
                  { state: '010', count: 131, probability: 0.128 },
                  { state: '011', count: 125, probability: 0.122 },
                  { state: '100', count: 128, probability: 0.125 },
                  { state: '101', count: 127, probability: 0.124 },
                  { state: '110', count: 129, probability: 0.126 },
                  { state: '111', count: 129, probability: 0.126 },
                ].map((result) => (
                  <div key={result.state} className="flex items-center space-x-3">
                    <span className="font-mono text-sm w-8 text-gray-700 dark:text-gray-300 transition-colors duration-300">{result.state}</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 transition-colors duration-300">
                      <div 
                        className="bg-quantum-500 dark:bg-quantum-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${result.probability * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12 transition-colors duration-300">{result.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 transition-colors duration-300">
            <div className="text-center">
              <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Run your quantum circuit to see results</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};