import React from "react";
import { Link, useNavigate } from "react-router-dom";

import image from "./banner.jpg";
import { Button } from "@mui/material";

function BookNow(props) {
  const navigate = useNavigate();
  console.log("propsid", props.props._id);
  const viewService = (id) => {
    console.log("new props id", id);
    navigate(`/ServiceBook/${id} `);
  };
  return (
    <div class="flex justify-start">
      <div class="flex flex-col  border-2 h-60 w-full rounded-lg bg-white border-slate-800 shadow-lg md:max-w-5xl md:flex-row ">
        <img class=" p-6 w-60 h-60 rounded-xl" src={props.props.image} alt="" />

        <div class="flex flex-col justify-start p-6">
          <h5 class="mb-2 text-xl font-medium text-neutral-800">
            {props.props.serviceName}
          </h5>
          <p class="mb-4 text-base text-neutral-600">
            This is a wider card with supporting text below as a natural lead-in
          </p>

          <Button
            onClick={async () => viewService(props.props._id)}
            variant="contained"
            color="success"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookNow;
