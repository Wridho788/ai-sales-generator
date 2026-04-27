import React from "react";

interface SectionProps {
  children: React.ReactNode;
}

export function Section({ children }: SectionProps) {
  return (
    <div className="mb-8">
      {children}
    </div>
  );
}
