import clsx from 'clsx';

export default function Button({ children, variant = 'primary', className, ...props }) {
  const baseStyles = "rounded-full px-4 py-2 transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "border border-sky-600 text-sky-600 bg-white hover:bg-sky-600 hover:text-white",
    solid: "bg-sky-600 text-white hover:bg-sky-700 border border-transparent",
    outline: "border border-gray-300 text-gray-700 hover:border-sky-600 hover:text-sky-600 bg-white",
    danger: "bg-red-500 text-white hover:bg-red-600 border border-transparent",
  };

  return (
    <button className={clsx(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
