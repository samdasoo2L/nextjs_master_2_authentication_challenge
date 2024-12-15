import { InputHTMLAttributes } from "react";

interface InputProps {
  errors?: string[];
  name: string;
  pic: string;
}

export default function Input({
  pic,
  errors = [],
  name,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full relative flex flex-col">
      <div className="absolute left-4 top-3">{pic}</div>
      <input
        name={name}
        className="pl-11 ring-2 ring-neutral-200 focus:ring-2 focus:ring-neutral-400 transition rounded-full p-3 w-full border-none focus:outline-none"
        // placeholder={placeholder}
        // type={type}
        // required={required}
        {...rest}
      />

      {errors.map((errors, index) => (
        <div key={index} className="mt-1 text-red-500">
          {errors}
        </div>
      ))}
    </div>
  );
}
