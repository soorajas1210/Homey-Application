import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";
import { providerReg } from "../../../actions/servicesActions";
import { useDispatch } from "react-redux";

function valuetext(value) {
  return `${value}°C`;
}

const theme = createTheme();

export default function ApplyVerify({ serviceCategory, workLocation }) {
  console.log(serviceCategory, workLocation);

  const [profileImage, setProfileImage] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [experience, setExperience] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idProof, setIdProof] = useState("");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");

  const dispatch = useDispatch();

  console.log(
    profileImage,
    serviceCharge,
    workHours,
    experience,
    phoneNumber,
    idProof,
    city,
    country,
    state,
    streetAddress,
    pin
  );

  const handleIdImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  const setFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIdProof(reader.result);
    };
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];

    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const readerb = new FileReader();
    readerb.readAsDataURL(file);
    readerb.onloadend = () => {
      setProfileImage(readerb.result);
    };
  };

  const verifySubmit = async (e) => {
    e.preventDefault();
    dispatch(
      providerReg(
        serviceCategory,
        workLocation,
        profileImage,
        serviceCharge,
        workHours,
        experience,
        phoneNumber,
        idProof,
        city,
        country,
        state,
        streetAddress,
        pin
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box component="form" noValidate onSubmit={verifySubmit}>
            <Typography component="h1" variant="h4" align="center">
              Service Provider Verification
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
              Enter your Details
            </Typography>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Upload Profile Picture
              </Typography>
       
              <input
                onChange={handleProfileImage}
                type="file"
                id="formupload"
                name="image"
                className="form-control"
              />
            </Grid>

            <Grid container spacing={3} sx={{ mt: 2 }}>
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
                <Typography variant="h7" gutterBottom sx={{ mt: 5 }}>
                  Fix your Price (₹)
                </Typography>

                <Slider
                  aria-label="service Price"
                  defaultValue={200}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={100}
                  max={600}
                  value={serviceCharge}
                  onChange={(e) => setServiceCharge(e.target.value)}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Upload your ID Card
              </Typography>

              <input
                onChange={handleIdImage}
                type="file"
                id="formupload"
                name="image"
                className="form-control"
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 4 }}>
              <TextField
                required
                id="experiencce"
                name="experiencce"
                label="Describe your Experiencce"
                fullWidth
                autoComplete="shipping address-line1"
                variant="outlined"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mt: 4 }}>
              <Typography variant="h7" gutterBottom sx={{ mt: 5 }}>
                How much time you can work 🕒
              </Typography>

              <Slider
                aria-label="service Rate"
                defaultValue={1}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
              />
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
              <Button type="submit" variant="contained">
                {"Submit To Verify"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
