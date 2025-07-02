import React, { useEffect, useState } from 'react';
import { getAllProperties } from '../../api/userApi';
import UserLayout from './UserLayout';
import { Link } from 'react-router-dom';

const UserDashboard = ({ user }) => {
  const [affordable, setAffordable] = useState([]);
  const [medium, setMedium] = useState([]);
  const [luxury, setLuxury] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getAllProperties();
        const top10 = res.data.slice(0, 10);

        setAffordable(top10.filter(p => p.pricePerMonth <= 5000));
        setMedium(top10.filter(p => p.pricePerMonth > 5000 && p.pricePerMonth <= 10000));
        setLuxury(top10.filter(p => p.pricePerMonth > 10000));
      } catch (err) {
        console.error('Failed to load properties:', err);
      }
    };

    fetchProperties();
  }, []);

  const renderPropertyGrid = (list) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-2">
      {list.map((property) => (
        <Link to={`/user/property/${property._id}`} key={property._id}>
          <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition">
            {property.images?.[0] && (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{property.title}</h3>
              <p className="text-gray-600 text-sm">₹{property.pricePerMonth} / month</p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-3">{property.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <UserLayout>
      {/* 🏠 Hero Section */}
      <section className="bg-white min-h-screen flex flex-col md:flex-row items-center justify-between px-8 py-12">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, {user.fullName} 👋</h1>
          <p className="text-gray-600 mb-6 text-lg">
            Find the perfect rental home that matches your style and budget. From cozy to luxurious – RentMate has it all!
          </p>
          <p className="italic text-sm text-gray-500">“Your perfect home is just a click away.”</p>
        </div>
        <div className="mt-10 md:mt-0 md:ml-12">
          <img
            src="https://img.freepik.com/free-vector/home-sale-search-concept-illustration_114360-1537.jpg"
            alt="Home Illustration"
            className="w-full max-w-md"
          />
        </div>
      </section>

      {/* 💬 Offers */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 my-6 max-w-5xl mx-auto rounded shadow">
        <p className="font-semibold">🎉 Limited Offer:</p>
        <p>Book your dream rental before <strong>July 31st</strong> and get 10% off your first month!</p>
      </div>

      {/* 👤 Account Info
      <div className="max-w-4xl mx-auto mb-6 bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800">Account Info</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Contact: {user.contactNumber}</p>
      </div> */}

      {/* 🏘️ Categorized Properties */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Top 10 Properties</h2>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Affordable (≤ ₹5,000)</h3>
          {affordable.length > 0 ? renderPropertyGrid(affordable) : (
            <p className="text-gray-500">No affordable properties found.</p>
          )}
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Medium Budget (₹5,001 – ₹10,000)</h3>
          {medium.length > 0 ? renderPropertyGrid(medium) : (
            <p className="text-gray-500">No medium-budget properties found.</p>
          )}
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Luxury (> ₹10,000)</h3>
          {luxury.length > 0 ? renderPropertyGrid(luxury) : (
            <p className="text-gray-500">No luxury properties found.</p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
