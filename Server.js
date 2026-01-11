require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/game");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/game", require("./routes/game"));
app.use("/api/leaderboard", require("./routes/leaderboard"));


app.get("/", (_, res) => res.send("Memory Game API running"));

app.listen(process.env.PORT, () =>
  console.log("🚀 Server running on port", process.env.PORT)
);
