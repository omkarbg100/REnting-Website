import React, { useEffect, useState } from 'react';
import { getPropertiesByEmail, deleteProperty } from '../../api/ownerApi';
import PropertyFormModal from './PropertyForm';

const OwnerDashboard = ({ owner }) => {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchProperties = async () => {
    try {
      const email = localStorage.getItem('ownerEmail');
      const res = await getPropertiesByEmail(email);
      setProperties(res.data);
    } catch {
      alert('❌ Failed to fetch properties');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await deleteProperty(id);
      fetchProperties();
    } catch {
      alert('❌ Delete failed');
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Welcome, {owner.fullName}
          </h2>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg shadow-md transition duration-300"
          >
            {showForm ? 'Cancel' : '+ Post Property'}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-50 shadow-inner rounded-xl p-6 mb-10 border border-indigo-200">
            <PropertyFormModal
              onSuccess={() => {
                fetchProperties();
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}

        <h3 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-2">Your Properties</h3>

        {properties.length === 0 ? (
          <p className="text-center text-lg text-gray-500 mt-12">No properties posted yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
              >
                {p.images?.length > 0 && (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{p.title}</h4>
                  <p className="text-gray-600 mb-2">₹{p.pricePerMonth} / month</p>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">{p.description}</p>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
