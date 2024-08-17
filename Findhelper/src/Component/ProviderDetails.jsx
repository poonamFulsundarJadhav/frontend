import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProviderDetails = () => {
  const [providerDetails, setProviderDetails] = useState(null);
  const location = useLocation();
  const providerId = location.state?.providerId;

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        if (providerId) {
          const token = localStorage.getItem('jwtToken'); // Retrieve JWT token

          // Fetch provider details including the mobile number
          const response = await axios.get(`http://localhost:8080/service-providers/byId/${providerId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the request headers
            },
          });

          setProviderDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching provider details:', error);
      }
    };

    fetchProviderDetails();
  }, [providerId]);

  if (!providerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gray-100'>
      <div className='container mx-auto py-16'>
        <h2 className='text-2xl font-bold text-gray-900'>Provider Details</h2>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{providerDetails.fname} {providerDetails.lname}</h5>
            <p className='card-text'>Experience: {providerDetails.experience} years</p>
            <p className='card-text'>Cost per Hour: ${providerDetails.costPerHour}</p>
            <p className='card-text'>Available Locations: {providerDetails.availableLocations}</p>
            <p className='card-text'>Availability Time: {providerDetails.availabilityTime}</p>
            <p className='card-text'>Contact Number: {providerDetails.mobileNumber || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
