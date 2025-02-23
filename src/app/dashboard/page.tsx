"use client";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import useSWR ,{mutate} from "swr";
import { Loader2 } from "lucide-react";
import { useState ,useEffect} from "react";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const user = {
    name: "Prashant Shukla",
    totalGoal: 30000,
    referralCode: "pra7432",
    level: "Star",
    nextLevel: 5000,
    expired: false,
  };

  const { data, error, isLoading } = useSWR(`/api/transactions?ref=${user.referralCode}`, fetcher);
  
  
  const [totalEarnings, setTotalEarnings] = useState<number>(data?.totalEarnings || 0);
  const [goalAchieved, setGoalAchieved] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setTotalEarnings(data.totalEarnings || 0); // Assuming `data.totalEarnings` is the total earnings field
      setGoalAchieved(data.totalEarnings || 0);
    }
  }, [data]);


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
  
   // Handle successful transaction
   const handleTransaction = async () => {
    // Call your backend API to process the donation
    const response = await fetch(`/api/donate?ref=${user.referralCode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100 }), // Amount can vary based on transaction
    });

    if (response.ok) {
      // After successful transaction, trigger a re-fetch
      const responseData = await response.json();
      const newTotalEarnings = responseData.totalEarnings;
      setTotalEarnings(newTotalEarnings);
      setGoalAchieved(newTotalEarnings); // Update the state with new earnings
      mutate(`/api/transactions?ref=${user.referralCode}`); // Ensure the transactions are updated
    } else {
      alert("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-center">Welcome, {user.name}</h1>

      {/* Goal Progress */}
      <Card className="mt-4 p-4">
        <CardContent>
          <h2 className="text-md md:text-lg font-semibold text-black">
            Goal Achieved: ₹{goalAchieved} / ₹{user.totalGoal}
          </h2>
          <Progress value={(goalAchieved / user.totalGoal) * 100} className="mt-2" />
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
       {/* Trigger Donation Button */}
       <div className="mt-4">
        <Button className="w-full md:w-auto bg-blue-500" onClick={handleTransaction}>
          Donate ₹100
        </Button>
      </div>
    </div>
  );
}

