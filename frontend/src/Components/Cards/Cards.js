import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import CardImage from "./Work complete.avif";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cards(props) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/ServiceBook/${id} `);
    console.log(id);
  };

  return (
    <div className="max-w-sm rounded  overflow-hidden shadow-2xl gap-3 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-600 ">
      <img
        onClick={() => handleClick(props.id)}
        className="w-full h-52"
        src={props.image}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4 h-32">
        <div className="font-bold text-xl mb-2">{props.ServiceName}</div>
        <p className="text-gray-700 text-base">Avg. Project: ₹370 – ₹740</p>
      </div>
    </div>
  );
}

export default Cards;
