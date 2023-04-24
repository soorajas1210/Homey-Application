import React from 'react'
import LocationManagement from '../../Components/Admin/Location/LocationManagement ';
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar';
import ServicesTables from '../../Components/Admin/ServiceManagement/ServicesTables';
import ServiceTypes from '../../Components/Admin/ServiceManagement/ServiceTypes';
import SideBar from '../../Components/Admin/SideBar/SideBar';

function ServiceManagement() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen ">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-hidden ">
        <AdminNavbar />
        <div className="mt-10 overflow-auto">
          <ServiceTypes />
          <ServicesTables/>
          <LocationManagement />
        </div>
      </div>
    </div>
  );
}

export default ServiceManagement
