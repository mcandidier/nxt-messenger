import React from 'react';

const InputWithErrors = ({ placeholder, label, name, value, onChange, register, errors, required, type }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm mb-1 font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder ? placeholder: label}
        onChange={onChange}
        {...register(name, {
            required: 'This field is required'
        })}
        className={`w-full px-4 py-2  border rounded-md focus:outline-none focus:border-blue-500 shadow-sm transition duration-300 ease-in-out
        ${errors[name] ? 'border-red-500' : ''}`}
      />
      { errors[name] && (
        <p className="text-red-500 text-xs mt-1 ">{errors[name].message || 'This field is required'}</p>
      )
      }
    </div>
  );
};

export default InputWithErrors;
