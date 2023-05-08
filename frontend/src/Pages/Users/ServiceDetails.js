import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingNavbar from "../../Components/BookingNavbar/BookingNavbar";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { locationList } from "../../actions/adminActions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { searchProvider } from "../../actions/userActions";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loc = useSelector((state) => state.locationsList);
  const { locations } = loc;
  const [location, setLocation] = useState("");
  const [taskSize, setTaskSize] = useState(null);
  const [details, setDetails] = useState("");

  useEffect(() => {
    dispatch(locationList());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchProvider(id, location, taskSize, details));
    navigate("/book/recommendations");
  };
  return (
    <div>
      <BookingNavbar />
      <div className="text-center font-medium mt-5">
        <h1>
          Tell us about your task. We use these details to show Taskers in your
          area who fit your needs.
        </h1>
      </div>
      {/* <form onSubmit={submitHandler}>
        <div className="items-center flex flex-col gap-5 mt-5">
          <div className="border border-zinc-700 w-1/2 rounded-sm h-28  ">
            <h1 className="text-gray-600 mt-5 ml-5 ">Your Task Location:-</h1>
            <FormControl fullWidth sx={{ px: 3 }}>
              <Select
                required
                id="demo-simple-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <MenuItem key={location._id} value={location.location}>
                    {location.location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="border border-zinc-700 w-1/2 rounded-sm h-40">
            <h1 className="text-gray-600 mt-5 ml-5">Task Options:-</h1>

            <h3 class="mb-4 mt-2 ml-5 font-semibold text-gray-800 ">
              Task Size
            </h3>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ mx: 3 }}
              value={taskSize}
              onChange={(e) => setTaskSize(e.target.value)}
            >
              <FormControlLabel
                value="small"
                control={<Radio />}
                label="Small - Est. 1 hr"
              />
              <FormControlLabel
                value="medium"
                control={<Radio />}
                label=" Medium - Est. 2-3 hrs"
              />
              <FormControlLabel
                value="large"
                control={<Radio />}
                label=" Large - Est. 4+ hrs"
              />
            </RadioGroup>
          </div>
          <div className="border border-zinc-700 w-1/2 rounded-sm h-auto">
            <h1 className="text-gray-600 mt-5 ml-5">
              Tell us the details of your task:-
            </h1>
            <br />
            <p className="ml-5">
              Start the conversation and tell your Tasker what you need done.
              This helps us show you only qualified and available Taskers for
              the job. Don't worry, you can edit this later.
            </p>
            <TextField
              required
              multiline
              minRows={6}
              sx={{ width: "100%", px: 3 }}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></TextField>

            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              sx={{ m: 5 }}
            >
              Continue
            </Button>
          </div>
        </div>
      </form> */}

      <Container maxWidth="sm">
        <form onSubmit={submitHandler}>
          <div className="items-center flex flex-col gap-5 mt-5">
            <div className="border border-zinc-700 w-full rounded-sm py-5 px-3">
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your Task Location:
              </Typography>
              <FormControl fullWidth>
                <Select
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations.map((location) => (
                    <MenuItem key={location._id} value={location.location}>
                      {location.location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="border border-zinc-700 w-full rounded-sm py-5 px-3">
              <Typography variant="h6" sx={{ mb: 2 }}>
                Task Options:
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Task Size
              </Typography>
              <RadioGroup
                row
                aria-label="taskSize"
                name="taskSize"
                value={taskSize}
                onChange={(e) => setTaskSize(e.target.value)}
              >
                <FormControlLabel
                  value="small"
                  control={<Radio />}
                  label="Small - Est. 1 hr"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium - Est. 2-3 hrs"
                />
                <FormControlLabel
                  value="large"
                  control={<Radio />}
                  label="Large - Est. 4+ hrs"
                />
              </RadioGroup>
            </div>
            <div className="border border-zinc-700 w-full rounded-sm py-5 px-3">
              <Typography variant="h6" sx={{ mb: 2 }}>
                Tell us the details of your task:
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Start the conversation and tell your Tasker what you need done.
                This helps us show you only qualified and available Taskers for
                the job. Don't worry, you can edit this later.
              </Typography>
              <TextField
                required
                multiline
                minRows={6}
                sx={{ width: "100%", mb: 2 }}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  sx={{
                    bgcolor: "#004C00",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#519451",
                    },
                  }}
                >
                  Continue
                </Button>
              </Box>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default ServiceDetails;
