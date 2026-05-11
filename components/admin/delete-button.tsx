"use client";

interface DeleteButtonProps {
  children: React.ReactNode;
}

export default function DeleteButton({
  children,
}: DeleteButtonProps) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this item?"
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className="text-red-400 transition hover:text-red-300"
    >
      {children}
    </button>
  );
}
