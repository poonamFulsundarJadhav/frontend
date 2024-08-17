import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Service = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = location.state?.categoryId;

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        if (categoryId) {
          const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from localStorage
          
          const response = await axios.get(`http://localhost:8080/service-providers/${categoryId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Set the Authorization header
            },
          });
          setServiceProviders(response.data);
        }
      } catch (error) {
        console.error('Error fetching service providers:', error);
      }
    };

    fetchServiceProviders();
  }, [categoryId]);

  const handleProviderClick = (providerId) => {
    navigate('/provider-details', { state: { providerId } });
  };

  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const filteredProviders = serviceProviders.filter(provider =>
    provider.availableLocations.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className='bg-gray-100'>
      <div className='container mx-auto py-16'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Service Providers</h2>
        
        <div className='input-group mb-4'>
          <input 
            type='text' 
            className='form-control' 
            placeholder='Search by location' 
            value={searchLocation}
            onChange={handleSearchChange}
          />
          <div className='input-group-append'>
            <span className='input-group-text'>
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>

        <div className='row'>
          {filteredProviders.map((provider) => (
            <div key={provider.id} className='col-md-4 mb-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{provider.fname} {provider.lname}</h5>
                  <p className='card-text'>Experience: {provider.experience} years</p>
                  <p className='card-text'>Cost per Hour: ${provider.costPerHour}</p>
                  <p className='card-text'>Available Locations: {provider.availableLocations}</p>
                  <p className='card-text'>Availability Time: {provider.availabilityTime}</p>
                  <button className='btn btn-primary' onClick={() => handleProviderClick(provider.id)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
