import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import Navbar from './components/Navbar'
import Footer from './components/Footer';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          
        </Routes>
        <Footer/>
      </Router>
     
     
    </>
  )
}

export default App
