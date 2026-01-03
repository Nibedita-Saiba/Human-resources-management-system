import express from "express";
import Payroll from "../models/Payroll.js";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";

const router = express.Router();

router.get("/my", auth, async (req, res) => {
  res.json(await Payroll.find({ userId: req.user.id }));
});

router.post("/update", auth, adminOnly, async (req, res) => {
  await Payroll.create(req.body);
  res.json({ message: "Payroll updated" });
});

export default router;
