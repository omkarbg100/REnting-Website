import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const registerOwner = async (data) => {
  try {
    const res = await API.post('/owners/register', data);
    return res;
  } catch (error) {
    console.error('❌ Error registering owner:', error.response?.data || error.message);
    throw error;
  }
};

export const loginOwner = async (data) => {
  try {
    const res = await API.post('/owners/login', data);
    return res;
  } catch (error) {
    console.error('❌ Error logging in owner:', error.response?.data || error.message);
    throw error;
  }
};

export const getPropertiesByEmail = async (email) => {
  try {
    const res = await API.get(`/property/owner/${email}`);
    return res;
  } catch (error) {
    console.error('❌ Error fetching properties:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    const res = await API.delete(`/property/${id}`);
    return res;
  } catch (error) {
    console.error('❌ Error deleting property:', error.response?.data || error.message);
    throw error;
  }
};

export const postProperty = async (formData) => {
  console.log(formData);
  try {
    const res = await API.post('/property', formData); // no FormData, no special headers
    return res;
  } catch (error) {
    console.error('❌ Error posting property:', error.response?.data || error.message);
    throw error;
  }
};
