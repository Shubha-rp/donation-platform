import mongoose from "mongoose";

// Define the schema for the user
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  referralCode: { type: String, required: true, unique: true, index: true }, // Ensure unique referral code
  totalEarnings: { type: Number, default: 0 },
  goalAchieved: { type: Number, default: 0 },
});

// Create or use an existing User model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
