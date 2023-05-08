import React from "react";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "./assets/logo.png";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "./Constants";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../Redux/Admin/adminSigninSlice";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function SideBar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutFunction = (e) => {
    e.preventDefault();

    dispatch(adminLogout());
    localStorage.removeItem("adminInfo");
    navigate("/admin");
  };

  return (
    <div className="bg-slate-800 w-20 sm:w-52 md:w-64 flex flex-col rounded-r-xl">
      <div className="flex items-center gap-2 px-1 py-3 sm:px-4 sm:py-4">
        <img
          className="hidden sm:block"
          src={logo}
          style={{ width: "3rem" }}
          alt="admin logo"
        ></img>
        <span className="text-neutral-200 text-lg">Homey</span>
      </div>
      <div className="py-4 sm:py-8 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div className={classNames(linkClass, "cursor-pointer text-red-500")}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          <button onClick={logoutFunction}> Logout </button>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? "bg-neutral-500 text-white"
          : "text-neutral-400",
        linkClass
      )}
    >
      <span className="text-xl">{link.icon}</span>
      <span className="hidden sm:block">{link.label}</span>
    </Link>
  );
}
