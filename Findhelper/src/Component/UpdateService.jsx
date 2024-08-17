import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faDollarSign, faMapMarkerAlt, faTag } from '@fortawesome/free-solid-svg-icons';

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
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    position: 'relative',
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
  error: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '5px',
  },
  icon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  inputWrapper: {
    position: 'relative',
  },
});

const UpdateService = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    experience: '',
    costPerHour: '',
    availabilityTime: '',
    availableLocations: '',
    categoryName: '',
  });
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  // Enum for availability times
  const availabilityOptions = [
    { value: 'MORNING', label: 'Morning' },
    { value: 'AFTERNOON', label: 'Afternoon' },
    { value: 'EVENING', label: 'Evening' },
    { value: 'NIGHT', label: 'Night' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token

        const [providerResponse, locationsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/service-providers/byUserId/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get('http://localhost:8080/api/locations', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const providerData = providerResponse.data;
        setFormData({
          fname: providerData.fname,
          lname: providerData.lname,
          experience: providerData.experience,
          costPerHour: providerData.costPerHour,
          availabilityTime: providerData.availabilityTime || '', // Ensure it's set to an empty string if not available
          availableLocations: providerData.availableLocations || '', // Adjust based on response
          categoryName: providerData.categoryName || '', // Adjust based on response
        });

        setLocations(locationsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, [id]);

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.fname || !/^[a-zA-Z]+$/.test(formData.fname)) {
      formErrors.fname = 'First Name must contain only letters.';
      isValid = false;
    }

    if (!formData.lname || !/^[a-zA-Z]+$/.test(formData.lname)) {
      formErrors.lname = 'Last Name must contain only letters.';
      isValid = false;
    }

    if (!formData.experience || isNaN(formData.experience)) {
      formErrors.experience = 'Experience must be a number.';
      isValid = false;
    }

    if (!formData.costPerHour || isNaN(formData.costPerHour)) {
      formErrors.costPerHour = 'Cost Per Hour must be a number.';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log('Submitting form with data:', formData); // Log form data before submission

    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve JWT token

      const response = await axios.put(`http://localhost:8080/service-providers/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Service Provider updated successfully');
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error updating service provider:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={classes.formWrapper}>
      <h1 className={classes.title}>Update Service Provider</h1>
      {error && <p className={classes.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="fname">First Name</label>
          <div className={classes.inputWrapper}>
            <FontAwesomeIcon icon={faUser} className={classes.icon} />
            <input
              type="text"
              name="fname"
              id="fname"
              className={classes.input}
              value={formData.fname}
              onChange={handleChange}
              required
            />
            {errors.fname && <p className={classes.error}>{errors.fname}</p>}
          </div>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="lname">Last Name</label>
          <div className={classes.inputWrapper}>
            <FontAwesomeIcon icon={faUser} className={classes.icon} />
            <input
              type="text"
              name="lname"
              id="lname"
              className={classes.input}
              value={formData.lname}
              onChange={handleChange}
              required
            />
            {errors.lname && <p className={classes.error}>{errors.lname}</p>}
          </div>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="experience">Experience</label>
          <div className={classes.inputWrapper}>
            <FontAwesomeIcon icon={faCalendarAlt} className={classes.icon} />
            <input
              type="number"
              name="experience"
              id="experience"
              className={classes.input}
              value={formData.experience}
              onChange={handleChange}
              required
            />
            {errors.experience && <p className={classes.error}>{errors.experience}</p>}
          </div>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="costPerHour">Cost per Hour</label>
          <div className={classes.inputWrapper}>
            <FontAwesomeIcon icon={faDollarSign} className={classes.icon} />
            <input
              type="number"
              name="costPerHour"
              id="costPerHour"
              className={classes.input}
              value={formData.costPerHour}
              onChange={handleChange}
              required
            />
            {errors.costPerHour && <p className={classes.error}>{errors.costPerHour}</p>}
          </div>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="availabilityTime">Availability Time</label>
          <select
            name="availabilityTime"
            id="availabilityTime"
            className={classes.select}
            value={formData.availabilityTime}
            onChange={handleChange}
            required
          >
            <option value="">Select Availability Time</option>
            {availabilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="availableLocations">Available Locations</label>
          <select
            name="availableLocations"
            id="availableLocations"
            className={classes.select}
            value={formData.availableLocations}
            onChange={handleChange}
            required
          >
            <option value="">Select a Location</option>
            {locations.length > 0 ? (
              locations.map((location) => (
                <option key={location.id} value={location.location}>
                  {location.location}
                </option>
              ))
            ) : (
              <option value="" disabled>No locations available</option>
            )}
          </select>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="categoryName">Category Name</label>
          <div className={classes.inputWrapper}>
            <FontAwesomeIcon icon={faTag} className={classes.icon} />
            <input
              type="text"
              name="categoryName"
              id="categoryName"
              className={classes.input}
              value={formData.categoryName}
              readOnly
            />
          </div>
        </div>
        <button type="submit" className={classes.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateService;
