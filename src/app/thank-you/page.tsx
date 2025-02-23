"use client";
export const dynamic = "force-dynamic"; // Force dynamic rendering

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";
  const transactionId = searchParams.get("transactionId") || "N/A";

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-green-600">🎉 Payment Successful! 🎉</h2>
      <p className="mt-2 text-lg text-black">Thank you for your donation!</p>

      <div className="mt-4 text-black">
        <p><strong>Transaction ID:</strong> {transactionId}</p>
        <p><strong>Amount Paid:</strong> ₹{amount}</p>
      </div>

      <div className="mt-6">
        <Link 
          href="/dashboard" 
          className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Suspense fallback={<p>Loading...</p>}>
        <ThankYouContent />
      </Suspense>
    </div>
  );
};

export default ThankYouPage;
