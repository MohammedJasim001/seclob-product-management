import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "common" | "gray";
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
  variant = "common",
  disabled,
  type = "button",
  form,
  name,
  value,
  loading = false,
}) => {
  const variants = {
    primary:
      "bg-[#EDA415] text-white hover:bg-[#cd921d] px-20 py-4 rounded-full ",

    common: "bg-[#EDA415] text-white hover:bg-[#cd921d] px-4 py-3 rounded-xl",

    secondary:
      "bg-transparent text-white border border-white hover:bg-white hover:text-[#0B4C73] px-20 py-4 rounded-full ",

    gray: "bg-[#EEEEEE] text-black hover:bg-[#d9d9d9] rounded-xl px-4 py-3",

    outline:
      "bg-transparent text-[#EDA415] border border-[#EDA415] hover:bg-[#EDA415] hover:text-white",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` ${variants[variant]} font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
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
