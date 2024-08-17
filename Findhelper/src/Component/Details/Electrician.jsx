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

const Electrician = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate('/SignIn'); // Redirects to SignIn page
  };

  return (
    <div className={classes.container}>
      <img
        src="https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-electrician-on-the-power-pole-png-image_5711978.png"
        alt="Person"
        className={classes.image}
      />
      <p className={classes.paragraph}>
      FindHelper is your go-to solution for professional electrician services, providing top-notch expertise for all your electrical needs. Whether it's wiring, repairs, installations, or emergency services, our certified electricians ensure safety and efficiency with every job. With a commitment to quality and reliability, FindHelper guarantees your electrical systems are in the best hands. Trust us to power your home or business with precision and care. Choose FindHelper for electrical services you can depend on.
        <br />
        <button className={classes.readMoreButton} onClick={handleReadMoreClick}>
          Read More
        </button>
      </p>
    </div>
  );
};

export default Electrician;
