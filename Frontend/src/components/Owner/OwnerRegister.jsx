import React, { useState } from 'react';
import { registerOwner } from '../../api/ownerApi';
import { Link } from 'react-router-dom';

const OwnerRegister = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    contactNumber: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerOwner(form);
      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Registration failed'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Owner Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="text-sm text-center mt-4 text-gray-600">{message}</p>
        )}

        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OwnerRegister;
