import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  formWrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
});

const Serviceprovide = () => {
  const classes = useStyles();
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    id: id,
    fname: '',
    lname: '',
    experience: '',
    costPerHour: '',
    availabilityTime: '',
    availableLocations: '',
    categoryId: '',
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
        const response = await axios.get('http://localhost:8080/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the JWT token to the headers
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    const fetchLocations = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
        const response = await axios.get('http://localhost:8080/api/locations', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the JWT token to the headers
          },
        });
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations', error);
      }
    };

    fetchCategories();
    fetchLocations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure categoryId is a number before submitting
    const dataToSubmit = {
      ...formData,
      categoryId: parseInt(formData.categoryId, 10), // Convert categoryId to a number
    };

    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
      await axios.post('http://localhost:8080/service-providers', {
        userId: id, // Include the user ID in the request body
        ...dataToSubmit,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the JWT token to the headers
        },
      });
      alert('Service provider details submitted successfully!');
      // Navigate to the service provider details page after successful submission
      navigate(`/service-provider-details/${id}`);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className={classes.formWrapper}>
      <h2 className={classes.title}>Service Provider Details</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="id">User ID</label>
          <input
            type="text"
            name="id"
            id="id"
            value={id}
            readOnly
            className={classes.input}
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="fname">First Name</label>
          <input
            type="text"
            name="fname"
            id="fname"
            value={formData.fname}
            onChange={handleInputChange}
            className={classes.input}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="lname">Last Name</label>
          <input
            type="text"
            name="lname"
            id="lname"
            value={formData.lname}
            onChange={handleInputChange}
            className={classes.input}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="experience">Experience (years)</label>
          <input
            type="number"
            name="experience"
            id="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className={classes.input}
            required
            min="0"
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="costPerHour">Cost Per Hour ($)</label>
          <input
            type="number"
            name="costPerHour"
            id="costPerHour"
            value={formData.costPerHour}
            onChange={handleInputChange}
            className={classes.input}
            required
            min="0"
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="availabilityTime">Availability Time</label>
          <select
            name="availabilityTime"
            id="availabilityTime"
            value={formData.availabilityTime}
            onChange={handleInputChange}
            className={classes.input}
            required
          >
            <option value="">Select Availability Time</option>
            <option value="MORNING">Morning</option>
            <option value="AFTERNOON">Afternoon</option>
            <option value="EVENING">Evening</option>
            <option value="NIGHT">Night</option>
          </select>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="availableLocations">Available Locations</label>
          <select
            name="availableLocations"
            id="availableLocations"
            value={formData.availableLocations}
            onChange={handleInputChange}
            className={classes.input}
            required
          >
            <option value="">Select a Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.location}>
                {location.location}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="categoryId">Category</label>
          <select
            name="categoryId"
            id="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className={classes.input}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={classes.button}>Submit</button>
      </form>
    </div>
  );
};

export default Serviceprovide;
