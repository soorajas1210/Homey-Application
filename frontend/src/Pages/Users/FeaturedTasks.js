import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sList } from "../../actions/adminActions";
import { serviceTypeDetails } from "../../actions/userActions";
import BookNow from "../../Components/BookNow/BookNow";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import featured from "../assets/featured.jpg";

function FeaturedTasks() {
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const service = useSelector((state) => state.categoryDetails);

  const { getCategory } = service;

  console.log("getCategory ", getCategory);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(serviceTypeDetails(id));
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(sList());
  }, [dispatch]);

  const serviceList = useSelector((state) => state.servicesList);
  const { services } = serviceList;

  return (
    <div>
      <Navbar />
      <div class="relative ">
        <div
          className="bg-cover w-full"
          style={{
            backgroundImage: `url(${getCategory.image})`,
            height: "26.2rem",
          }}
        ></div>

        <h1 class="absolute font-extrabold text-3xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {getCategory.serviceType}
        </h1>
        <p class="absolute text-2xl text-white bottom-4 left-1/2 -translate-x-1/2 mb-14 text-center ">
          {getCategory.serviceTypeDescription}
        </p>
      </div>
      <div className="font-bold text-lg text-green-800 mt-10 px-20 ">
        <p>
          {" "}
          Home {">"} Services {">"} Featured Tasks{" "}
        </p>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-y-4 w-1/2 ml-20 mt-10">
          {services
            .filter(
              (service) => service.serviceType === getCategory.serviceType
            )
            .map((service) => (
              <BookNow key={service._id} props={service} />
            ))}
        </div>
        <div className="ml-10  w-1/3 mt-10 px-6  ">
          <h1 className="font-bold text-lg">1.Select your Tasker</h1>{" "}
          <p>
            Describe your task and choose a background checked and
            client-reviewed Tasker for the job
          </p>{" "}
          <br />
          <h1 className="font-bold text-lg"> 2.Schedule a time </h1>{" "}
          <p>Get your task done — on your time</p> <br />
          <h1 className="font-bold text-lg"> 3.Pay when it’s done </h1>{" "}
          <p>
            Pay seamlessly through the TaskRabbit platform only after your task
            is complete{" "}
          </p>
          <br />
          <p>
            Hear What People Are Saying Brian M. Punctual, efficient service
            with a smile? Yes please, I'll have another task done from
            TaskRabbit. – Brian M. Carol B. <br />I was amazed how quickly Ben
            took care of the job. I'll definitely ask for his help again! –
            Carol B. Sharya D. <br />
            Super-helpful service that handled my last minute request to
            perfection. – Sharya D.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FeaturedTasks;
