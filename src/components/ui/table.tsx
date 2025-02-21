import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure `utils.ts` exists in `src/lib/`

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => {
    return <table ref={ref} className={cn("w-full border-collapse", className)} {...props} />;
  }
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    return <thead ref={ref} className={cn("bg-gray-100 text-gray-700", className)} {...props} />;
  }
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    return <tbody ref={ref} className={cn("divide-y divide-gray-200", className)} {...props} />;
  }
);
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => {
    return <tr ref={ref} className={cn("hover:bg-gray-50", className)} {...props} />;
  }
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    return <th ref={ref} className={cn("px-4 py-2 text-left text-sm font-semibold", className)} {...props} />;
  }
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    return <td ref={ref} className={cn("px-4 py-2 text-sm", className)} {...props} />;
  }
);
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
