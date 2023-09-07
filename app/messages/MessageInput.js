import React from 'react';

const MessageInput = ({ placeholder, label, name, value, onChange, register, errors, required, type }) => {
  return (
    <div>
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
        className={`w-full px-4 py-2 font-light border rounded-full bg-neutral-100 focus:outline-none shadow-sm transition duration-300 ease-in-out text-black
        ${errors[name] ? 'border-red-500' : ''}`}
      />
    </div>
  );
};

export default MessageInput;
