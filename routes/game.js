const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

// Save progress
router.post("/progress", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.level = Math.max(user.level, req.body.level);
  user.score += req.body.score;
  await user.save();
  res.json({ success: true });
});

// score
router.post("/score", auth, async (req, res) => {
  const { level, timeLeft } = req.body;

  const score = level * 100 + timeLeft;

  const user = await User.findById(req.user.id);

  if (score > user.bestScore) {
    user.bestScore = score;
  }

  if (level > user.maxLevel) {
    user.maxLevel = level;
  }

  await user.save();

  res.json({ score, bestScore: user.bestScore });
});

module.exports = router;
