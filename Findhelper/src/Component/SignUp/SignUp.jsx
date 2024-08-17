import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faHome, faPhone, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { createUseStyles } from 'react-jss';

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
  },
  btn: {
    backgroundColor: '#007bff',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  textCenter: {
    textAlign: 'center',
    marginTop: '15px',
  },
  otpWrapper: {
    marginBottom: '15px',
  },
});

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    address: '',
    mobileNumber: '',
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false); // New state to track OTP verification
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const requestOtp = async () => {
    const mobileNumberWithCode = '+91' + formData.mobileNumber; // Concatenate +91 country code

    try {
      const response = await axios.post('http://localhost:8080/api/otp/request', {
        mobileNumber: mobileNumberWithCode,
      });
      if (response.status === 200) {
        alert('OTP sent successfully');
        setOtpSent(true);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP request:', error.response || error.message);
      setError('Failed to send OTP. Please check the mobile number and try again.');
    }
  };

  const verifyOtp = async () => {
    const mobileNumberWithCode = '+91' + formData.mobileNumber; // Concatenate +91 country code

    try {
      const response = await axios.post('http://localhost:8080/api/otp/verify', null, {
        params: {
          mobileNumber: mobileNumberWithCode,
          otpCode: otp,
        },
      });
      if (response.status === 200) {
        alert('OTP verified successfully');
        setOtpVerified(true); // Mark OTP as verified
      } else {
        setError('Invalid or expired OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error.response || error.message);
      setError('Failed to verify OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setError('Please verify OTP before submitting.');
      return;
    }

    try {
      const mobileNumberWithCode = '+91' + formData.mobileNumber; // Concatenate +91 country code
      const response = await axios.post('http://localhost:8080/api/users/register', {
        ...formData,
        mobileNumber: mobileNumberWithCode,
      });
      if (response.status === 200) {
        alert('Registration successful');
        navigate('/signin');
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error.response || error.message);
      setError('An error occurred. Please try again.');
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className={classes.formField}>
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Password */}
        <div className={classes.formField}>
          <FontAwesomeIcon icon={faKey} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* Address */}
        <div className={classes.formField}>
          <FontAwesomeIcon icon={faHome} />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="form-control"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        {/* Mobile Number */}
        <div className={classes.formField}>
          <FontAwesomeIcon icon={faPhone} />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            className="form-control"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            readOnly={otpVerified} // Make mobile number read-only if OTP is verified
          />
          {!otpVerified && (
            <button type="button" className={`btn ${classes.btn}`} onClick={requestOtp}>
              Request OTP
            </button>
          )}
        </div>

        {/* OTP Input Field */}
        {otpSent && !otpVerified && (
          <div className={classes.otpWrapper}>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="form-control"
              value={otp}
              onChange={handleOtpChange}
            />
            <button type="button" className={`btn ${classes.btn}`} onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>
        )}

        {/* Role */}
        <div className={classes.formField}>
          <FontAwesomeIcon icon={faUserTag} />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="PROVIDER">Service Provider</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Submit Button */}
        <button className={`btn ${classes.btn}`} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
