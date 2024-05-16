import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from '../../Pages/Dashboard'
import Inventory from '../../Pages/Inventory'
import Orders from '../../Pages/Orders'
import Customers from '../../Pages/Customers'

const AppRoutes = () => {
  return (
    <div>
        
            <Routes>
                <Route path='/' element={<DashBoard/>}>  </Route>
                <Route path='/inventory' element={<Inventory/>}>  </Route>
                <Route path='/orders' element={<Orders/>}>  </Route>
                <Route path='/customers' element={<Customers/>}>  </Route>
            </Routes>
        
    </div>
  )
}

export default AppRoutes