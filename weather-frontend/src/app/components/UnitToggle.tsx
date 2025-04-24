'use client';

interface UnitToggleProps {
  onToggle: () => void;
  currentUnit: 'C' | 'F';
  isLoading?: boolean;
}

const UnitToggle = ({ onToggle, currentUnit, isLoading = false }: UnitToggleProps) => {
  return (
    <div className="unit-toggle p-2 mt-4">
      <button
        onClick={onToggle}
        className={`btn w-full transition-all ${currentUnit === 'C' ? 'btn-accent' : 'btn-secondary'}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          `Switch to ${currentUnit === 'C' ? '°F' : '°C'}`
        )}
      </button>
    </div>
  );
};

export default UnitToggle;