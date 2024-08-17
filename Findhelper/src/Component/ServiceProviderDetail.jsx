import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  successWrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
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
});

const ServiceProviderDetail = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/Home'); // Navigate to the home page
  };

  return (
    <div className={classes.successWrapper}>
      <h1 className={classes.title}>Data Added Successfully!</h1>
      <button className={classes.button} onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
};

export default ServiceProviderDetail;
