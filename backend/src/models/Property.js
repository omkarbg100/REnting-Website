// ✅ 1. propertySchema.js
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String },
  description: String,
  images: [String],
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  pricePerMonth: { type: Number, required: true },
  owneremail: { type: String, required: true },
  contactInfo: {
    email: String,
    phone: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Property', propertySchema);