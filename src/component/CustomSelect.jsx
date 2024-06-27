import React, { useState } from 'react';

const CustomSelect = ({ label, options, value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(value || options[0].value); // Set initial value

  const handleClick = () => {
    setSelectedValue(!selectedValue); // Toggle options visibility
  };

  const handleOptionClick = (optionValue) => {
    setSelectedValue(optionValue);
    onChange(optionValue); // Pass the selected value to the parent component
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm text-slate-400">{label}</label>
      <div className="custom-select relative flex items-center">
        <span
          className="selected-value text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded border border-gray-300"
        >
          {options.find((option) => option.value === selectedValue)?.text || selectedValue} {/* Display the selected option text or value */}
        </span>
        <button
          className="select-button flex items-center justify-center mt-2 py-2 px-4 rounded bg-gray-200 border border-gray-300 hover:bg-gray-300 cursor-pointer"
          onClick={handleClick}
        >
          <span className="text-sm font-medium text-gray-700">Select</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-6 6l-6-6" />
          </svg>
        </button>
        {selectedValue && ( // Only render options list if visible
          <div className="options-container absolute mt-2 z-10">
            <ul className="options-list bg-white border border-gray-300 rounded shadow">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="option-item px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  data-value={option.value}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.text || option.value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
