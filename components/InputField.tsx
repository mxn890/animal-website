'use client';
import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  focusedField?: string | null;
  setFocusedField?: (field: string | null) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  error,
  icon,
  placeholder,
  focusedField,
  setFocusedField,
  required
}) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField?.(name)}
          onBlur={() => setFocusedField?.(null)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
            icon ? 'pl-10' : ''
          } ${
            focusedField === name
              ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
              : 'border-gray-200 hover:border-gray-300'
          } focus:outline-none text-gray-900 placeholder-gray-400`}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
