const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const userRouter = require("./routes/users");

const SERVERDEVPORT = 4741;
const CLIENTDEVPORT = 5173;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

const app = express();
app.use(require("./config/checkToken"));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${CLIENTDEVPORT}`,
  })
);
const PORT = process.env.PORT || SERVERDEVPORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
const ensureLoggedIn = require("./config/ensureLoggedIn");

//Email Verification Code Configuration

const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service
  auth: {
    user: "zombiedbmailer@gmail.com",
    pass: "igtt heed gpvu ugkr",
  },
});

app.post("/send-verification-email", (req, res) => {
  const { email, code } = req.body;

  const mailOptions = {
    from: "zombiedbmailer@gmail.com",
    to: email,
    subject: "Verify your account",
    text: `Your verification code is ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.post("/email-reset-code", (req, res) => {
  const { email, code } = req.body;

  const mailOptions = {
    from: "zombiedbmailer@gmail.com",
    to: email,
    subject: "This is the code to reset your password",
    text: `Your verification code is ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

//App Listener
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

module.exports = app;
