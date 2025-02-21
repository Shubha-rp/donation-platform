import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  referralCode: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;
