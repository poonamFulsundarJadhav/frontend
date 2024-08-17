// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ProductList = () => {
//   const location = useLocation();
//   const { category } = location.state || {}; // Ensure category is available

//   const [products, setProducts] = useState([
//     {
//       category: 'Plumber',
//       title: 'Plumber Service 1',
//       text: 'Description for plumber service 1.',
//       imgSrc: 'https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp'
//     },
//     {
//       category: 'Plumber',
//       title: 'Plumber Service 2',
//       text: 'Description for plumber service 2.',
//       imgSrc: 'https://mdbcdn.b-cdn.net/img/new/standard/nature/112.webp'
//     },
//     {
//       category: 'Plumber',
//       title: 'Plumber Service 3',
//       text: 'Description for plumber service 3.',
//       imgSrc: 'https://mdbcdn.b-cdn.net/img/new/standard/nature/113.webp'
//     },
//     {
//       category: 'Electrician',
//       title: 'Electrician Service 1',
//       text: 'Description for electrician service 1.',
//       imgSrc: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       category: 'Electrician',
//       title: 'Electrician Service 2',
//       text: 'Description for electrician service 2.',
//       imgSrc: 'https://images.pexels.com/photos/1436913/pexels-photo-1436913.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       category: 'Electrician',
//       title: 'Electrician Service 3',
//       text: 'Description for electrician service 3.',
//       imgSrc: 'https://images.pexels.com/photos/1578272/pexels-photo-1578272.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       category: 'Mechanic',
//       title: 'Mechanic Service 1',
//       text: 'Description for mechanic service 1.',
//       imgSrc: 'https://images.pexels.com/photos/3807361/pexels-photo-3807361.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       category: 'Mechanic',
//       title: 'Mechanic Service 2',
//       text: 'Description for mechanic service 2.',
//       imgSrc: 'https://images.pexels.com/photos/3807335/pexels-photo-3807335.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       category: 'Mechanic',
//       title: 'Mechanic Service 3',
//       text: 'Description for mechanic service 3.',
//       imgSrc: 'https://images.pexels.com/photos/3807433/pexels-photo-3807433.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       category: 'Baby Care',
//       title: 'Baby Care Service 1',
//       text: 'Description for baby care service 1.',
//       imgSrc: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       category: 'Baby Care',
//       title: 'Baby Care Service 2',
//       text: 'Description for baby care service 2.',
//       imgSrc: 'https://images.pexels.com/photos/3763582/pexels-photo-3763582.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//     {
//       category: 'Baby Care',
//       title: 'Baby Care Service 3',
//       text: 'Description for baby care service 3.',
//       imgSrc: 'https://images.pexels.com/photos/1648375/pexels-photo-1648375.jpeg?auto=compress&cs=tinysrgb&w=400'
//     },
//   ]);

//   const filteredProducts = products.filter(product => product.category === category);

//   useEffect(() => {
//     // Initialize any required scripts or libraries here
//   }, []);

//   if (!category) {
//     return <div>No category selected.</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="text-2xl font-bold text-gray-900">{category} Products</h2>
//       <div className="row">
//         {filteredProducts.map((product, index) => (
//           <div className="col-md-4 mb-4" key={index}>
//             <div className="card">
//               <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
//                 <img src={product.imgSrc} className="img-fluid" alt={product.title} />
//                 <a href="#!">
//                   <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
//                 </a>
//               </div>
//               <div className="card-body">
//                 <h5 className="card-title">{product.title}</h5>
//                 <p className="card-text">{product.text}</p>
//                 <a href="#!" className="btn btn-primary">Button</a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
