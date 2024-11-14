import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import Verticalbar from './components/Verticalbar/Verticalbar';
import Add from './pages/Add/Add';
import List from './pages/List/List';

const App = () => {

  const url = "http://localhost:4000"
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="app-content">
        <Verticalbar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
