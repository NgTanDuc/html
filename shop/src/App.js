import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Navbar from './components/navbar/Navbar';

const App = () => {

  return (
    <div class='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
      </Routes>
    </div>

  );
}
export default App;
