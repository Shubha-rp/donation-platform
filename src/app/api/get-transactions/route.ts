import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Transaction from "@/models/transaction";

// Named export for GET method
export async function GET() {
  try {
    await dbConnect(); // Connect to MongoDB

    // Fetch transactions
    const transactions = await Transaction.find({}, {
      fullName: 1,
      email: 1,
      amount: 1,
      referralCode: 1,
      status: 1,
      createdAt: 1,
    }).sort({ createdAt: -1 });

    // Format date properly
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction.toObject(),
      createdAt: new Date(transaction.createdAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    }));

    return NextResponse.json({ success: true, transactions: formattedTransactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
