import express from "express";
import Leave from "../models/Leave.js";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/role.js";

const router = express.Router();

/* ===============================
   EMPLOYEE: APPLY LEAVE
   POST /api/leave/apply
================================ */
router.post("/apply", auth, async (req, res) => {
  try {
    await Leave.create({
      ...req.body,
      userId: req.user.id, // comes from JWT
      status: "Pending",
    });
    res.json({ message: "Leave applied" });
  } catch (error) {
    res.status(500).json({ message: "Failed to apply leave" });
  }
});

/* ===============================
   EMPLOYEE: VIEW MY LEAVES
   GET /api/leave/my   (STEP 11A-4)
================================ */
router.get("/my", auth, async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
});

/* ===============================
   ADMIN: VIEW ALL LEAVES
   GET /api/leave/all
================================ */
router.get("/all", auth, adminOnly, async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all leaves" });
  }
});

/* ===============================
   ADMIN: APPROVE / REJECT LEAVE
   PUT /api/leave/update/:id
================================ */
router.put("/update/:id", auth, adminOnly, async (req, res) => {
  try {
    await Leave.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Leave updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update leave" });
  }
});

export default router;
