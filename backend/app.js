const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRouter");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;