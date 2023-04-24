import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.png";

function BookingNavbar() {
  return (
    <div>
      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded border flex flex-row gap-9 items-center ">
        <div class=" items-center  ">
          <Link to="/">
            <img src={Logo} class="h-6 ml-5 sm:h-9" alt="Homey Logo" />
          </Link>
        </div>
        <div className="w-full ">
          <div class=" mx-auto my-4 pb-4">
            <div class="flex pb-3">
              <div class="flex-1"></div>

              <div class="flex-1">
                <div class="w-7 h-7 bg-green-500 mx-auto rounded-full text-lg text-slate-900 flex items-center">
                  <span class=" text-slate-900 text-center w-full">
                    <i class="fa fa-check w-full fill-current white"></i>
                  </span>
                </div>
              </div>

              <div class="w-1/6 align-center items-center align-middle content-center flex">
                <div class="w-full bg-gray-500 rounded items-center align-middle align-center flex-1">
                  <div
                    class="bg-green-500 text-xs leading-none py-1 text-center text-gray-600 rounded "
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              <div class="flex-1">
                <div class="w-7 h-7 bg-green-500 mx-auto rounded-full text-lg  text-slate-900 flex items-center">
                  <span class=" text-slate-900 text-center w-full">
                    <i class="fa fa-check w-full fill-current white"></i>
                  </span>
                </div>
              </div>

              <div class="w-1/6 align-center items-center align-middle content-center flex">
                <div class="w-full bg-gray-500 rounded items-center align-middle align-center flex-1">
                  <div
                    class="bg-green-500 text-xs leading-none py-1 text-center text-gray-500 rounded "
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>

              <div class="flex-1">
                <div class="w-7 h-7 bg-white border-2 border-gray-500 mx-auto rounded-full text-lg  text-slate-900 flex items-center">
                  <span class="text-grey-darker text-center w-full">3</span>
                </div>
              </div>

              <div class="w-1/6 align-center items-center align-middle content-center flex">
                <div class="w-full bg-gray-500 rounded items-center align-middle align-center flex-1">
                  <div
                    class="bg-green-500 text-xs leading-none py-1 text-center text-gray-600 rounded "
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              <div class="flex-1">
                <div class="w-7 h-7 bg-white border-2 border-gray-400 mx-auto rounded-full text-lg  text-slate-900 flex items-center">
                  <span class="text-gray-700 text-center w-full">4</span>
                </div>
              </div>

              <div class="flex-1"></div>
            </div>

            <div class="flex text-xs content-center text-center">
              <div class="w-1/4">Invitation received</div>

              <div class="w-1/4">Personal details</div>

              <div class="w-1/4">Application details</div>

              <div class="w-1/4">Confirmation</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default BookingNavbar;
