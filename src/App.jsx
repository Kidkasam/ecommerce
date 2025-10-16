import React from 'react'
import { Router } from 'react-router-dom'
import { FaIcons } from 'react-icons/fa'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Products from './pages/products/Products'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Home/>
      <Products/>
      <Footer/>
    </div>
  )
}

export default App
