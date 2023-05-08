import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingDetails from "./BookingDetails";
import { getFullUserInfo } from "../../actions/userActions";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSignin);
  const { userInfo } = user;

  useEffect(() => {
    dispatch(getFullUserInfo(userInfo._id));
  }, [dispatch]);

  const userSignin = useSelector((state) => state.getUserInfo);
  const { getUserInfo } = userSignin;

  //   const date = getUserInfo.createdAt
  // const newDate = format(date, "dd-MM-yyyy");

  const toEdit = () => {
    navigate("/userProfile/edit");
  };

  const toProviderAccount = () => {
    navigate("/serviceProvider/account");
  };

  return (
    <>
      <div class="bg-gray-100">
        <div class="container mx-auto my-5 p-5">
          <div class="md:flex no-wrap md:-mx-2 ">
            <div class="w-full md:w-3/12 md:mx-2">
              <div class="bg-white p-3 border-t-4 border-green-400">
                <img
                  src={getUserInfo?.pic}
                  alt=""
                  class="rounded-full w-24 h-24 mx-auto"
                />
                <h1 class="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                  <span>{getUserInfo?.firstName} </span>{" "}
                  <span> {getUserInfo?.lastName}</span>
                </h1>
                <h3 class="text-gray-600 font-lg text-semibold leading-6 text-center">
                  Owner at Her Company Inc.
                </h3>
                <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
                <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li class="flex items-center py-3">
                    <span>Status</span>
                    <span class="ml-auto">
                      <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        {getUserInfo?.role}
                      </span>
                    </span>
                  </li>
                  {getUserInfo?.role === "provider" && (
                    <li class="flex items-center py-3">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={toProviderAccount}
                      >
                        {" See Your Provider Details"}
                      </Button>
                    </li>
                  )}
                  <li class="flex items-center py-3">
                    <span>Member since</span>
                    <span class="ml-auto">
                      {new Date(getUserInfo?.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-full md:w-9/12 mx-2 h-64">
              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      class="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span class="tracking-wide">About</span>
                </div>
                <div class="text-gray-700">
                  <div class="grid md:grid-cols-2 text-sm">
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">First Name</div>
                      <div class="px-4 py-2">{getUserInfo?.firstName}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Last Name</div>
                      <div class="px-4 py-2">{getUserInfo?.lastName}</div>
                    </div>

                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Contact No.</div>
                      <div class="px-4 py-2">+91 {getUserInfo?.mobileno}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Current Address</div>
                      <div class="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">
                        Permanant Address
                      </div>
                      <div class="px-4 py-2">
                        Arlington Heights, IL, Illinois
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Email.</div>
                      <div class="px-4 py-2">
                        <a class="text-blue-800" href="mailto:jane@example.com">
                          {getUserInfo?.email}
                        </a>
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Birthday</div>
                      <div class="px-4 py-2">Feb 06, 1998</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={toEdit}
                  class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                >
                  Edit Details
                </button>
              </div>

              <div class="my-4"></div>
            </div>
          </div>
          <div className="">
            <BookingDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
