const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcrypt");

// Get All Users or a Single User by ID
const getAllUsers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { key, page = 1, limit = 10 } = req.query;

  if (id) {
    const user = await User.findById(id).select("-password").lean().exec();

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json(user);
  }

  const query = {};
  if (key) {
    query.name = { $regex: key, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select("-password")
    .sort({ id: -1 })
    .skip(skip)
    .limit(Number(limit))
    .lean()
    .exec();

  const total = await User.countDocuments(query);

  if (!users || users.length === 0) {
    return res.status(404).json({ error: "Users not found." });
  }

  res.json({
    users,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  });
});

// Create New User
const createNewUser = asyncHandler(async (req, res) => {
  const { name, mob_no, role, email, password, profile_picture } = req.body;

  if (!name || !email || !role || !mob_no || !password || !profile_picture) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() })
    .lean()
    .exec();

  if (existingUser) {
    return res.status(400).json({ error: "Email already exists." });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const lastUser = await User.findOne().sort({ id: -1 }).lean().exec();
  const id = lastUser ? lastUser.id + 1 : 1;

  const userObj = {
    id,
    name,
    email: email.toLowerCase(),
    password: hashedPwd,
    role,
    mob_no,
    profile_picture,
  };

  const user = await User.create(userObj);

  res.status(201).json({ message: "User created successfully", user });
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, mob_no, role, email, profile_picture } = req.body;

  if (!id || (!name && !mob_no && !role && !email && !profile_picture)) {
    return res.status(400).json({ error: "Invalid input." });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  if (email && email.toLowerCase() !== user.email) {
    const existingUser = await User.findOne({ email: email.toLowerCase() })
      .lean()
      .exec();
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }
  }

  user.name = name || user.name;
  user.mob_no = mob_no || user.mob_no;
  user.role = role || user.role;
  user.email = email ? email.toLowerCase() : user.email;
  user.profile_picture = profile_picture || user.profile_picture;

  await user.save();

  res.status(200).json({ message: "User updated successfully", user });
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  await user.remove();

  res.status(200).json({ message: "User deleted successfully" });
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
