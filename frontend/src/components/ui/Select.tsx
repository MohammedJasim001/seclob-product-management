import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { name: string; _id: string }[];
  placeholder?: string;
  error?: string;
}

const Select = ({
  options,
  placeholder = "Select",
  className = "",
  ...rest
}: SelectProps) => {
  return (
    <div className="w-full">
      <select
        className={` w-full h-13 border border-[#3C3C3C73] rounded-xl px-4 outline-none transition focus:border-black focus:border-2  ${className}`}
        {...rest}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
