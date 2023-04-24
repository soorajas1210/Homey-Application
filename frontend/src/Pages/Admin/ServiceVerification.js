import React from "react";
import AdminNavbar from "../../Components/Admin/Navbar/AdminNavbar";
import SideBar from "../../Components/Admin/SideBar/SideBar";
import VerifyServices from "../../Components/Admin/VerifyServices";

function ServiceVerification() {
  return (
    <div>
      <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-auto ">
        <SideBar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminNavbar />
          <div className=" mt-10 overflow-auto ">
            <div className="font-bold mt-5 text-xl text-stone-700 text-left mx-10 overflow-auto ">
              <h1>Service Providers Verification</h1>
            </div>
            <VerifyServices />
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceVerification;
