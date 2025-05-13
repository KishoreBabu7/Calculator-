import React, { useEffect, useRef } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import { useCalculator } from '../hooks/useCalculator';

const Calculator: React.FC = () => {
  const {
    displayValue,
    previousValue,
    operation,
    handleNumberClick,
    handleOperationClick,
    handleEqualClick,
    handleClearClick,
    handleBackspaceClick,
    handlePercentClick,
    handleToggleSignClick,
  } = useCalculator();

  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !glowRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.left = `${x}px`;
          glowRef.current.style.top = `${y}px`;
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="calculator-container w-full max-w-sm bg-gray-800/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 relative hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 ease-out"
    >
      <div ref={glowRef} className="glow-effect" />
      <div className="p-4 sm:p-6 relative z-10">
        <Display 
          value={displayValue} 
          previousValue={previousValue} 
          operation={operation} 
        />
        <Keypad 
          onNumberClick={handleNumberClick}
          onOperationClick={handleOperationClick}
          onEqualClick={handleEqualClick}
          onClearClick={handleClearClick}
          onBackspaceClick={handleBackspaceClick}
          onPercentClick={handlePercentClick}
          onToggleSignClick={handleToggleSignClick}
        />
        <div className="mt-4 text-center text-sm text-gray-400 opacity-80 hover:opacity-100 transition-opacity">
          Made with ♥ by <a href="https://tulugukishorebabu.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">KISHORE</a>
        </div>
      </div>
    </div>
  );
};

export default Calculator;