import React from 'react'
import truck from "../../assets/truck.png"
import bus from "../../assets/bus.jpg"
import { Link } from 'react-router-dom'
import "./SelectPage.css";

const SelectPage = () => {
  return (
    <div className='selectmain'>
      <div className='container_a'>
        <b>SELECT CATEGORY</b>
      </div>
      
      <div className='container_b'>
      <Link to="/truckpage">
          <img className='img1' src={truck} alt="Truck Page" />
          {/* <p>TRUCK</p> */}
      </Link>
      <Link to="/buspage">
          <img className='img2' src={bus} alt="Bus Page" />
          {/* <p>BUS</p> */}
      </Link>
      </div>

    </div>
  )
}

export default SelectPage
