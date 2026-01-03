import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  leaveType: String,
  startDate: String,
  endDate: String,
  reason: String,
  status: { type: String, default: "Pending" },
  adminComment: String,
});

export default mongoose.model("Leave", leaveSchema);
