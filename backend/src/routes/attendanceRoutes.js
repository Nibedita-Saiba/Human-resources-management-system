import express from "express";
import Attendance from "../models/Attendance.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/check-in", auth, async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  await Attendance.create({
    userId: req.user.id,
    date: today,
    checkIn: new Date(),
    status: "Present",
  });
  res.json({ message: "Checked in" });
});

router.post("/check-out", auth, async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const record = await Attendance.findOne({ userId: req.user.id, date: today });
  record.checkOut = new Date();
  record.workingHours = 8;
  await record.save();
  res.json({ message: "Checked out" });
});

router.get("/my", auth, async (req, res) => {
  res.json(await Attendance.find({ userId: req.user.id }));
});

export default router;
