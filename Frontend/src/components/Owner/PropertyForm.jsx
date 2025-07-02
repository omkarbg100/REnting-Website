import React, { useState } from 'react';
import { postProperty } from '../../api/ownerApi';
import { X } from 'lucide-react';

const PropertyFormModal = ({ onSuccess, onClose }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    pricePerMonth: '',
    imageUrl: '',
    contactInfo: { email: '', phone: '' },
    address: {
      street: '', city: '', state: '', country: '', zipCode: '',
    },
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address.')) {
      const key = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        address: { ...prev.address, [key]: value }
      }));
    } else if (name.includes('contactInfo.')) {
      const key = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [key]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const owneremail = localStorage.getItem('ownerEmail');
      const payload = {
        title: form.title,
        description: form.description,
        pricePerMonth: form.pricePerMonth,
        owneremail,
        imageUrl: form.imageUrl,
        contactEmail: form.contactInfo.email,
        contactPhone: form.contactInfo.phone,
        addressStreet: form.address.street,
        addressCity: form.address.city,
        addressState: form.address.state,
        addressCountry: form.address.country,
        addressZipCode: form.address.zipCode,
      };

      await postProperty(payload);
      setMessage('✅ Property posted!');
      setForm({
        title: '',
        description: '',
        pricePerMonth: '',
        imageUrl: '',
        contactInfo: { email: '', phone: '' },
        address: {
          street: '', city: '', state: '', country: '', zipCode: '',
        },
      });
      onSuccess();
      onClose(); // Close modal on success
    } catch (err) {
      console.error('❌ Error posting property:', err);
      setMessage('❌ Failed to post property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 relative border border-gray-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition">
          <X size={20} />
        </button>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Post New Property</h3>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input name="title" placeholder="Title" onChange={handleChange} value={form.title} required className="border rounded px-3 py-2" />
          <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} className="border rounded px-3 py-2" />
          <input name="pricePerMonth" type="number" placeholder="Price/Month" onChange={handleChange} value={form.pricePerMonth} required className="border rounded px-3 py-2" />
          <input name="imageUrl" placeholder="Image URL" onChange={handleChange} value={form.imageUrl} required className="border rounded px-3 py-2" />
          <input name="contactInfo.email" placeholder="Contact Email" onChange={handleChange} value={form.contactInfo.email} className="border rounded px-3 py-2" />
          <input name="contactInfo.phone" placeholder="Phone" onChange={handleChange} value={form.contactInfo.phone} className="border rounded px-3 py-2" />
          <input name="address.street" placeholder="Street" onChange={handleChange} value={form.address.street} className="border rounded px-3 py-2" />
          <input name="address.city" placeholder="City" onChange={handleChange} value={form.address.city} className="border rounded px-3 py-2" />
          <input name="address.state" placeholder="State" onChange={handleChange} value={form.address.state} className="border rounded px-3 py-2" />
          <input name="address.country" placeholder="Country" onChange={handleChange} value={form.address.country} className="border rounded px-3 py-2" />
          <input name="address.zipCode" placeholder="ZIP Code" onChange={handleChange} value={form.address.zipCode} className="border rounded px-3 py-2" />
          <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition">
            {loading ? 'Posting...' : 'Submit'}
          </button>
        </form>
        <p className="text-sm mt-2 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default PropertyFormModal;
