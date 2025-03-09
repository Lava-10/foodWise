require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const elevenRoutes = require("./routes/v1/elevenLabRoutes");
const chatRoutes = require("./routes/v1/chat");
const authRoutes = require("./routes/v1/authRoutes");
const aiRoutes = require("./routes/v1/aiRoutes");
const cors = require("cors");
const http = require("http");

connectDB();
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API route!" });
});
app.use("/api/v1/conversation", elevenRoutes);
app.use("/api/v1", chatRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ai", aiRoutes);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  setInterval(() => {
    http.get(`http://foodpulse.onrender.com`); 
    console.log("Pinged the server to keep it alive.");
  }, 13 * 60 * 1000); // 13 minutes interval
});
