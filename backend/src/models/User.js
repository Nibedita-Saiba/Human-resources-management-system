import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  employeeId: String,
  email: String,
  password: String,
  role: { type: String, enum: ["ADMIN", "EMPLOYEE"] },
  isEmailVerified: { type: Boolean, default: true },
});

export default mongoose.model("User", userSchema);
