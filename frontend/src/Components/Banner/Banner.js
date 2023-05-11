import React, { useEffect } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useState } from "react";
import "./Banner.css";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { locationList, sList } from "../../actions/adminActions";
import { handleServiceSearch } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
const filter = createFilterOptions();

function Banner() {
  const dispatch = useDispatch();
  const servicesList = useSelector((state) => state.searchService);
  const { services } = servicesList;

  console.log("servicesBanner", services);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(sList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(locationList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(handleServiceSearch());
  }, [dispatch]);

  const loc = useSelector((state) => state.locationsList);
  const { locations } = loc;

  console.log("locatios", locations);
  const countries = locations.map((loc) => loc);
  console.log("countries", countries);

  const [value, setValue] = useState(null);

  const handleOptionClick = (id) => {
    navigate(`/ServiceBook/${id} `);
    console.log(id);
  };

  const handleLocationChange = (event, value) => {
    console.log("Selected location:", value);
    event.preventDefault();
    if (value !== null) {
      const selectedId = value._id;
      console.log("Selected location ID:", selectedId);
      dispatch(handleServiceSearch(selectedId));
    }
  };

  return (
    <div className="  banner justify-center ">
      <div className="fade_bottom flex  flex-col justify-center gap-5">
        <div className="font-bold text-5xl space-x-5 text-rose-100 ">
          {"   Home services, on demand. "}
        </div>
        <div className="justify-center gap-5 lg:flex mt-5 md:items-center ">
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              justifyItems: "center",
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Autocomplete
              id="country"
              item
              sx={{
                width: "40vh",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.location}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a Location"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
              onChange={handleLocationChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              sx={{
                width: { xs: "100%", md: "70vh" },
                backgroundColor: "white",
                borderRadius: "5px",
                mb: 2,
              }}
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setValue({
                    serviceName: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setValue({
                    serviceName: newValue.inputValue,
                  });
                } else {
                  setValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                if (options.length === 0) {
                  return options;
                }

                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.serviceName
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    serviceName: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={services}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.serviceName;
              }}
              renderOption={(props, option) => (
                <li {...props} onClick={() => handleOptionClick(option._id)}>
                  {option.serviceName}
                </li>
                // <li {...props}>{option.serviceName}</li>
              )}
              freeSolo
              forcePopupIcon={true}
              popupIcon={<SearchIcon />}
              renderInput={(params) => (
                <TextField {...params} label="Search for services" />
              )}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Banner;
