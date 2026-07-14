import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  type?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = ({
  type = "text",
  placeholder,
  className = "",
  error,
  name,
  value,
  onChange,
  onBlur,
  icon,
  ...rest
}: InputProps) => {
  return (
    <div>
      <div className="relative">
        {icon && !value && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full  h-14 ${icon && !value ? "pl-12" : "pl-4"} bg-[#F4F8F5] rounded-md ${error ? "border-red-500" : ""} ${className}`}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
