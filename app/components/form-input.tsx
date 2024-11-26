export default function FormInput({
  pic,
  placeholder,
  required,
  type,
  errors,
  name,
}: {
  pic: string;
  placeholder: string;
  errors: string;
  required: boolean;
  type: string;
  name: string;
}) {
  return (
    <div className="w-full relative flex flex-col">
      <div className="absolute left-4 top-3">{pic}</div>
      <input
        className="pl-11 ring-2 ring-neutral-200 focus:ring-2 focus:ring-neutral-400 transition rounded-full p-3 w-full border-none focus:outline-none"
        placeholder={placeholder}
        type={type}
        required={required}
        name={name}
      />
      <div className="mt-1 text-red-500">{errors}</div>
    </div>
  );
}
