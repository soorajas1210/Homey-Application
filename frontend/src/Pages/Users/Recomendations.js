import React, { useEffect, useState } from "react";
import BookingNavbar from "../../Components/BookingNavbar/BookingNavbar";
import ServiceProvidersList from "../../Components/Recommendations/ServiceProvidersList";
import SideBox from "../../Components/Recommendations/SideBox";
import { useDispatch, useSelector } from "react-redux";
import { providersList } from "../../actions/adminActions";
import {
  getrecommendationList,
  selectedProvider,
} from "../../actions/userActions";
import { Typography } from "@mui/material";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

function Recomendations() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const List = useSelector((state) => state.recommendationList);
  const { loading, provider, error } = List;

  const getData = useSelector((state) => state.selectedProvider);

  const { successData } = getData;

  const [sProvider, setSProvider] = useState();
  const [date, setDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(null);

  const newDate = format(date, "dd-MM-yyyy");

  // const selectedDate = date; // replace this with the result of the mobileDatepicker
  // const formattedDate = format(selectedDate, "MMMM do yyyy, h:mm:ss a");

  console.log("in recomendations date", newDate);
  console.log("in recomendations taskTime", taskTime);
  console.log("in recomendations provider", sProvider);

  // const selected = (data) => {
  //   console.log("providers", data);
  // };

  const submitFunction = () => {
    console.log("selected the Provider");
    dispatch(selectedProvider(newDate, taskTime, sProvider));
  };

  useEffect(() => {
    if (successData) {
      navigate("/book/ConfirmBooking");
    }
  }, [successData, navigate]);

  useEffect(() => {
    dispatch(getrecommendationList());
  }, [dispatch]);
  return (
    <div>
      <BookingNavbar />

      <div className=" absolute w-1/4 flex flex-col items-center right-5 mt-5">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 w-1/4 "
        >
          Sorted By :-
        </label>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 "
        >
          <option selected>Reccomended</option>
          <option value="">Price(Lowest to High)</option>
          <option value="">Price(Highest to Low)</option>
          <option value="">Review</option>
        </select>
      </div>
      <div className=" flex  mt-24   ">
        <SideBox
          changeDate={(date) => setDate(date)}
          date={date}
          changeTaskTime={(taskTime) => setTaskTime(taskTime)}
          taskTime={taskTime}
        />
        <div className="flex flex-col  w-full p-5 ">
          {provider && provider.length > 0 ? (
            provider.map((provider) => (
              <ServiceProvidersList
                key={provider._id}
                provider={provider}
                providerSelected={(sProvider) => setSProvider(sProvider)}
              />
            ))
          ) : (
            <Typography>
              <PermContactCalendarIcon fontSize="large" />
              {
                "There are no Taskers currently available to help with your task.Try seeing who’s available on different days."
              }
            </Typography>
          )}

          {sProvider && submitFunction()}
        </div>
      </div>
    </div>
  );
}

export default Recomendations;
