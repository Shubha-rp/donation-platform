import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Transaction from "@/models/transaction";
export const dynamic = "force-dynamic";

// Named export for GET method
export async function GET(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB
    const { searchParams } = new URL(req.url);
    const referralCode = searchParams.get('ref');


    if (!referralCode) {
      return NextResponse.json({ error: "Referral code is required" }, { status: 400 });
    }
    // Fetch transactions
    const transactions = await Transaction.find({}, {
      fullName: 1,
      email: 1,
      amount: 1,
      referralCode: 1,
      status: 1,
      createdAt: 1,
    }).sort({ createdAt: -1 });

    if (!transactions.length) {
      return NextResponse.json({ message: `No transactions found for referral code: ${referralCode}` });
    }

    // Calculate total earnings
    const totalEarnings = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const goal = 5000;
    const goalAchieved = totalEarnings >= goal;

    // Format date properly
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction.toObject(),
      createdAt: new Date(transaction.createdAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    }));
    return NextResponse.json({
      success: true,
      totalEarnings,  // Include totalEarnings in the response
      goalAchieved,   // Include goalAchieved status
      transactions: formattedTransactions,
    });

    return NextResponse.json({ success: true,totalEarnings, transactions: formattedTransactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
