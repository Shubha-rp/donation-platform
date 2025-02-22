import Link from "next/link";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex space-x-6 p-4 bg-gray-100 shadow-md">
          <Link
            href="/"
            className="text-blue-600 font-semibold text-lg relative transition-all duration-300 
                       hover:text-blue-900 hover:scale-110 hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-blue-600 font-semibold text-lg relative transition-all duration-300 
                       hover:text-blue-900 hover:scale-110 hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className="text-blue-600 font-semibold text-lg relative transition-all duration-300 
                       hover:text-blue-900 hover:scale-110 hover:underline underline-offset-4"
          >
            Transactions
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
