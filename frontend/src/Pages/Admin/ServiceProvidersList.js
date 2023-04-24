import React from "react";
import ServiceProvidersTable from "../../Components/Admin/ServiceProvidersTable";
import AdminNavbar from "../../Components/Admin/Navbar/AdminNavbar";
import SideBar from "../../Components/Admin/SideBar/SideBar";

function ServiceProvidersList() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen ">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-hidden ">
        <AdminNavbar />
        <div className="mt-10 overflow-auto">
          <ServiceProvidersTable />
        </div>
      </div>
    </div>
  );
}

export default ServiceProvidersList;
