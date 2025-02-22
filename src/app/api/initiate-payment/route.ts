import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import dbConnect from "@/lib/dbconnect";
import Transaction from "@/models/transaction";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const {  fullName, email,amount, referralCode } = await req.json();
    
    console.log("📥 Payment initiation request received:", { fullName, email, amount, referralCode });

    // ✅ Ensure amount is present and a valid number
    if (!fullName || !email || !amount || isNaN(Number(amount))) {
      return NextResponse.json({ success: false, error: "missing or Invalid data" }, { status: 400 });
    }

    // 🔹 Make referral code optional
    const sanitizedReferralCode = referralCode?.trim() !== "" ? referralCode : null;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: Number(amount) * 1, // Convert to paise (smallest unit of INR)
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Razorpay Order created:", order);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount, 
      currency: order.currency,
      fullName, // Pass name forward
      email,
      referralCode: sanitizedReferralCode, // Optional field
    });

  } catch (error) {
    console.error("❌ Payment Error:", error);
    return NextResponse.json({ success: false, error: "Payment initiation failed" }, { status: 500 });
  }
}
