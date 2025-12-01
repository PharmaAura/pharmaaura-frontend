import { forwardRef } from 'react';
import clsx from 'clsx';

const FormField = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className={clsx("flex flex-col space-y-1", className)}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        className={clsx(
          "rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder-gray-400 transition-shadow",
          error && "border-red-500 focus:ring-red-500"
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
});

export default FormField;
