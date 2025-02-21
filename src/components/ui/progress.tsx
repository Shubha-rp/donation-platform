import * as React from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export const Progress = ({ value, className, ...props }: ProgressProps) => {
  return (
    <div
      className={`relative w-full h-4 bg-gray-200 rounded ${className || ""}`}
      {...props}
    >
      <div
        className="h-full bg-blue-500 rounded"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
