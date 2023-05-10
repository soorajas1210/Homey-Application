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
import {
  bookService,
  editUser,
  getBookingData,
} from "../../actions/userActions";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { BASE_URL } from "../../actions/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditUserProfile() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const editData = {
    firstName,
    lastName,
    streetAddress,
    city,
    state,
    pin,
    country,
    phoneNumber,
  };

  const verifySubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(editData));
  };

  const edit = useSelector((state) => state.userEdit);

  const { smessage } = edit;

  useEffect(() => {
    if (smessage) {
      toast.success(" Successfully Updated", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  },[smessage]);

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="" sx={{ mb: 4, position: "flex" }}>
        <Grid container component="form" spacing={2} onSubmit={verifySubmit}>
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                my: { xs: 3, md: 6 },
                p: { xs: 2, md: 3 },
                height: "680px",
              }}
            >
              <Box noValidate>
                <Typography component="h1" variant="h4" align="center">
                  Change Details
                </Typography>

                <Grid container spacing={3} sx={{ mt: 2 }}>
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
                  {/* <Grid item xs={12} sm={6}>
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
                  </Grid> */}

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
                </Grid>
              </Box>

              <Button
                sx={{ backgroundColor: "#004C00", mt: 10 }}
                variant="contained"
                type="submit"
              >
                {"Submit"}{" "}
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>
    </div>
  );
}

export default EditUserProfile;
