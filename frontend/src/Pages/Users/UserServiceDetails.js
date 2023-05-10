import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
  Stepper,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Invoice, bookedServiceDetails } from "../../actions/servicesActions";
import { checkInvoice, createChat } from "../../actions/userActions";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  box: {
    display: "inline-block",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  confirmed: {
    backgroundColor: theme.palette.success.main,
  },
  pending: {
    backgroundColor: theme.palette.warning.main,
  },
  cancelled: {
    backgroundColor: theme.palette.error.main,
  },
  unknown: {
    backgroundColor: theme.palette.info.main,
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: "50%",
    width: "64px",
    height: "64px",
    backgroundColor: "#4caf50",
    color: theme.palette.getContrastText("#4caf50"),
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
}));

function UserServiceDetails() {
  const navigate = useNavigate();
  const classes = useStyles();
  let color;
  let text;
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(bookedServiceDetails(id));
  }, [dispatch, id]);
  const details = useSelector((state) => state.providerBookedDetails);
  const { providerBookedDetails } = details;

  const senderId = providerBookedDetails?.userId._id;
  const receiverId = providerBookedDetails?.providerId.userId;
  const serviceId = providerBookedDetails?._id;

  switch (providerBookedDetails?.status) {
    case "Accepted":
      color = classes.confirmed;
      text = "Confirmed";
      break;
    case "forPayment":
      color = classes.pending;
      text = "Pay Amount";
      break;
    case "cancelled":
      color = classes.cancelled;
      text = "Cancelled";
      break;
    default:
      color = classes.unknown;
      text = "Unknown";
      break;
  }

  useEffect(() => {
    dispatch(checkInvoice(id));
  }, [id, dispatch]);

  const newInvoice = useSelector((state) => state.getInvoice);
  const { invoice } = newInvoice;

  const toPayment = () => {
    navigate(`/payment/${id}`);
  };

  const activeChat = () => {
    dispatch(createChat(senderId, receiverId, serviceId));
    navigate(`/user/chat/${providerBookedDetails?._id}`);
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box padding={3} sx={{ mt: 5 }}>
          <Grid container direction="column" spacing={3}>
            <Grid
              item
              sx={{
                display: "flex",
                justifyItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                gutterBottom
                className="font-bold text-green-900"
              >
                Booking Details
              </Typography>
            </Grid>
            <Grid sx={{ display: "flex", gap: 2 }}>
              <div style={{ flexGrow: 1 }}></div>

              {providerBookedDetails?.chat === "Active" ? (
                <Link to={`/user/chat/${providerBookedDetails?._id}`}>
                  <Button variant="contained" className={classes.button}>
                    <ChatIcon />
                  </Button>
                </Link>
              ) : (
                <Button variant="contained" onClick={activeChat}>
                  Click To Chat
                </Button>
              )}
            </Grid>
            <Grid item>
              <Paper>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">
                      Service Type:{" "}
                      <strong>
                        {providerBookedDetails?.serviceId.serviceName}
                      </strong>
                    </Typography>
                    <Typography variant="subtitle1">
                      Booking Date:{" "}
                      <strong>{providerBookedDetails?.serviceDate}</strong>
                    </Typography>
                    <Typography variant="subtitle1">
                      Booking Time:{" "}
                      <strong>{providerBookedDetails?.serviceTime}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1">
                      Service Provider Name:{" "}
                      <strong>
                        {providerBookedDetails?.userId.firstName +
                          " " +
                          providerBookedDetails?.userId.lastName}
                      </strong>
                    </Typography>
                    <Typography variant="subtitle1">
                      Service Provider Email:{""}
                      <strong>
                        <a href="providerBookedDetails.email">
                          {providerBookedDetails?.email}
                        </a>
                      </strong>
                    </Typography>
                    <Typography variant="subtitle1">
                      Service Provider Phone:{" "}
                      <strong>
                        {providerBookedDetails?.providerId.phoneNumber}
                      </strong>
                    </Typography>
                    <Typography variant="subtitle1">
                      Service Provider Address:{" "}
                      <strong>
                        {providerBookedDetails?.providerId.streetAddress +
                          ", " +
                          providerBookedDetails?.providerId.city +
                          ", " +
                          providerBookedDetails?.providerId.state}
                      </strong>
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item sx={{ display: "flex", gap: 2 }}>
              {/* <Button variant="contained" color="primary" aria-label="Accept">
                Completed
              </Button> */}
              <Button variant="contained" color="secondary" aria-label="Reject">
                Cancel
              </Button>

              <div style={{ flexGrow: 1 }}></div>
              <Box className={`${classes.box} ${color}`}>{text}</Box>
            </Grid>
          </Grid>
        </Box>
        {invoice?.status === "active" && (
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ color: "#3f51b5", fontWeight: 600 }}
            >
              Invoice Details
            </Typography>
            <Box sx={{ mb: 2, mt: 5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Date:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(invoice?.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Customer Name:
                  </Typography>
                  <Typography variant="body1">
                    {invoice?.userId.firstName + " " + invoice?.userId.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Service Type:
                  </Typography>
                  <Typography variant="body1">
                    {invoice?.serviceType}
                  </Typography>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Service Charge Per Hour:
                </Typography>
                <Typography variant="body1">
                  ${"serviceChargePerHour"}
                </Typography>
              </Grid> */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Total Work Hours:
                  </Typography>
                  <Typography variant="body1">{invoice?.workHours}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Total Amount:
                  </Typography>
                  <Typography variant="body1">₹{invoice?.amount}</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}></div>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                sx={{ borderRadius: 25, mt: 5 }}
                onClick={toPayment}
              >
                <Typography variant="button" sx={{ fontWeight: 600, mr: 1 }}>
                  Go to payment
                </Typography>
              </Button>
            </Box>
          </Box>
        )}
      </ThemeProvider>
      <Footer />
    </>
  );
}

export default UserServiceDetails;
