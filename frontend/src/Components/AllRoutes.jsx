import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Page/Signup'
import Login from '../Page/Login'
import ProductPage from '../Page/ProductPage'
const AllRoutes = () => {
  return (
   <Routes>
    <Route path="/" element={<Signup/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/product" element={<ProductPage />} />
   </Routes>
  )
}

export default AllRoutes