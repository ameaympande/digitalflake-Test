const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const Role = require("../model/Role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const KEY = process.env.PRIVATE_KEY;

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).exec();

  if (!user) {
    return res.status(400).json({ error: "User not found." });
  }

  if (!user.status) {
    return res
      .status(400)
      .json({ error: "Account is not verified, Please verify the account." });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password." });
  }

  const token = jwt.sign(
    { userId: user._id, email, password: user.password },
    KEY,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({
    message: "Login success",
    token,
    user: {
      _id: user._id,
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
    },
  });
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required." });
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  }).exec();
  if (existingUser) {
    return res.status(400).json({ error: "Email is already registered." });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const lastUser = await User.findOne().sort({ user_number: -1 }).lean().exec();
  const id = lastUser ? lastUser.user_number + 1 : 1;

  const user = await User.create({
    id,
    name,
    email: email.toLowerCase(),
    password: hashedPwd,
    // role: "admin",
    status: true,
  });

  res.status(201).json({
    message: "Registration successful",
    user: {
      _id: user._id,
      id: user.id,
      user_number: user.user_number,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = { login, register };
