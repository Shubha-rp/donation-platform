"use client";
export const dynamic = "force-dynamic"; // Force dynamic rendering

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DonationForm from "./DonationForm";

const DonationContent = () => {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref") || "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Support This Cause</h1>
      {referralCode ? (
        <p className="text-gray-700 mb-4">
          Referral Code: <strong>{referralCode}</strong>
        </p>
      ) : (
        <p className="text-red-500 mb-4">No referral code provided</p>
      )}
      {/* Donation Form Component */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <DonationForm referralCode={referralCode} />
      </div>
    </div>
  );
};

const DonationPage = () => {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <DonationContent />
    </Suspense>
  );
};

export default DonationPage;
