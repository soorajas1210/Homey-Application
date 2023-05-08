import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ServiceStatusPieChart from "../../Components/Admin/Dashboard/ServiceStatusPieChart";
import DashboardStatsGrid from "../../Components/Admin/Dashboard/DashbordStatusGrid";
import AdminNavbar from "../../Components/Admin/Navbar/AdminNavbar";
import SideBar from "../../Components/Admin/SideBar/SideBar";
import TransactionChart from "../../Components/Admin/Dashboard/TransactionChart";
import { useDispatch } from "react-redux";
import { getBookedList, getPaymentInfo, usersList } from "../../actions/adminActions";

function AdminDashboard() {
const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getPaymentInfo());
    }, []);

     useEffect(() => {
       dispatch(getBookedList());
       dispatch(usersList());
     }, [dispatch]);

  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-auto">
        <AdminNavbar />
        <div className="flex flex-col gap-4 overflow-auto">
          <Outlet />
          <DashboardStatsGrid />
          <div className="flex flex-row gap-4 w-full overflow-auto ">
            <TransactionChart />
            <ServiceStatusPieChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
