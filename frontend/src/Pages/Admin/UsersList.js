import React from "react";
import CustomersTable from "../../Components/Admin/CustomersTable";
import AdminNavbar from "../../Components/Admin/Navbar/AdminNavbar";
import SideBar from "../../Components/Admin/SideBar/SideBar";

function UsersList() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar />
        <div className="mt-10 overflow-scroll ">
          <CustomersTable />
        </div>
      </div>
    </div>
  );
}

export default UsersList;
