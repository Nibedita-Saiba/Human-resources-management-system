import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: String,
  checkIn: Date,
  checkOut: Date,
  workingHours: Number,
  status: String,
});

export default mongoose.model("Attendance", attendanceSchema);
