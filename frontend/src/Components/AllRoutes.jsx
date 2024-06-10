import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Page/Signup'
import Login from '../Page/Login'
const AllRoutes = () => {
  return (
   <Routes>
    <Route path="/" element={<Signup/>} />
    <Route path="/login" element={<Login />} />
   </Routes>
  )
}

export default AllRoutes