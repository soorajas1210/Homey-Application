import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { serviceDetails } from "../../actions/userActions";
import BookingBanner from "../../Components/BookingBanner/BookingBanner";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import image from "../assets/Handyman-Booking.png";

function ServiceBook() {
  const { id } = useParams();
  console.log(id);
const navigate = useNavigate()
  const dispatch = useDispatch();
  const service = useSelector((state) => state.serviceDetails);

  const { getService } = service;

  console.log("getService", getService);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(serviceDetails(id));
    };
    fetchData();
  }, [dispatch, id]);

  const handleClick = () =>{

    navigate(`/book/details/${id}`);

  }

  return (
    <div>
      <Navbar />
      <div>
        <div class="relative ">
          <div className="flex justify-cente ">
            <div
              className="bg-cover w-full"
              style={{
                backgroundImage: `url(${getService.image})`,
                height: "31rem",
              }}
            ></div>
            <div class="absolute text-center h-2/3 max-w-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded overflow-hidden shadow-lg bg-white">
              <div class="px-6 py-4">
                <div class="font-bold text-2xl mb-2 mt-5">
                  {getService.serviceName}
                </div>
                <p class="text-gray-700 font-semibold text-base mt-10">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              
                <button onClick={()=>handleClick(getService._id)} className=" h-10 mt-10 px-5 m-2 bg-green-700 hover:bg-green-800 text-white font-bold py-2 border border-green-700 rounded  ">
                  Book Now
                </button>
            
            </div>
          </div>
        </div>
      </div>
      <h1 className="font-bold mt-10 mx-14 text-xl">
        {getService.serviceName}
      </h1>
      <div className="flex flex-grid items-center p-9 ">
        <div className="w-1/2 text-center p-10 break-words font-medium text-lg">
          <h1>{getService.serviceDescription}</h1>
        </div>
        <div className="w-1/2 p-9 ml-10">
          <div
            className="bg-cover ml-14"
            style={{
              backgroundImage: `url(${image})`,
              height: "25rem",
              width: "25rem",
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceBook;
