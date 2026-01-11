const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const top = await User.find()
    .sort({ bestScore: -1 })
    .limit(10)
    .select("username bestScore maxLevel");

  res.json(top);
});

module.exports = router;
