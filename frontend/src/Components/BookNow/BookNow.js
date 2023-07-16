import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";


function BookNow(props) {
  const navigate = useNavigate();
  console.log("propsid", props.props._id);
  const viewService = (id) => {
    console.log("new props id", id);
    navigate(`/ServiceBook/${id} `);
  };
  return (
   
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="140"
        image={props.props.image}
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.props.serviceName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a wider card with supporting text below as a natural lead-in
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#004C00",
            color: "white",
            "&:hover": {
              bgcolor: "#519451",
            },
          }}
          onClick={() => viewService(props.props._id)}
          size="small"
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookNow;
