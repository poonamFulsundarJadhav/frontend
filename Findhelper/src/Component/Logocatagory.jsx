import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const categories = [
  {
    categoryId: 1,
    categoryName: 'Plumber',
    imageData: 'https://icon2.cleanpng.com/20240126/eiu/transparent-white-background-cartoon-plumber-fixing-pipe-not-lifelike-1710899622557.webp',
  },
  {
    categoryId: 2,
    categoryName: 'Carpenter',
    imageData: 'https://png.pngtree.com/png-vector/20240309/ourmid/pngtree-carpenter-carton-man-clip-art-png-image_11921016.png',
  },
  {
    categoryId: 3,
    categoryName: 'Electrician',
    imageData: 'https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-electrician-on-the-power-pole-png-image_5711978.png',
  },
  {
    categoryId: 4,
    categoryName: 'Teacher',
    imageData: 'https://png.pngtree.com/png-clipart/20220107/ourmid/pngtree-teacher-s-day-long-hair-beautiful-teacher-holds-books-and-lectures-png-image_4097458.png',
  },
  {
    categoryId: 5,
    categoryName: 'Pest Control',
    imageData: 'https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-pest-control-vector-prevention-from-infection-microbes-protective-clothes-anti-germs-png-image_1881906.jpg',
  },
  {
    categoryId: 6,
    categoryName: 'Doctor',
    imageData: 'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png',
  },
];

const Logocatagory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    switch (categoryName) {
      case 'Plumber':
        navigate('/plumber');
        break;
      case 'Carpenter':
        navigate('/carpenter');
        break;
      case 'Electrician':
        navigate('/electrician');
        break;
      case 'Teacher':
        navigate('/teacher');
        break;
      case 'Pest Control':
        navigate('/pest-control');
        break;
      case 'Doctor':
        navigate('/doctor');
        break;
      default:
        navigate('/service', { state: { categoryName } });
        break;
    }
  };

  return (
    <div className="bg-light">
      <div className="container-fluid py-5">
        <h2 className="text-center text-white bg-gray-800 py-3" style={{ fontSize: '2rem' }}>Our Services</h2>
        <div className="row">
          {categories.map((category) => (
            <div key={category.categoryId} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
              <div
                className="card h-100 cursor-pointer border-0"
                onClick={() => handleCategoryClick(category.categoryName)}
              >
                <img
                  alt={category.categoryName}
                  src={category.imageData}
                  className="card-img-top rounded-circle mx-auto"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{category.categoryName}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logocatagory;
