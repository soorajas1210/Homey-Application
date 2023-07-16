import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import BecomeaServicer from '../Pages/Service-Providers/BecomeaServicer';
import ProviderAccount from '../Pages/Service-Providers/ProviderAccount';
import ProviderServiceDetails from '../Pages/Service-Providers/ProviderServiceDetails';
import ProviderChatPage from '../Pages/Service-Providers/ProviderChatPage';
import EditProviderDetails from '../Pages/Service-Providers/EditProviderDetails';



function ServicesRouter() {
  return (
    <Routes>
      <Route
        path="/serviceProvider"
        element={<Navigate to="/serviceProvider/account" />}
      />
      <Route path="/serviceProvider/account" element={<ProviderAccount />} />
      <Route path="/BecomeProvider" element={<BecomeaServicer />} />
      <Route
        path="/serviceProvider/serviceDetails/:id"
        element={<ProviderServiceDetails />}
      />
      <Route path="/provider/chat/:id" element={<ProviderChatPage />} />
      <Route path = "/provider/editDetails" element={<EditProviderDetails/>} />
    </Routes>
  );
}

export default ServicesRouter
