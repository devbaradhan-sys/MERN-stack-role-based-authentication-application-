const express = require("express");
const app = express();
const authRouter = require("./authRoute");
const schoolRouter = require("./schoolRoute")
const { verifyToken } = require("../middleware/authMiddleware");

// Auth routes
app.use("/", authRouter);

app.use('/school', schoolRouter);



module.exports = app;
