import express from 'express';
import bcrypt from 'bcryptjs';
import Owner from '../models/Owner.js';

const router = express.Router();

// Register Owner
router.post('/register', async (req, res) => {
  const { fullName, email, password, contactNumber } = req.body;

  try {
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOwner = new Owner({
      fullName,
      email,
      password: hashedPassword,
      contactNumber,
    });

    await newOwner.save();

    res.status(201).json({ message: 'Owner account created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login Owner (No JWT)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      owner: {
        id: owner._id,
        fullName: owner.fullName,
        email: owner.email,
        contactNumber: owner.contactNumber,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;
