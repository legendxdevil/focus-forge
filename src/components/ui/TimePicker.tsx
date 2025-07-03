import React, { useState } from 'react';

interface TimePickerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onConfirm: (minutes: number, seconds: number) => void;
  onCancel: () => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ initialMinutes = 0, initialSeconds = 0, onConfirm, onCancel }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  // Clamp values
  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 min-w-[300px]">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <input
            type="number"
            min={0}
            max={180}
            value={minutes}
            onChange={e => setMinutes(clamp(Number(e.target.value), 0, 180))}
            className="w-16 px-2 py-1 rounded border text-center text-2xl font-mono"
            autoFocus
          />
          <span className="text-2xl font-bold text-gray-500">:</span>
          <input
            type="number"
            min={0}
            max={59}
            value={seconds}
            onChange={e => setSeconds(clamp(Number(e.target.value), 0, 59))}
            className="w-16 px-2 py-1 rounded border text-center text-2xl font-mono"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(minutes, seconds)}
            className="px-4 py-2 rounded bg-focus-accent text-white hover:bg-opacity-90"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
