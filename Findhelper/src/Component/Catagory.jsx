import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate('/Service', { state: { categoryId } });
  };

  const getImageSrc = (category) => {
    if (category.imageData && category.imageType) {
      return `data:${category.imageType};base64,${category.imageData}`;
    }
    return 'https://via.placeholder.com/400'; // Fallback image if no image provided
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-full px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Collections</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
          {categories.map((category) => (
            <div key={category.categoryId} className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg">
              <div
                className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200"
                style={{ aspectRatio: '16 / 9' }}
              >
                <img
                  alt={category.categoryName}
                  src={getImageSrc(category)}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{category.categoryName}</h3>
                <p className="mt-1 text-sm text-gray-600">{category.description || 'No description available'}</p>
                <button
                  onClick={() => handleCategoryClick(category.categoryId)}
                  className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  View Services
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
