import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


// GET Transactions
export async function GET(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const referralCode = searchParams.get("ref");

    if (!referralCode) {
      return NextResponse.json({ success: false, error: "Referral code missing" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: `Transactions for ${referralCode}` });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
