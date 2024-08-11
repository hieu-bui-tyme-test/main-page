import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({ children, ...props }) => {
  return (
    <div className="mt-6">
      <label htmlFor={props.name} className="block text-sm font-medium text-slate-700">{props['aria-label']}</label>
      <div className="mt-1">
        <input
            type="text"
            className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
            {...props}
        />
        {children}
      </div>
    </div>
  );
};

export default Input;
