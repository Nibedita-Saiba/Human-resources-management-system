import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  basic: Number,
  allowances: Number,
  deductions: Number,
  netSalary: Number,
  month: String,
});

export default mongoose.model("Payroll", payrollSchema);
