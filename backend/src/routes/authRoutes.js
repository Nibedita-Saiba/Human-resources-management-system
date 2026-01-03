import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/* =========================
   SIGNUP
   POST /api/auth/signup
========================= */
router.post("/signup", async (req, res) => {
  const { employeeId, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);
  await User.create({
    employeeId,
    email,
    password: hash,
    role,
  });

  res.json({ message: "User registered" });
});

/* =========================
   LOGIN
   POST /api/auth/login
========================= */
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token, role: user.role });
});

/* =========================
   PROFILE (CURRENT USER)
   GET /api/auth/me
========================= */
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

export default router;
