import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, List, ListItem, ListItemText, TextField } from "@mui/material";
import BookingNavbar from "../../Components/BookingNavbar/BookingNavbar";
import { useDispatch, useSelector } from "react-redux";
import { bookService, getBookingData } from "../../actions/userActions";
import { useTheme } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

function ConfirmBooking() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [booking, setBooking] = useState(false);

  const data = useSelector((state) => state.getBookingData);
  const { BookingData } = data;

  const booked = useSelector((state) => state.bookService);
  const { smessage } = booked;

  const pId = BookingData?._id;
  const sId = BookingData?.serviceId?._id;
  const serviceName = BookingData?.serviceId?.serviceName;
  const serviceSize = BookingData?.taskSize;
  const serviceTime = BookingData?.taskTime;
  const serviceLocation = BookingData?.location;
  const serviceDate = BookingData?.date;
  const serviceDetails = BookingData?.taskDetails;

  const newData = {
    firstName,
    lastName,
    streetAddress,
    city,
    state,
    pin,
    country,
    email,
    phoneNumber,
    pId,
    sId,
    serviceSize,
    serviceTime,
    serviceName,
    serviceLocation,
    serviceDate,
    serviceDetails,
  };

  useEffect(() => {
    if (smessage) {
      setBooking(true);
    }
  }, [dispatch, smessage]);
  useEffect(() => {
    dispatch(getBookingData());
  }, [dispatch]);

  const verifySubmit = async (e) => {
    e.preventDefault();
    dispatch(bookService(newData));
  };

  const toHome = () => {
    navigate("/");
  };
  return (
    <div>
      <BookingNavbar />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ maxWidth: "100%", px: [1, 2] }}>
          <Container component="main" maxWidth="lg" sx={{ mb: [3, 4] }}>
            {booking ? (
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  mt: 10,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ textAlign: "center", flexBasis: "100%" }}
                >
                  Thank you for your Booking.
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", flexBasis: "100%", mt: 5 }}
                >
                  Your booking has been successfully made! We have notified the
                  service provider and will keep you updated on the status of
                  your booking.
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    maxWidth: 200,
                    backgroundColor: "#b53976",
                    color: "#ffffff",
                    m: 10,
                  }}
                  onClick={toHome}
                >
                  {"Home Page"}
                </Button>
              </Paper>
            ) : (
              <Grid
                container
                component="form"
                spacing={2}
                onSubmit={verifySubmit}
              >
                <Grid item xs={12} md={6}>
                  <Paper
                    variant="outlined"
                    sx={{
                      my: { xs: 3, md: 6 },
                      p: { xs: 2, md: 3 },
                      minHeight: "600px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box noValidate>
                      <Typography component="h1" variant="h4" align="center">
                        Confirm Booking
                      </Typography>
                      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
                        Enter your Details
                      </Typography>

                      <Grid
                        container
                        item
                      
                        spacing={3}
                        sx={{ mt: 2 }}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="address"
                            name="address"
                            label="Address"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="standard"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="standard"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id="state"
                            name="state"
                            label="State/Province/Region"
                            fullWidth
                            variant="standard"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="zip"
                            name="zip"
                            label="PIN code"
                            fullWidth
                            autoComplete="shipping postal-code"
                            variant="standard"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            autoComplete="shipping country"
                            variant="standard"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="email"
                            name="email"
                            label="email"
                            fullWidth
                            type="email"
                            variant="standard"
                            maxLength=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Mobile Number"
                            fullWidth
                            autoComplete="shipping country"
                            variant="standard"
                            maxLength="10"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 7 }}>
                          <Typography
                            component="h1"
                            variant="h7"
                            align="center"
                            sx={{ color: "#5b5b5b" }}
                          >
                            {
                              "* You can pay for the service to your service provider by receiving an invoice after the work is completed."
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper
                    variant="outlined"
                    sx={{
                      my: { xs: 3, md: 6 },
                      p: { xs: 2, md: 3 },
                      minHeight: "600px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
                      Service Details
                    </Typography>

                    <List disablePadding>
                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={"Service"} />
                        <Typography variant="body2">
                          {BookingData?.serviceId?.serviceName}
                        </Typography>
                      </ListItem>

                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={"Service Size"} />
                        <Typography variant="body2">
                          {BookingData?.taskSize}
                        </Typography>
                      </ListItem>

                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={"Service Time "} />
                        <Typography variant="body2">
                          {BookingData?.taskTime}
                        </Typography>
                      </ListItem>

                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={"Location "} />
                        <Typography variant="body2">
                          {BookingData?.location}
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={"Booked Date"} />
                        <Typography variant="body2">
                          {BookingData?.date}
                        </Typography>
                      </ListItem>
                    </List>

                    <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
                      Service Provider :
                    </Typography>
                    <Card sx={{ display: "flex", mt: 5 }}>
                      <Box sx={{ display: "flex", flex: 1 }}>
                        <CardMedia
                          component="img"
                          sx={{ width: "25%", borderRadius: "50%", m: 2 }}
                          image={BookingData?.profileImage.url}
                          alt="Live from space album cover"
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            m: 2,
                          }}
                        >
                          <CardContent>
                            <Typography component="div" variant="h5">
                              {BookingData?.userId?.firstName +
                                " " +
                                BookingData?.userId?.lastName}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                            >
                              {BookingData?.city}
                            </Typography>
                            <Typography component="div" variant="h5">
                              {BookingData?.serviceCharge + " " + " ₹/hr"}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Box>
                    </Card>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 5,
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: "#004C00 " }}
                      >
                        {"Confirm"}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default ConfirmBooking;
