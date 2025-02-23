import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import Transaction from "@/models/transaction";


// GET Transactions
export async function GET(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const referralCode = searchParams.get("ref");

    if (!referralCode) {
      return NextResponse.json({ success: false, error: "Referral code missing" }, { status: 400 });
    }
    const transactions = await Transaction.find({ referralCode });
    if (transactions.length === 0) {
      return NextResponse.json({ success: false, message: "No transactions found for this referral code" }, { status: 404 });
    }
    const totalEarnings = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction.toObject(),
      createdAt: new Date(transaction.createdAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    }));


    return NextResponse.json({ success: true,totalEarnings, transactions: formattedTransactions });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
