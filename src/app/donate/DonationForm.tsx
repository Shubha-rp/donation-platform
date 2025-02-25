"use client";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

import { useState, useEffect } from "react";

interface DonationFormProps {
  referralCode?: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: { color: string };
}

const DonationForm: React.FC<DonationFormProps> = ({ referralCode = "" }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userReferralCode, setUserReferralCode] = useState(referralCode);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setUserReferralCode(referralCode);
  }, [referralCode]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    setError("");

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError("❌ Please enter all required fields.");
      return;
    }

    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      setError("❌ Please enter a valid donation amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          amount: donationAmount,
          referralCode: userReferralCode,
        }),
      });

      const data = await res.json();
      console.log("📤 Payment API Response:", data);

      if (!res.ok || !data.success || !data.orderId) {
        setError(`❌ Payment failed: ${data.error || "Unknown error"}`);
        setLoading(false);
        return;
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: data.amount,
        currency: data.currency,
        name: "Donation Platform",
        description: "Support a cause",
        order_id: data.orderId,
        handler: async (response: RazorpayResponse) => {
          console.log("📥 Razorpay Response:", response);

          try {
            const saveRes = await fetch("/api/save-transaction", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fullName,
                email,
                amount: donationAmount,
                referralCode: userReferralCode,
                status: "success",
                date: new Date().toISOString(),
                transactionId: response.razorpay_payment_id,
              }),
            });

            const saveData = await saveRes.json();
            console.log("📤 Save Transaction API Response:", saveData);

            if (!saveRes.ok) {
              setError(`⚠️ Error saving transaction: ${saveData.error || "Unknown error"}`);
            } else {
              window.location.href = `/thank-you?amount=${donationAmount}&transactionId=${response.razorpay_payment_id}`;
            }
          } catch (err) {
            console.error("❌ Transaction Save Error:", err);
            setError("⚠️ Error storing transaction. Please contact support.");
          }
        },
        prefill: {
          name: fullName,
          email,
          contact: phone,
        },
        theme: { color: "#3399cc" },
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        setError("❌ Razorpay SDK failed to load. Please try again.");
      }
    } catch (err) {
      console.error("❌ Payment Error:", err);
      setError("❌ An error occurred. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-center text-black">Donate Now</h2>

      <label className="block text-sm font-medium mb-2 text-black">Full Name</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
        placeholder="Enter your full name"
        disabled={loading}
      />

      <label className="block text-sm font-medium mb-2 text-black">Email Address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
        placeholder="Enter your email"
        disabled={loading}
      />

      <label className="block text-sm font-medium mb-2 text-black">Phone Number</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
        placeholder="Enter your phone number"
        disabled={loading}
      />

      <label className="block text-sm font-medium mb-2 text-black">Referral Code (Optional)</label>
      <input
        type="text"
        value={userReferralCode}
        onChange={(e) => setUserReferralCode(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
        placeholder="Enter referral code (if available)"
        disabled={loading}
      />

      <label className="block text-sm font-medium mb-2 text-black">Donation Amount (₹)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
        placeholder="Enter amount"
        disabled={loading}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

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
