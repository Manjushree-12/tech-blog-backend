const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ 
  message: "User Registered Successfully", 
  user: { _id: newUser._id, name: newUser.name }
});

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.password !== password) return res.status(400).json({ message: "Invalid Credentials" });

    res.status(200).json({ message: "Login Successful", token: user._id });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
