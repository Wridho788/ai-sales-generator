import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
    />
  );
}
