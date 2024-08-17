import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { createUseStyles } from 'react-jss';

// Styles for the SignIn component and Modal
const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    marginBottom: '20px',
  },
  formField: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
  },
  errorInput: {
    border: '1px solid red',
  },
  errorMsg: {
    color: 'red',
    position: 'absolute',
    right: '0',
    top: '100%',
    fontSize: '12px',
  },
  btn: {
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
  textCenter: {
    textAlign: 'center',
    marginTop: '15px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'skyblue',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  closeButton: {
    marginTop: '15px',
    backgroundColor: 'white',
    color: 'skyblue',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  },
});

const SignIn = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear error when input changes
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.email) {
      isValid = false;
      errors.email = 'Please fill the username';
    }

    if (!formData.password) {
      isValid = false;
      errors.password = 'Please fill the password';
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: formData.email,
        password: formData.password,
      });

      if (response.status === 202) {
        const { token, user } = response.data;

        // Store the token in localStorage
        localStorage.setItem('jwtToken', token);

        setModalMessage('You logged in successfully');
        setTimeout(() => setModalMessage(''), 3000); // Hide the message after 3 seconds

        // Redirect based on role
        switch (user.role) {
          case 'PROVIDER':
            const existsResponse = await axios.get(
              `http://localhost:8080/service-providers/exists/${user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const exists = existsResponse.data;

            if (exists) {
              navigate(`/updateservice/${user.id}`);
            } else {
              navigate(`/serviceproviderform/${user.id}`);
            }
            break;
          case 'ADMIN':
            navigate('/admin');
            break;
          case 'USER':
            navigate('/');
            break;
          default:
            navigate('/');
            break;
        }

        // Update Header component to reflect login
        window.dispatchEvent(new Event('userLoggedIn'));
      } else {
        setError('Invalid credentials. Please try again.');
        if (response.data && response.data.message) {
          setFormErrors({
            ...formErrors,
            [response.data.field]: response.data.message,
          });
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      if (error.response && error.response.data) {
        setFormErrors({
          ...formErrors,
          [error.response.data.field]: error.response.data.message,
        });
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <img
          src="https://th.bing.com/th/id/OIP.mmjVD2F3Bcidm7tmMFalpQHaHa?rs=1&pid=ImgDetMain"
          alt="Logo"
        />
      </div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.formField}>
          <FontAwesomeIcon icon={faUser} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`${classes.input} ${formErrors.email ? classes.errorInput : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <span className={classes.errorMsg}>* {formErrors.email}</span>}
        </div>
        <div className={classes.formField}>
          <FontAwesomeIcon icon={faKey} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`${classes.input} ${formErrors.password ? classes.errorInput : ''}`}
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && <span className={classes.errorMsg}>* {formErrors.password}</span>}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className={classes.btn} type="submit">
          Sign In
        </button>
      </form>
      {modalMessage && (
        <div className={classes.modalOverlay}>
          <div className={classes.modalContent}>
            <p>{modalMessage}</p>
            <button className={classes.closeButton} onClick={() => setModalMessage('')}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
