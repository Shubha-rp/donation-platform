import { NextResponse } from "next/server";
import dbconnect from "@/lib/dbconnect"; // Ensure correct DB connection
import Transaction from "@/models/transaction"; // Ensure correct model import

export async function POST(req: Request) {
  try {
    await dbconnect();

    const body = await req.json();
    console.log("📥 Received Data in save-transaction:", body);

    // Ensure name is correctly handled
    const { fullName, email, amount, referralCode, status, date, transactionId } = body;

    // ✅ Validate required fields
    if (!email || !amount || !status || !date || !transactionId) {
      console.error("❌ Missing required fields:", { fullName, email, amount, status, date, transactionId });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Ensure 'date' is stored correctly
    const transaction = new Transaction({
      fullName, // Ensure name is always present
      email,
      amount,
      referralCode: referralCode || null, // Ensure referralCode is null when missing
      status,
      date: new Date(date), // Convert to Date object
      transactionId,
    });

    await transaction.save();
    console.log("✅ Transaction saved successfully:", transaction);
//user
if (referralCode) {
  console.log("🔍 Referral code received:", referralCode);
  const referredTransactions = await Transaction.find({ referralCode }).exec();
  
  // Log all transactions with this referral code for debugging
  console.log("🔍 Found referred transactions:", referredTransactions);

  // Optionally, you can track total earnings for each referral code:
  const totalEarningsFromReferral = referredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  console.log(`Total earnings from referral code ${referralCode}: ${totalEarningsFromReferral}`);
}

    return NextResponse.json({ success: true, message: "Transaction saved", transaction }, { status: 201 });

  } catch (error) {
    console.error("❌ Error saving transaction:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
