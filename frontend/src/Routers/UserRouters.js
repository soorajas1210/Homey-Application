import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ConfirmBooking from "../Pages/Users/ConfirmBooking";
import FeaturedTasks from "../Pages/Users/FeaturedTasks";
import Home from "../Pages/Users/Home";
import Recomendations from "../Pages/Users/Recomendations";
import ServiceBook from "../Pages/Users/ServiceBook";
import ServiceDetails from "../Pages/Users/ServiceDetails";
import ServicesList from "../Pages/Users/ServicesList";
import SignIn from "../Pages/Users/SignIn";
import SignUp from "../Pages/Users/SignUp";
import UserProfile from "../Pages/Users/UserProfile";
import EditUserProfile from "../Pages/Users/EditUserProfile";
import UserServiceDetails from "../Pages/Users/UserServiceDetails";
import Payment from "../Pages/Users/Payment";
import UserChat from "../Pages/Users/UserChat";

function UserRouters() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/services" element={<ServicesList />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/serviceType/:id" element={<FeaturedTasks />} />
      <Route path="/ServiceBook/:id" element={<ServiceBook />} />
      <Route path="/book/details/:id" element={<ServiceDetails />} />
      <Route path="/book/recommendations" element={<Recomendations />} />
      <Route path="/book/ConfirmBooking" element={<ConfirmBooking />} />
      <Route path="/userProfile/edit" element={<EditUserProfile />} />
      <Route
        path="/userProfile/serviceDetails/:id"
        element={<UserServiceDetails />}
      />
      <Route path="/payment/:id" element={<Payment />} />
      <Route path="/user/chat/:id" element={<UserChat />} />
    </Routes>
  );
}

export default UserRouters;
