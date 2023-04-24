import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import BecomeaServicer from '../Pages/Service-Providers/BecomeaServicer';
import ProviderAccount from '../Pages/Service-Providers/ProviderAccount';
import ProviderServiceDetails from '../Pages/Service-Providers/ProviderServiceDetails';



function ServicesRouter() {
  return (
    <Routes>
      <Route path="/serviceProvider" element={<Navigate to="/serviceProvider/account" />}/>
      <Route path="/serviceProvider/account" element={<ProviderAccount/>} />
      <Route path='/BecomeProvider' element={<BecomeaServicer/>} />
      <Route path='/serviceProvider/serviceDetails/:id' element={<ProviderServiceDetails/>} />
    </Routes>
  );
}

export default ServicesRouter
