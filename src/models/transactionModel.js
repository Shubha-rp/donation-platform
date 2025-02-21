import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    referralCode: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
