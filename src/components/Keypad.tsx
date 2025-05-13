import React from 'react';
import { X, Divide, Minus, Plus, Equal, Delete } from 'lucide-react';

interface KeypadProps {
  onNumberClick: (number: string) => void;
  onOperationClick: (operation: string) => void;
  onEqualClick: () => void;
  onClearClick: () => void;
  onBackspaceClick: () => void;
  onPercentClick: () => void;
  onToggleSignClick: () => void;
}

const Keypad: React.FC<KeypadProps> = ({
  onNumberClick,
  onOperationClick,
  onEqualClick,
  onClearClick,
  onBackspaceClick,
  onPercentClick,
  onToggleSignClick,
}) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {/* Row 1 */}
      <Button onClick={onClearClick} variant="secondary">
        AC
      </Button>
      <Button onClick={onToggleSignClick} variant="secondary">
        +/-
      </Button>
      <Button onClick={onPercentClick} variant="secondary">
        %
      </Button>
      <Button onClick={() => onOperationClick('/')} variant="primary">
        <Divide size={18} />
      </Button>

      {/* Row 2 */}
      <Button onClick={() => onNumberClick('7')}>7</Button>
      <Button onClick={() => onNumberClick('8')}>8</Button>
      <Button onClick={() => onNumberClick('9')}>9</Button>
      <Button onClick={() => onOperationClick('*')} variant="primary">
        <X size={18} />
      </Button>

      {/* Row 3 */}
      <Button onClick={() => onNumberClick('4')}>4</Button>
      <Button onClick={() => onNumberClick('5')}>5</Button>
      <Button onClick={() => onNumberClick('6')}>6</Button>
      <Button onClick={() => onOperationClick('-')} variant="primary">
        <Minus size={18} />
      </Button>

      {/* Row 4 */}
      <Button onClick={() => onNumberClick('1')}>1</Button>
      <Button onClick={() => onNumberClick('2')}>2</Button>
      <Button onClick={() => onNumberClick('3')}>3</Button>
      <Button onClick={() => onOperationClick('+')} variant="primary">
        <Plus size={18} />
      </Button>

      {/* Row 5 */}
      <Button onClick={() => onNumberClick('0')} className="col-span-2">
        0
      </Button>
      <Button onClick={() => onNumberClick('.')}>.</Button>
      <Button onClick={onEqualClick} variant="primary">
        <Equal size={18} />
      </Button>

      {/* Backspace button */}
      <div className="col-span-4 mt-2">
        <Button onClick={onBackspaceClick} variant="secondary" className="w-full">
          <Delete size={18} className="mr-2" /> Backspace
        </Button>
      </div>
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'default',
  className = ''
}) => {
  const baseClasses = "calculator-button h-14 rounded-full text-xl font-medium flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer select-none";
  
  const variantClasses = {
    default: "bg-gray-700/70 text-white hover:bg-gray-600/70 hover:shadow-lg hover:shadow-gray-500/20 active:shadow-inner",
    primary: "bg-blue-500/80 text-white hover:bg-blue-400/80 hover:shadow-lg hover:shadow-blue-500/30 active:shadow-inner",
    secondary: "bg-gray-600/70 text-white hover:bg-gray-500/70 hover:shadow-lg hover:shadow-gray-400/20 active:shadow-inner"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Keypad;