import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginOwner } from '../../api/ownerApi';

const OwnerLogin = ({ setOwner }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginOwner(form);
      setOwner(res.data.owner);
      localStorage.setItem('ownerEmail', res.data.owner.email);
      localStorage.setItem('ownerName', res.data.owner.fullName); // Optional: save name
      setMessage('✅ Login successful!');
      navigate('/owner/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Owner Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-sm text-center mt-4 text-gray-600">{message}</p>
        )}

        <p className="text-sm text-center mt-6 text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OwnerLogin;

