import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import './Home.css'
const Home = () => {
  const url = "http://localhost:4000"
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`);
    console.log(response.data);

    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])




  return (
    <div className='condition'>
      <div className="navbar">
        <div className="navbar-logo">
          <img src={assets.plane_window} alt="" />
        </div>
        <div className="navbar-menu">
          <h2>show room</h2>
        </div>
        <div className="navbar-right">
          <img src={assets.list_icon} alt="" />
        </div>
      </div>
      <div className="content">
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img className='image' src={`${url}/images/` + item.image} alt="" />
              <div className="list-table-content">
                <h2 className='item'>{item.name}</h2>
                <p className='item'>{item.description}</p>
                <p className='item_price'>${item.price}</p>
              </div>

            </div>
          )
        })}
      </div>

      <div className='footer' id='footer'>
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.plane_window} alt="" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>_1-212-456-7890</li>
              <li>contact@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @ 4thang.com - All right reserved</p>

      </div>
    </div>
  )
}

export default Home
