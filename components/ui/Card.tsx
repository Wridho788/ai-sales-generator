import React from "react";

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      {children}
    </div>
  );
}
