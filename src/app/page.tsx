import Link from "next/link";
import "@/app/globals.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Donation Platform</h1>
      <Link href="/dashboard">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}
