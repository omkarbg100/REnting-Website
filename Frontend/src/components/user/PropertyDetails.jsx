import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserLayout from './UserLayout';
import axios from 'axios';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/property/${id}`);
        setProperty(res.data);

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const alreadyInWishlist = wishlist.some(item => item._id === res.data._id);
        if (alreadyInWishlist) setAdded(true);
      } catch (err) {
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.some(item => item._id === property._id)) {
      wishlist.push(property);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setAdded(true);
    } else {
      alert('Already in wishlist');
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="p-6 text-center text-gray-600">Loading property details...</div>
      </UserLayout>
    );
  }

  if (!property) {
    return (
      <UserLayout>
        <div className="p-6 text-center text-red-600">Property not found</div>
      </UserLayout>
    );
  }

  const { title, pricePerMonth, description, images, address, contactInfo } = property;

  return (
    <UserLayout>
      <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        {images?.[0] && (
          <img
            src={images[0]}
            alt={title}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <p className="text-lg text-indigo-600 font-semibold mb-2">
          ₹{pricePerMonth.toLocaleString()} / month
        </p>

        <p className="text-gray-700 mb-4">{description}</p>

        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700">Contact Info</h4>
          <p>Email: {contactInfo?.email || 'N/A'}</p>
          <p>Phone: {contactInfo?.phone || 'N/A'}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700">Address</h4>
          <p>
            {address?.street}, {address?.city}, {address?.state}, {address?.country} - {address?.zipCode}
          </p>
        </div>

        <button
          onClick={handleAddToWishlist}
          disabled={added}
          className={`w-full py-2 mt-4 rounded text-white font-semibold ${
            added
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 transition'
          }`}
        >
          {added ? '✓ Added to Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </UserLayout>
  );
};

export default PropertyDetails;


