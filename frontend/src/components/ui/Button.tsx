import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
  name?: string;
  value?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  variant = "primary",
  disabled,
  type = "button",
  form,
  name,
  value,
  loading = false,
}) => {
  const variants = {
    primary:
      "bg-[#EDA415] text-white border border-[#EDA415] hover:bg-white hover:text-[#EDA415] px-20",

    secondary:
      "bg-transparent text-white border border-white hover:bg-white hover:text-[#0B4C73]",

    outline:
      "bg-transparent text-[#EDA415] border border-[#EDA415] hover:bg-[#EDA415] hover:text-white",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border-2 ${variants[variant]} rounded-full  px-12 py-3 font-semibold  transition disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      type={type}
      form={form}
      name={name}
      value={value}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Please wait...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
