import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  referralCode: { type: String, required:false },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

//export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
export default Transaction;
