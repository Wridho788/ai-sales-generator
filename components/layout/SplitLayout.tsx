import React from "react";

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function SplitLayout({ left, right }: SplitLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* LEFT */}
      <div className="lg:w-1/2 p-6 overflow-y-auto border-r bg-white">
        {left}
      </div>

      {/* RIGHT */}
      <div className="lg:w-1/2 p-6 overflow-y-auto bg-gray-50">
        {right}
      </div>
    </div>
  );
}
