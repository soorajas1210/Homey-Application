import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Typography } from "@mui/material";

function ServiceProvidersList(props) {
  return (
    <Paper
      elevation={3}
      className="p-6"
      style={{ maxWidth: "700px", marginTop: "10px" }}
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
