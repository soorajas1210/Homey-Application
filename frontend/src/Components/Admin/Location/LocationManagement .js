import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLocation, locationList, newLocation } from "../../../actions/adminActions";
import { Button, Card, TextField } from "@mui/material";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function LocationManagement() {
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

  const handleDelete = (locId) => {
    console.log(locId);
    dispatch(deleteLocation(locId))
  };

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
            <List>
              {locations.map((item) => (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(item._id)}
                    >
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
