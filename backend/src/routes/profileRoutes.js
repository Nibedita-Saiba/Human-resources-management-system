import express from "express";
import Profile from "../models/Profile.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  res.json(profile);
});

router.put("/update", auth, async (req, res) => {
  await Profile.findOneAndUpdate({ userId: req.user.id }, req.body, {
    upsert: true,
  });
  res.json({ message: "Profile updated" });
});

export default router;
