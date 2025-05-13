import React from 'react';

interface DisplayProps {
  value: string;
  previousValue: string;
  operation: string | null;
}

const Display: React.FC<DisplayProps> = ({ value, previousValue, operation }) => {
  return (
    <div className="display-container rounded-2xl p-4 mb-4 text-right transition-all duration-300">
      <div className="h-6 text-gray-400 text-sm overflow-hidden font-medium">
        {previousValue && (
          <span className="opacity-80 tracking-wide">
            {previousValue} {operation}
          </span>
        )}
      </div>
      <div className="text-4xl font-light text-white tracking-tight overflow-x-auto scrollbar-hide whitespace-nowrap transition-all duration-200">
        {value}
      </div>
    </div>
  );
};

export default Display;