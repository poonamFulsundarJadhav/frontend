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

const Teacher = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate('/SignIn'); // Redirects to SignIn page
  };

  return (
    <div className={classes.container}>
      <img
        src="https://png.pngtree.com/png-clipart/20220107/ourmid/pngtree-teacher-s-day-long-hair-beautiful-teacher-holds-books-and-lectures-png-image_4097458.png"
        alt="Person"
        className={classes.image}
      />
      <p className={classes.paragraph}>
      Teacher services provide personalized educational support tailored to individual learning needs. Whether you're looking for help with specific subjects, exam preparation, or skill development, a qualified teacher can make a significant difference. These services cater to students of all ages, offering one-on-one tutoring, group lessons, and even online sessions. With a focus on improving understanding, boosting confidence, and achieving academic goals, teacher services are an essential resource for anyone looking to enhance their educational experience."
        <br />
        <button className={classes.readMoreButton} onClick={handleReadMoreClick}>
          Read More
        </button>
      </p>
    </div>
  );
};

export default Teacher;
