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
    <Box sx={{ p: 3 }}>
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Add Service Locations:
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={addLocation}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              id="loaction"
              label="Type here..."
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              sx={{ alignSelf: "flex-end", mt: 1 }}
            >
              Add
            </Button>
          </Box>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Locations
              </Typography>
              <Demo>
                <List sx={{ maxHeight: "300px", overflow: "auto" }}>
                  {locations.map((item) => (
                    <ListItem
                      key={item._id}
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
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}

export default LocationManagement;
