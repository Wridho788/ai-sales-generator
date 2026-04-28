import React from "react";

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function SplitLayout({ left, right }: SplitLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full lg:w-1/2 p-8 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
        {left}
      </div>
      <div className="hidden lg:block w-1/2 p-8 overflow-y-auto bg-white dark:bg-gray-800">
        {right}
      </div>
    </div>
  );
}
