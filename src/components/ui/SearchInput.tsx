import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>

const SearchInput: React.FC<InputProps> = ({ children, ...props }) => {
  return (
    <div className="group relative">
      <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-sky-500" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
      </svg>
      <input
        type="text"
        className="focus:ring-2 focus:ring-sky-500 focus:outline-none appearance-none w-full text-sm text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-300 shadow-sm" 
        {...props}
      />
      {children}
    </div>
  );
};

export default SearchInput;
