import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

// GET Transactions
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  // Accept both `referralCode` and `ref`
  const referralCode = searchParams.get("referralCode") || searchParams.get("ref");

  if (!referralCode) {
    return NextResponse.json({ error: "Referral code missing" }, { status: 400 });
  }

  console.log("Received referralCode:", referralCode);
  
  const transactions = await Transaction.find({ referralCode });
  const totalEarnings = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return NextResponse.json({totalEarnings, transactions});
}
