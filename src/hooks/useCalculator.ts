import { useState, useEffect } from 'react';

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleNumberClick(e.key);
      } else if (e.key === '.') {
        handleNumberClick('.');
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperationClick(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEqualClick();
      } else if (e.key === 'Escape') {
        handleClearClick();
      } else if (e.key === 'Backspace') {
        handleBackspaceClick();
      } else if (e.key === '%') {
        handlePercentClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayValue, previousValue, operation, shouldResetDisplay]);

  const handleNumberClick = (number: string) => {
    if (shouldResetDisplay) {
      setDisplayValue(number);
      setShouldResetDisplay(false);
    } else {
      if (displayValue === '0' && number !== '.') {
        setDisplayValue(number);
      } else if (number === '.' && displayValue.includes('.')) {
        return;
      } else {
        setDisplayValue(displayValue + number);
      }
    }
  };

  const handleOperationClick = (op: string) => {
    if (previousValue && operation && !shouldResetDisplay) {
      calculateResult();
    }

    setPreviousValue(displayValue);
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const handleEqualClick = () => {
    if (!operation || !previousValue) return;
    calculateResult();
    setOperation(null);
    setPreviousValue('');
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setPreviousValue('');
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleBackspaceClick = () => {
    if (displayValue.length === 1 || (displayValue.length === 2 && displayValue.startsWith('-'))) {
      setDisplayValue('0');
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  const handlePercentClick = () => {
    setDisplayValue(String(parseFloat(displayValue) / 100));
  };

  const handleToggleSignClick = () => {
    setDisplayValue(String(-parseFloat(displayValue)));
  };

  const calculateResult = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(displayValue);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          setDisplayValue('Error');
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    // Format the result to avoid super long decimals
    const resultString = parseFloat(result.toFixed(10)).toString();
    setDisplayValue(resultString);
    setShouldResetDisplay(true);
  };

  return {
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
  };
};