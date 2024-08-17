import React from 'react'
import Catagory from '../Catagory'
import Team from '../Team/'
import Crousel from '../Crousel'
import Service from '../Services/Service'
import Video from '../Video'
import Logocatagory from '../Logocatagory'
import {Link} from 'react-router-dom';

function Home() {
  return (
    
      <>
      <Crousel/>
    <Logocatagory/>
      <Catagory/>
      < Video/>
      <Team/>
      </>
    
  )
}

export default Home
