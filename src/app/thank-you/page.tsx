"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
const ThankYouPage = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const transactionId = searchParams.get("transactionId");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600">🎉 Payment Successful! 🎉</h2>
        <p className="mt-2 text-lg text-black">Thank you for your donation!</p>
        
        {amount && transactionId && (
          <div className="mt-4 text-black">
            <p><strong>Transaction ID:</strong> {transactionId}</p>
            <p><strong>Amount Paid:</strong> ₹{amount}</p>
          </div>
        )}



<Link href="/dashboard" className="mt-6 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
  Go to Dashboard
</Link>

      </div>
    </div>
  );
};

export default ThankYouPage;
