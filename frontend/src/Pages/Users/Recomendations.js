import React, { useEffect, useState } from "react";
import BookingNavbar from "../../Components/BookingNavbar/BookingNavbar";
import ServiceProvidersList from "../../Components/Recommendations/ServiceProvidersList";
import SideBox from "../../Components/Recommendations/SideBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getrecommendationList,
  selectedProvider,
} from "../../actions/userActions";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Footer from "../../Components/Footer/Footer";

function Recomendations() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const List = useSelector((state) => state.recommendationList);
  const { provider } = List;

  const getData = useSelector((state) => state.selectedProvider);
  const { successData } = getData;

  const [sProvider, setSProvider] = useState();
  const [date, setDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(null);

  const newDate = format(date, "dd-MM-yyyy");


  console.log("in recomendations date", newDate);
  console.log("in recomendations taskTime", taskTime);
  console.log("in recomendations provider", sProvider);
  console.log("in recomendations date", provider);


  const submitFunction = () => {
    console.log("selected the Provider");
    dispatch(selectedProvider(newDate, taskTime, sProvider));
  };

  useEffect(() => {
    if (newDate && taskTime && sProvider) {
      navigate("/book/ConfirmBooking");
    }
  }, [newDate, taskTime, sProvider, navigate]);

  useEffect(() => {
    dispatch(getrecommendationList(newDate, taskTime));
  }, [dispatch, newDate, taskTime]);

  return (
    <div>
      <BookingNavbar value={1} />
      <div className="text-center font-bold mt-5">
        <h1>
          Select your Service provider by selecting prefered date and Time.
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-start md:space-x-5 md:ml-8 p-4">
        <SideBox
          changeDate={(date) => setDate(date)}
          date={date}
          changeTaskTime={(taskTime) => setTaskTime(taskTime)}
          taskTime={taskTime}
        />

        <div className="flex flex-col gap-4 w-full md:w-2/3 p-5 h-screen overflow-y-auto">
          {provider && provider.length > 0 ? (
            provider.map((provider) => (
              <ServiceProvidersList
                key={provider._id}
                provider={provider}
                providerSelected={(sProvider) => setSProvider(sProvider)}
                className="flex flex-col"
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 text-center py-16">
              <PermContactCalendarIcon className="mb-4" fontSize="large" />
              <p className="mb-2">
                There are no Taskers currently available to help with your task.
                Try seeing who's available on different days.
              </p>
            </div>
          )}

          {sProvider && submitFunction()}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Recomendations;
