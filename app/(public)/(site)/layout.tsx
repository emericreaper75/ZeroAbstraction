import React from 'react';

export default function SiteChromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-64px-128px)]">
      {children}
    </div>
  );
}
