// routes/property.js
import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

// ➕ Add property using image URL (no file upload)
router.post('/', async (req, res) => {
  console.log('🧾 Incoming body:', req.body);
  try {
    const {
      title,
      description,
      pricePerMonth,
      owneremail,
      imageUrl,
      contactEmail,
      contactPhone,
      addressStreet,
      addressCity,
      addressState,
      addressCountry,
      addressZipCode,
    } = req.body;

    if (!title || !pricePerMonth || !owneremail || !imageUrl) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProperty = new Property({
      title,
      description,
      pricePerMonth,
      owneremail,
      images: [imageUrl],
      contactInfo: {
        email: contactEmail || '',
        phone: contactPhone || '',
      },
      address: {
        street: addressStreet || '',
        city: addressCity || '',
        state: addressState || '',
        country: addressCountry || '',
        zipCode: addressZipCode || '',
      },
    });

    const savedProperty = await newProperty.save();
    res.status(201).json({ message: 'Property added successfully', property: savedProperty });
  } catch (err) {
    console.error('❌ Error adding property:', err);
    res.status(500).json({ message: 'Failed to add property', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch property', error: err.message });
  }
});



// 📄 Get All
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties', error: err.message });
  }
});

// 📧 Get By Owner Email
router.get('/owner/:email', async (req, res) => {
  try {
    const properties = await Property.find({ owneremail: req.params.email });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties by email', error: err.message });
  }
});

export default router;

