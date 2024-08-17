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

const PestControll = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate('/SignIn'); // Redirects to SignIn page
  };

  return (
    <div className={classes.container}>
      <img
        src="https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-pest-control-vector-prevention-from-infection-microbes-protective-clothes-anti-germs-png-image_1881906.jpg"
        alt="Person"
        className={classes.image}
      />
      <p className={classes.paragraph}>
      FindHelper is your trusted partner for pest control services, offering expert solutions to keep your home or business pest-free. Our certified pest control professionals are equipped with the latest techniques and eco-friendly products to effectively eliminate pests and prevent future infestations. Whether you're dealing with rodents, insects, or other unwanted guests, FindHelper provides fast, safe, and reliable pest control services. Let us protect your property—choose FindHelper for a pest-free environment you can count on.
        <br />
        <button className={classes.readMoreButton} onClick={handleReadMoreClick}>
          Read More
        </button>
      </p>
    </div>
  );
};

export default PestControll;
