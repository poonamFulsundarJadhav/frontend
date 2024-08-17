// src/pages/AdminLocationPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const useStyles = createUseStyles({
  formWrapper: {
    width: '70%',
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
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: '5px',
    },
  },
  addButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#218838',
    },
  },
  editButton: {
    backgroundColor: '#ffc107',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#e0a800',
    },
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#c82333',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
  locationList: {
    marginTop: '20px',
    listStyleType: 'none',
    padding: '0',
  },
  locationItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px', // Adjust the gap between buttons
  },
});

const AdminLocationPage = () => {
  const classes = useStyles();
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({ id: '', location: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/locations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLocations(response.data);
    } catch (error) {
      setError('Error fetching locations');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    try {
      if (formData.id) {
        await axios.put(`http://localhost:8080/api/locations/${formData.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Location updated successfully');
      } else {
        await axios.post('http://localhost:8080/api/locations', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Location created successfully');
      }
      setFormData({ id: '', location: '' });
      fetchLocations();
    } catch (error) {
      setError('Error submitting form');
    }
  };

  const handleEdit = (location) => {
    setFormData({ id: location.id, location: location.location });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/locations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Location deleted successfully');
      fetchLocations();
    } catch (error) {
      setError('Error deleting location');
    }
  };

  return (
    <div className={classes.formWrapper}>
      <h1 className={classes.title}>Admin Location Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            className={classes.input}
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className={`${classes.button} ${classes.addButton}`}>
          <FaPlus /> {formData.id ? 'Update Location' : 'Add Location'}
        </button>
      </form>

      <ul className={classes.locationList}>
        {locations.map((location) => (
          <li key={location.id} className={classes.locationItem}>
            <span>{location.location}</span>
            <div className={classes.buttonGroup}>
              <button onClick={() => handleEdit(location)} className={`${classes.button} ${classes.editButton}`}>
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDelete(location.id)} className={`${classes.button} ${classes.deleteButton}`}>
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLocationPage;
