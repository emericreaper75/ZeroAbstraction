interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-10 border-b border-zinc-800/60 pb-6">
      <div className="grid grid-cols-[1fr_auto] items-start gap-6">
        {/* Left Content */}
        <div className="min-w-0">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {description}
            </p>
          )}
        </div>

        {/* Right Action */}
        {action && (
          <div className="flex items-start justify-end">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}