// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import ownerAuthRoutes from './routes/Owner.js';
import userRoutes from './routes/user.js';
import propertyRoutes from './routes/property.js'; // ✅ Make sure this path is correct

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Required for JSON body
app.use(express.urlencoded({ extended: true })); // Optional but good for form-urlencoded

// ✅ Routes
app.use('/api/owners', ownerAuthRoutes); // Owner login/register
app.use('/api/users', userRoutes);       // Get users, profile
app.use('/api/property', propertyRoutes); // Property routes

app.get('/', (req, res) => {
  res.send('<h1>Hello from RentMate Backend</h1>');
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('🚀 Server running on port 5000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
