import Link from "next/link";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex space-x-4 p-4 bg-gray-100">
          <Link href="/" className="text-blue-600">Home</Link>
          <Link href="/dashboard" className="text-blue-600">Dashboard</Link>
          <Link href="/transactions" className="text-blue-600">Transactions</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
