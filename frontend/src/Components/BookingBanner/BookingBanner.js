import React from "react";
import { Link } from "react-router-dom";
import featured from "./banner.jpg";

function BookingBanner() {
  return (
    <div>
      <div class="relative ">
        <div className="flex justify-cente ">
          <div
            className="bg-cover w-full"
            style={{
              backgroundImage: `url(${featured})`,
              height: "31rem",
            }}
          ></div>
          <div class="absolute text-center h-2/3 max-w-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded overflow-hidden shadow-lg bg-white">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 mt-5"> Handyman Services</div>
              <p class="text-gray-700 font-semibold text-base mt-10">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <Link to="/book/details">
              <button className=" h-10 mt-10 px-5 m-2 bg-green-700 hover:bg-green-800 text-white font-bold py-2 border border-green-700 rounded  ">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingBanner;
