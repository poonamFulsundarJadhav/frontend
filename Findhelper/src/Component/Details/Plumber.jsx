import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
  },
  image: {
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  paragraph: {
    maxWidth: '600px',
    textAlign: 'justify',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  readMoreButton: {
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

const Plumber = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate('/SignIn'); // Redirects to SignIn page
  };

  return (
    <div className={classes.container}>
      <img
        src="https://icon2.cleanpng.com/20240126/eiu/transparent-white-background-cartoon-plumber-fixing-pipe-not-lifelike-1710899622557.webp"
        alt="Person"
        className={classes.image}
      />
      <p className={classes.paragraph}>
      At FindHelper, we connect you with top-notch plumbing professionals who are ready to tackle any job, big or small. Our expert plumbers are just a call away, providing reliable and efficient services to keep your home or business running smoothly. From emergency repairs to regular maintenance, trust FindHelper to deliver the quality service you need, when you need it. Let us take the hassle out of finding a dependable plumber—choose FindHelper for fast, friendly, and professional plumbing solutions.
        <br />
        <button className={classes.readMoreButton} onClick={handleReadMoreClick}>
          Read More
        </button>
      </p>
    </div>
  );
};

export default Plumber;
