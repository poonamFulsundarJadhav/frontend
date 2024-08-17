import React, { useState } from 'react';
import AdminCategoryPage from './AdminCategoryPage';
import AdminLocationPage from './AdminLocationPage';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    padding: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
});

const Adminpage = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState('category');

  return (
    <div className={classes.container}>
      <button onClick={() => setCurrentPage('category')} className={classes.button}>
        Manage Categories
      </button>
      <button onClick={() => setCurrentPage('location')} className={classes.button}>
        Manage Locations
      </button>

      {currentPage === 'category' && <AdminCategoryPage />}
      {currentPage === 'location' && <AdminLocationPage />}
    </div>
  );
};

export default Adminpage;
