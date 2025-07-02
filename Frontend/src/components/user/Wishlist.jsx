import React, { useEffect, useState } from 'react';
import UserLayout from './UserLayout';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <UserLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600 py-10">Your wishlist is empty.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((property) => (
              <div
                key={property._id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <Link to={`/user/property/${property._id}`}>
                  {property.images?.[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </Link>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                  <p className="text-indigo-600 font-medium mb-2">₹{property.pricePerMonth} / month</p>
                  <p className="text-sm text-gray-600 line-clamp-3">{property.description}</p>

                  <button
                    onClick={() => removeFromWishlist(property._id)}
                    className="mt-3 w-full text-sm bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Wishlist;
