import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../actions/helper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup(props) {
  const id = props.provider._id;

  const [review, setReview] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        console.log("review");

        const { data } = await axios.get(
          `${BASE_URL}/api/users/providerReview/${id}`,
          config
        );
        setReview(data);
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        console.log(message);
      }
    };

    fetchData();
  }, [id, props]);

  const reviewdate = (data) => {
  return new Date(data).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div>
      <Dialog
        open={props.value}
        TransitionComponent={Transition}
        keepMounted
        onClose={(e) => props.open(false)}
        sx={{ borderRadius: "50%" }}
      >
        <DialogTitle
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 5,
          }}
        >
          Service Provider Details
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                display: "flex",
                maxWidth: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <img
                src={props.provider.profileImage.url}
                alt=""
                style={{
                  width: "35%",
                  height: "auto",
                  borderRadius: "10%",
                  objectFit: "cover",
                }}
              />
              <Typography variant="h3" sx={{ mb: 2 }}>
                {props.provider.firstName} {props.provider.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography
                variant="h6"
                className="text-right text-gray-700 font-bold"
              >
                {props.provider.serviceCategory}
              </Typography>
              <Typography
                variant="h6"
                className="text-right text-gray-700 font-bold"
              >
                {"₹" + props.provider.serviceCharge + " /hr"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ m: 2, display: "flex", width: "100%" }}
              >
                <ol
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    listStyleType: "none",
                    padding: 0,
                  }}
                >
                  <li>
                    <strong> 1️⃣Select your Tasker:</strong> Describe your task
                    and choose a background checked and client-reviewed Tasker
                    for the job.
                  </li>
                  <li>
                    <strong>2️⃣Schedule a time:</strong> Get your task done on
                    your time.
                  </li>
                  <li>
                    <strong>3️⃣Pay when it's done:</strong> Pay seamlessly
                    through the Homey platform only after your task is complete.
                  </li>
                </ol>
              </Typography>

              <Typography variant="h8" className="text-left ">
                <spann>
                  <strong>{"Place : "}</strong>
                </spann>
                {props.provider.streetAddress +
                  "," +
                  props.provider.workLocation +
                  "," +
                  props.provider.state}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold", my: 2 }}>
                Reviews:
              </Typography>

              {review
                ?.slice(0, 20)
                .reverse()
                .map((provider, index) => (
                  <Box
                    border={2}
                    sx={{
                      mt: 2,
                      display: "grid",
                      gap: 2,
                      padding: 2, // Adjust the padding as needed
                      backgroundColor: "#f0f0f0", // Example background color
                      borderRadius: 2, // Example border radius
                      borderColor: "gray", // Example border color
                      borderWidth: 1, // Example border width
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Example box shadow
                    }}
                  >
                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                      {" '' " + provider.review + " '' "}
                    </Typography>
                    <Typography variant="caption">
                      {" - " +
                        provider.firstName +
                        " " +
                        provider.lastName +
                        " (" +
                        reviewdate(provider.createdAt) +
                        ") "}
                    </Typography>
                  </Box>
                ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => props.open(false)}>Go back</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Popup;
