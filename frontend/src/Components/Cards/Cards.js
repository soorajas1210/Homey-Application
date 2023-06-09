import * as React from "react";
import { useNavigate } from "react-router-dom";

function Cards(props) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/ServiceBook/${id} `);
    console.log(id);
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-2xl gap-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-600">
      <img
        onClick={() => handleClick(props.id)}
        className="w-full h-44 md:h-52 object-cover"
        src={props.image}
        alt="Sunset in the mountains"
      />
      <div className="px-4 py-3 h-28 md:h-32">
        <div className="font-bold text-lg md:text-xl mb-2">
          {props.ServiceName}
        </div>
        <p className="text-gray-700 text-base">Avg. Project: ₹370 – ₹740</p>
      </div>
    </div>
  );
}

export default Cards;
