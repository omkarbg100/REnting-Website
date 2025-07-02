import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const userRoutes = express.Router();

userRoutes.post('/',(req,res)=>{
    res.send("<h1>user</h1>");
})

// Create Account (Register)
userRoutes.post('/register', async (req, res) => {
  const { fullName, email, password, contactNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      contactNumber,
    });

    await newUser.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login (simple auth: email + password, no JWT)
userRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        contactNumber: user.contactNumber,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default userRoutes;
