import express from "express";
import Leave from "../models/Leave.js";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";

const router = express.Router();

router.post("/apply", auth, async (req, res) => {
  await Leave.create({ ...req.body, userId: req.user.id });
  res.json({ message: "Leave applied" });
});

router.put("/update/:id", auth, adminOnly, async (req, res) => {
  await Leave.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Leave updated" });
});

export default router;
