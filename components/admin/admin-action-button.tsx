interface AdminActionButtonProps {
  children: React.ReactNode;
  variant?: "default" | "danger" | "primary";
}

export default function AdminActionButton({
  children,
  variant = "default",
}: AdminActionButtonProps) {
  const variants = {
    default:
      "text-zinc-300 hover:text-white",

    primary:
      "text-blue-400 hover:text-blue-300",

    danger:
      "text-red-400 hover:text-red-300",
  };

  return (
    <button
      type="submit"
      className={`transition ${variants[variant]}`}
    >
      {children}
    </button>
  );
}