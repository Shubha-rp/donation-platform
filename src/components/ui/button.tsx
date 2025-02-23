import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure this import path is correct

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
