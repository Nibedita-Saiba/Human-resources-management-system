import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  phone: String,
  address: String,
  department: String,
  salary: Number,
});

export default mongoose.model("Profile", profileSchema);
