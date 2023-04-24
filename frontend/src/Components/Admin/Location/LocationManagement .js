import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationList, newLocation } from "../../../actions/adminActions";
import { Button, Card, TextField } from "@mui/material";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function LocationManagement() {
  const [dense, setDense] = useState();
  const [secondary, setSecondary] = useState();
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const addLocation = () => {
    dispatch(newLocation(location));
  };

  useEffect(() => {
    dispatch(locationList());
  }, [dispatch]);

  const loc = useSelector((state) => state.locationsList);
  const { locations } = loc;
 

  // function generate(element) {
  //   return locations.map((value) =>
  //     React.cloneElement(element, {
  //       key: value.location,
  //     })
  //   );
  // }

  return (
    <Box>
      <Card sx={{ p: 5, mx: 5 }}>
        <h1 className="text-lg mb-5 font-bold text-gray-700 ">
          Add Service Locations:
        </h1>
        <Box
          component="form"
          noValidate
          onSubmit={addLocation}
          className=" flex  flex-row gap-5"
        >
          <TextField
            id="loaction"
            label="Type here..."
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></TextField>

          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            style={{ marginRight: "20px" }}
          >
            Add
          </Button>
        </Box>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Locations
          </Typography>
          <Demo>
            <List dense={dense}>
              {locations.map((item) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <LocationOnIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.location} />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Card>
    </Box>
  );
}

export default LocationManagement;
