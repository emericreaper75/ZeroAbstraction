interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({
  label,
  ...props
}: FormInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-300">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-zinc-500"
      />
    </div>
  );
}