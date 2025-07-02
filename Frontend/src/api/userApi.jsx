// src/api/userApi.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/users' });
const PROPERTY_API = axios.create({ baseURL: 'http://localhost:5000/api/property' });


export const registerUser = async (data) => {
  try {
    const res = await API.post('/register', data);
    return res;
  } catch (error) {
    console.error('🔴 Register Error:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await API.post('/login', data);
    return res;
  } catch (error) {
    console.error('🔴 Login Error:', error.response?.data || error.message);
    throw error;
  }
};

export const getUserProfile = async (email) => {
  try {
    const res = await API.get(`/profile/${email}`);
    return res;
  } catch (error) {
    console.error('🔴 Get Profile Error:', error.response?.data || error.message);
    throw error;
  }
};

// Property routes
export const getAllProperties = () => PROPERTY_API.get('/'); // ✅ calls /api/property