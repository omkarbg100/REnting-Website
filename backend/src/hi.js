const handleUpload = async () => {
  const formData = new FormData();
  formData.append('image', selectedFile); // File input
  formData.append('title', '2BHK Apartment');
  formData.append('pricePerMonth', 12000);
  // Add other fields...

  await axios.post('/api/properties', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
