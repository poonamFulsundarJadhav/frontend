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

const Carpenter = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate('/SignIn'); // Redirects to SignIn page
  };

  return (
    <div className={classes.container}>
      <img
        src="https://png.pngtree.com/png-vector/20240309/ourmid/pngtree-carpenter-carton-man-clip-art-png-image_11921016.png"
        alt="Person"
        className={classes.image}
      />
      <p className={classes.paragraph}>
      Transform your living space with expert carpentry services from FindHelper. Whether you need custom furniture, precise woodwork, or home renovations, our skilled carpenters bring craftsmanship and creativity to every project. At FindHelper, we connect you with professionals who take pride in their work, delivering beautiful and durable results that enhance your home. From intricate designs to practical solutions, trust FindHelper to bring your vision to life with quality carpentry services.
        <br />
        <button className={classes.readMoreButton} onClick={handleReadMoreClick}>
          Read More
        </button>
      </p>
    </div>
  );
};

export default Carpenter;
