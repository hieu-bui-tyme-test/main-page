import React, { SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <div className="mt-6">
      <label htmlFor={props.name} className="block text-sm font-medium text-slate-700">{props['aria-label']}</label>
      <div className="grid mt-1">
        <svg className="col-start-1 forced-colors:hidden h-4 justify-self-end pointer-events-none relative right-2 row-start-1 self-center w-4 z-10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
        </svg>
        <select
          className="appearance-none border border-slate-300 col-start-1 focus:outline-none forced-colors:appearance-auto h-9 hover:bg-white hover:border-sky-500 px-4 rounded-lg row-start-1 text-slate-900 text-sm w-full"
          {...props}
        >
          {children}
        </select>
      </div>
    </div>
    
  );
};

export default Select;
