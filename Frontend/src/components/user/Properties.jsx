import React, { useEffect, useState } from 'react';
import UserLayout from './UserLayout';
import { getAllProperties } from '../../api/userApi';
import { Link } from 'react-router-dom';

const Properties = () => {
  const [affordable, setAffordable] = useState([]);
  const [medium, setMedium] = useState([]);
  const [luxury, setLuxury] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getAllProperties();
        const properties = res.data;

        setAffordable(properties.filter(p => p.pricePerMonth <= 5000));
        setMedium(properties.filter(p => p.pricePerMonth > 5000 && p.pricePerMonth <= 10000));
        setLuxury(properties.filter(p => p.pricePerMonth > 10000));
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const renderPropertyList = (list) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {list.map((property) => (
        <Link to={`/user/property/${property._id}`} key={property._id}>
          <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
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
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
              <p className="text-indigo-600 font-medium mb-2">₹{property.pricePerMonth} / month</p>
              <p className="text-sm text-gray-600 line-clamp-3">{property.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <UserLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse Properties</h2>

        {loading ? (
          <div className="text-center text-gray-600 py-10">Loading properties...</div>
        ) : (
          <>
            <section className="mb-10">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Affordable (≤ ₹5,000)</h3>
              {affordable.length > 0 ? renderPropertyList(affordable) : (
                <p className="text-gray-500">No affordable properties available.</p>
              )}
            </section>

            <section className="mb-10">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Medium Budget (₹5,001 – ₹10,000)</h3>
              {medium.length > 0 ? renderPropertyList(medium) : (
                <p className="text-gray-500">No medium budget properties available.</p>
              )}
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Luxury (> ₹10,000)</h3>
              {luxury.length > 0 ? renderPropertyList(luxury) : (
                <p className="text-gray-500">No luxury properties available.</p>
              )}
            </section>
          </>
        )}
      </div>
    </UserLayout>
  );
};

export default Properties;
