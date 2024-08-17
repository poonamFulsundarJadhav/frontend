import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const useStyles = createUseStyles({
  formWrapper: {
    width: '70vw', // Use 70% of viewport width
    maxWidth: '1000px', // Optional: Set a maximum width for very large screens
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
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  editButton: {
    backgroundColor: '#28a745', // Green
    '&:hover': {
      backgroundColor: '#218838',
    },
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Red
    '&:hover': {
      backgroundColor: '#c82333',
    },
  },
  viewButton: {
    backgroundColor: '#007bff', // Primary color
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
  categoryList: {
    marginTop: '20px',
    listStyleType: 'none',
    padding: '0',
  },
  categoryItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagePreview: {
    marginTop: '10px',
    maxWidth: '100%',
    borderRadius: '4px',
  },
});

const AdminCategoryPage = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ id: '', categoryName: '', imageFile: null });
  const [imagePreview, setImagePreview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
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
      handleErrorResponse(error);
    }
  };

  const handleErrorResponse = (error) => {
    if (error.response) {
      if (error.response.status === 403) {
        setErrorMessage('Authorization error. Please check your credentials.');
      } else {
        setErrorMessage(`Error: ${error.response.status} - ${error.response.data}`);
      }
    } else {
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    if (name === 'imageFile' && files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      return;
    }

    const { id, categoryName, imageFile } = formData;
    const data = new FormData();
    data.append('categoryName', categoryName);
    if (imageFile) {
      data.append('file', imageFile);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/categories/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:8080/api/categories/upload', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchCategories();
      setFormData({ id: '', categoryName: '', imageFile: null });
      setImagePreview('');
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      id: category.categoryId,
      categoryName: category.categoryName,
      imageFile: null,
    });

    setImagePreview(
      category.imageData
        ? `data:${category.imageType};base64,${category.imageData}`
        : ''
    );
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCategories();
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleView = (category) => {
    // Implement view logic if necessary
    alert(`Viewing details for ${category.categoryName}`);
  };

  return (
    <div className={classes.formWrapper}>
      <h1 className={classes.title}>Admin Category Page</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="categoryName">Category Name</label>
          <input
            className={classes.input}
            type="text"
            id="categoryName"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="imageFile">Category Image</label>
          <input
            className={classes.input}
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        {imagePreview && <img src={imagePreview} alt="Preview" className={classes.imagePreview} />}
        <button type="submit" className={classes.button}>Save</button>
      </form>
      <ul className={classes.categoryList}>
        {categories.map((category) => (
          <li key={category.categoryId} className={classes.categoryItem}>
            <span>{category.categoryId}</span>
            <span>{category.categoryName}</span>
            {category.imageData && (
              <img
                src={`data:${category.imageType};base64,${category.imageData}`}
                alt={category.categoryName}
                className={classes.imagePreview}
                style={{ width: '50px', height: '50px' }}
              />
            )}
            <div className={classes.buttonContainer}>
              <button
                type="button"
                className={`${classes.button} ${classes.viewButton}`}
                onClick={() => handleView(category)}
              >
                <FaEye style={{ marginRight: '8px' }} /> View
              </button>
              <button
                type="button"
                className={`${classes.button} ${classes.editButton}`}
                onClick={() => handleEdit(category)}
              >
                <FaEdit style={{ marginRight: '8px' }} /> Edit
              </button>
              <button
                type="button"
                className={`${classes.button} ${classes.deleteButton}`}
                onClick={() => handleDelete(category.categoryId)}
              >
                <FaTrash style={{ marginRight: '8px' }} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategoryPage;
