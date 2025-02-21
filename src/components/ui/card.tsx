import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure `utils.ts` exists in `src/lib/`

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("rounded-lg border bg-white p-4 shadow-sm", className)} {...props} />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("p-4 border-b", className)} {...props} />;
  }
);
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("p-4", className)} {...props} />;
  }
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("p-4 border-t", className)} {...props} />;
  }
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
