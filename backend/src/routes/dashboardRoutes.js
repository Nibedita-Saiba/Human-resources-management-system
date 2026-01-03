import express from "express";
import { auth } from "../middleware/auth.js";
import User from "../models/User.js";
import Leave from "../models/Leave.js";

const router = express.Router();

router.get("/employee", auth, async (req, res) => {
  res.json({ message: "Employee dashboard" });
});

router.get("/admin", auth, async (req, res) => {
  res.json({
    employees: await User.countDocuments(),
    pendingLeaves: await Leave.countDocuments({ status: "Pending" }),
  });
});

export default router;
