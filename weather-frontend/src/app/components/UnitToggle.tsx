'use client';

import React from 'react';

// Export the interface
export interface UnitToggleProps {
  onToggle: () => void;
  currentUnit: 'C' | 'F';
  isLoading?: boolean;
}

const UnitToggle = ({ onToggle, currentUnit, isLoading = false }: UnitToggleProps) => {
  return (
    <div className="flex gap-2 p-2">
      <button
        onClick={onToggle}
        className={`btn ${currentUnit === 'C' ? 'btn-accent' : 'btn-outline'}`}
        disabled={isLoading}
      >
        °C
      </button>
      <button
        onClick={onToggle}
        className={`btn ${currentUnit === 'F' ? 'btn-accent' : 'btn-outline'}`}
        disabled={isLoading}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;