// src/components/user/About.js
import React from 'react';
import UserLayout from './UserLayout';


const About = () => {
  return (
    <UserLayout>
    <div className="p-6">
      <h2 className="text-xl font-semibold">About Us</h2>
      <p>This platform allows users to search, view, and manage rental properties easily.</p>
    </div>
    </UserLayout>
  );
};

export default About;