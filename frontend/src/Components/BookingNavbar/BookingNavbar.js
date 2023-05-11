import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.png";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = [
  "Requirements",
  "Select Provider",
  "Confirm Booking",
  "Finished",
];

function BookingNavbar({ value }) {
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    setActiveStep(value);
  }, [value]);

  console.log("props value", value);
  return (
    <div>
      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded border flex flex-row gap-9 items-center ">
        <div class=" items-center lg:w-auto md:w-full ">
          <Link to="/">
            <img src={Logo} class="h-6 ml-5 sm:h-9 hidden md:block" alt="Homey Logo" />
          </Link>
        </div>
        
          <Box sx={{ width: "100%" }}>
            <Stepper
              activeStep={activeStep}
              sx={{ maxWidth: "800px", margin: "0 auto" }}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
     
      </nav>
    </div>
  );
}

export default BookingNavbar;
