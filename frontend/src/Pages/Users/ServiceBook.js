import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serviceDetails } from "../../actions/userActions";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import image from "../assets/Handyman-Booking.png";
import { Box, Button, Typography } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    height: "31rem",
    "@media (max-width: 600px)": {
      height: "20rem",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

function ServiceBook() {
  const classes = useStyles();

  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
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

  const handleClick = () => {
    navigate(`/book/details/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div>
        <div class="relative ">
          <div
            className="flex justify-cente "
            style={{
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div
              className="bg-cover w-full"
              style={{
                backgroundImage: `url(${getService.image})`,
                height: "31rem",
                width: "100%",
              }}
            ></div>

            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                bgcolor: "#fff",
                maxWidth: "500px",
              }}
            >
              <Box sx={{ px: 6, py: 2, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="div"
                  fontWeight="bold"
                  mt={2}
                  mb={2}
                >
                  {getService.serviceName}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  mt={4}
                  fontWeight="bold"
                >
                  Book your service Now....
                </Typography>

                <Button
                  onClick={() => handleClick(getService._id)}
                  sx={{
                    mt: 4,
                    px: 5,
                    py: 2,
                    bgcolor: "#004C00",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#519451",
                    },
                  }}
                  variant="contained"
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <h1 className="font-bold mt-10 mx-4 md:mx-14 text-xl text-center">
        {getService.serviceName}
      </h1>
      <div className="flex flex-wrap items-center p-4 md:p-9 ">
        <div className="w-full md:w-1/2 text-center p-4 md:p-10 break-words font-medium text-lg">
          <h1>{getService.serviceDescription}</h1>
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-9">
          <div
            className="bg-cover mx-auto"
            style={{
              backgroundImage: `url(${image})`,
              height: "25rem",
              width: "25rem",
              maxWidth: "100%",
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceBook;
