import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// export async function POST(req: NextRequest) {
//   try {
//     const { amount, referralCode } = await req.json();

//     if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
//       return NextResponse.json({ success: false, error: "Invalid amount" }, { status: 400 });
//     }

//     if (!referralCode) {
//       return NextResponse.json({ success: false, error: "Referral code missing" }, { status: 400 });
//     }

//     // Razorpay Order Creation
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: true, // Auto-capture payment
//     });

//     return NextResponse.json({
//       success: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//     });
//   } catch (error) {
//     console.error("Razorpay Error:", error);
//     return NextResponse.json({ success: false, error: "Payment failed" }, { status: 500 });
//   }
// }
export async function POST(req: NextRequest) {
    try {
      const { amount, referralCode } = await req.json();
      if (!amount || !referralCode) {
        return NextResponse.json({ success: false, error: "Missing data" }, { status: 400 });
      }
  
      // Dummy response instead of actual Razorpay order creation
      return NextResponse.json({
        success: true,
        orderId: "test_order_123",
        amount: amount * 100,
        currency: "INR",
      });
    } catch (error) {
      return NextResponse.json({ success: false, error: "Payment failed" }, { status: 500 });
    }
  }
  