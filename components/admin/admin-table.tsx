interface AdminTableProps {
  headers: string[];
  children: React.ReactNode;
}

export default function AdminTable({
  headers,
  children,
}: AdminTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-zinc-950/50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}