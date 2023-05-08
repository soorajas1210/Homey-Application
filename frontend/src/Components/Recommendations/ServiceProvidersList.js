import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

function ServiceProvidersList(props) {
  return (
    // <div className="flex border border-gray-700 rounded-lg w-4/6 m-10 p-6 gap-4 h-128 ">
    //   <div className="w-1/3 mt-5   ">
    //     <img
    //       class=" object-center w-40 h-40 rounded-full"
    //       src={props.provider.profileImage.url}
    //       alt=""
    //     ></img>
    //     <div className="object-right ">
    //       <button
    //         onClick={() => props.providerSelected(props.provider._id)}
    //         class=" mt-5  hover:bg-green-700 text-green-800 font-semibold hover:text-white py-2 px-4 border border-green-600 hover:border-transparent rounded"
    //       >
    //         Select & Continue:
    //       </button>

    //       <p className="text-xs  mt-3 text-justify ">
    //         You can chat with your Tasker, adjust task details, or change task
    //         time after booking.
    //       </p>
    //     </div>
    //   </div>
    //   <div className=" relative w-2/3 divide-y divide-slate-700  ">
    //     <div className="  flex flex-grid h-1/3  ">
    //       <h1 className="font-bold text-2xl text-left text-gray-700">
    //         {props.provider.firstName + " " + props.provider.lastName}
    //       </h1>

    //       <h1 className="font-bold text-2xl absolute inset-y-0 right-0 text-gray-700 ">
    //         {"₹" + props.provider.serviceCharge + " /hr"}
    //       </h1>
    //       <h2 className=" text-sm absolute mt-9 left-0 ">Vehicle: Car</h2>
    //     </div>
    //     <div className=" absolute inset-x-0 h-2/3 space-x-2 py-5 ">
    //       <p>
    //         {" "}
    //         <span className="text-gray-700 font-extrabold space-x-2 text-lg ">
    //           How I can help:
    //         </span>{" "}
    //         <p>{props.provider.experience}</p>
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <Paper
      elevation={3}
      className="p-6"
      style={{ maxWidth: "800px", marginTop: "10px" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <img
            src={props.provider.profileImage.url}
            alt=""
            className="w-36 h-36 rounded-full object-center"
          />
          <div className="object-right mt-5 md:mt-4">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#004C00",
                color: "white",
                "&:hover": {
                  bgcolor: "#519451",
                },
              }}
              onClick={() => props.providerSelected(props.provider._id)}
            >
              Select & Continue:
            </Button>
            <Typography variant="body2" className=" py-4 text-justify">
              You can chat with your Tasker, adjust task details, or change task
              time after booking.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" className="text-gray-700 font-bold">
                {props.provider.firstName} {props.provider.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                className="text-right text-gray-700 font-bold"
              >
                {"₹" + props.provider.serviceCharge + " /hr"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                className="text-gray-700 font-extrabold"
              >
                How I can help:
              </Typography>
              <Typography variant="body2">
                {props.provider.experience}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ServiceProvidersList;
