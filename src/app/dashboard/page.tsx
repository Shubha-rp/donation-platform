"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useSWR from "swr";
import { Loader2 } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const user = {
    name: "Prashant Shukla",
    goalAchieved: 10,
    totalGoal: 30000,
    referralCode: "pra7432",
    level: "Star",
    nextLevel: 5000,
    expired: false,
  };

  const { data, error, isLoading } = useSWR(`/api/transactions?ref=${user.referralCode}`, fetcher);
  
  const totalEarnings = data?.totalEarnings || 0;

  // Copy Referral Link
  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/donate?ref=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const message = `Hi, I am raising funds for an NGO. Support me by donating through this link: ${window.location.origin}/donate?ref=${user.referralCode}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-center">Welcome, {user.name}</h1>

      {/* Goal Progress */}
      <Card className="mt-4 p-4">
        <CardContent>
          <h2 className="text-md md:text-lg font-semibold text-black">
            Goal Achieved: ₹{user.goalAchieved} / ₹{user.totalGoal}
          </h2>
          <Progress value={(user.goalAchieved / user.totalGoal) * 100} className="mt-2" />
          <p className="text-xs md:text-sm mt-2 text-black">Level: {user.level} (Next: ₹{user.nextLevel})</p>
          
          {/* Total Referral Earnings */}
          {isLoading ? (
            <p className="text-gray-500 text-xs flex items-center">
              <Loader2 className="animate-spin mr-2" /> Loading referral earnings...
            </p>
          ) : error ? (
            <p className="text-red-500 text-xs">Failed to load referral earnings</p>
          ) : (
            <p className="text-md font-medium text-green-600">
              Referral Earnings: ₹{totalEarnings}
            </p>
          )}

          {/* Campaign Expired Message */}
          {user.expired && (
            <p className="text-red-500 text-xs md:text-sm">
              Campaign Expired - 
              <Button className="ml-2 text-xs md:text-sm">Extend Now</Button>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Referral Code & Buttons */}
      <div className="mt-4">
        <p className="font-semibold">Referral Code: <span className="text-blue-600">{user.referralCode}</span></p>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
        <Button className="w-full md:w-auto" onClick={copyReferralLink}>Copy Donation Link</Button>
        <Button className="w-full md:w-auto bg-green-500" onClick={shareOnWhatsApp}>Share on WhatsApp</Button>
      </div>
    </div>
  );
}
