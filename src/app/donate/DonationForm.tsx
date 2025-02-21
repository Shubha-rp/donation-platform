"use client";
import { useState } from "react";

const DonationForm = ({ referralCode }: { referralCode: string }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handlePayment = async () => {
    setError("");

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("❌ Please enter a valid donation amount.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, referralCode }),
      });

      const data = await res.json();

    //   if (data.success && data.paymentUrl) {
        if (data.success){
        window.location.href = data.paymentUrl; // Redirect to Razorpay checkout
      } else {
        setError("❌ Payment initiation failed. Please try again.");
      }
    } catch (err) {
      setError("❌ An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <label className="block text-sm font-medium mb-2 text-black">Enter Donation Amount (₹)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
        placeholder="Enter amount"
        disabled={loading}
      />
      {error && <p className="text-red-500 text-sm mb-2 text-black">{error}</p>}
      <button
        onClick={handlePayment}
        className={`w-full py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Donate Now"}
      </button>
    </div>
  );
};

export default DonationForm;
