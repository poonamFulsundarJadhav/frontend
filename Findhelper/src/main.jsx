  import React from 'react'
  import ReactDOM from 'react-dom/client'
  import App from './App.jsx'
  import Home  from './Component/Home/Home.jsx'
  import './index.css'
  import Layout  from './Layout.jsx'
  import AboutUs from './Component/AboutUs/AboutUs.jsx'
  import Contact from './Component/Contact/Contact.jsx'
  import User from './Component/User/User.jsx'
  import SignIn from './Component/SignIn/SignIn.jsx'
  import SignUp from './Component/SignUp/SignUp.jsx'
  import Carpenter from './Component/Details/Electrician.jsx'
  import Doctor  from './Component/Details/Doctor.jsx'
  import Teacher from './Component/Details/Teacher.jsx'
  import PestControll from './Component/Details/PestControll.jsx'
  import Plumber from './Component/Details/Plumber.jsx'
  import Electrician from './Component/Details/Electrician.jsx'
  import Catagory from './Component/Catagory.jsx'
  import ProviderDetails from './Component/ProviderDetails.jsx'

  import Serviceprovide from './Component/Serviceprovide.jsx'
  import UpdateService from './Component/UpdateService.jsx'
  import Adminpage from './Component/Adminpage.jsx'
  import AdminCategoryPage from './Component/AdminCategoryPage.jsx'
  import AdminLocationPage from './Component/AdminLocationPage.jsx'
  import Service from './Component/Services/Service.jsx'
  
import ServiceProviderDetail from './Component/ServiceProviderDetail.jsx'

  import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


  // const router=createBrowserRouter([
  // {
  //   path: '/',
  //   element:<Layout/>,
  //   children:[
  //               {path:"",element:<Home/>},
  //               {path:"AboutUs",element:<AboutUs/>},
  //               {path:"Contact",element:<Contact/>}
  //             ]
  // }

  // ])
  const router=createBrowserRouter(
    createRoutesFromElements(
    
        <Route path="/" element={<Layout/>}>
          <Route path ='/' element ={<Home/>}/>
          <Route path ='AboutUs' element ={<AboutUs/>}/>
          <Route path ='Contact' element ={<Contact/>}/>
          <Route path ='user/:id' element ={<User/>}/>
          <Route path ='SignIn' element ={<SignIn/>}/>
          <Route path ='SignUp' element ={<SignUp/>}/>
          {/* <Route path= 'ProductList' element={<ProductList/>}/> */}
          <Route path= 'Catagory' element={<Catagory/>}/>
          <Route path= 'admin' element={<Adminpage/>}/>
          <Route path= 'Service' element={<Service/>}/>
          <Route path= 'plumber' element={<Plumber/>}/>
          <Route path= 'carpenter' element={<Carpenter/>}/>
          <Route path= 'teacher' element={<Teacher/>}/>
          <Route path= 'pest-control' element={<PestControll/>}/>
          <Route path= 'doctor' element={<Doctor/>}/>
          <Route path= 'electrician' element={<Electrician/>}/>
          <Route path= 'AdminCategoryPage' element={<AdminCategoryPage/>}/>
          <Route path= 'AdminLocationPage' element={<AdminLocationPage/>}/>
          <Route path="provider-details" element={<ProviderDetails />} />
          <Route path= 'UpdateService/:id' element={<UpdateService/>}/>
          <Route path= 'ServiceProviderDetail' element={<ServiceProviderDetail/>}/>

        
        
          <Route path= 'serviceproviderform/:id' element={<Serviceprovide/>}/>
      </Route>
      
    )
  )
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>,
  )
