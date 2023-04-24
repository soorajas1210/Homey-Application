import React, { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { format } from "date-fns";

import { Box, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SideBox(props) {
  const dispatch = useDispatch();
  // const [date, setDate] = useState(null);

  // const [taskTime, setTaskTime] = useState(null);

  // useEffect(()=>{
  //   // dispatch(timeAndDate(date,taskTime))
  //   props.onSubmit(date,taskTime)
  //   props.onSubmit(taskTime);
  // },[date,taskTime,dispatch,props])

  return (
    <div className="  border-4 w-1/3  mt-16 top-2 ml-28 rounded-lg h-full divide-y divide-dotted divide-teal-800 ">
      <div>
        <h1 className="p-2 text-pink-800">Date</h1>

        <div className=" flex justify-center">
          <Box>
            <Typography variant="" h5 color="secondary" align="center">
              <DatePicker
                label="Select date"
                dateFormat="dd-MM-yyyy"
                selected={props.date}
                onChange={(newValue) => props.changeDate(newValue)}
                minDate={new Date()}
                showYearDropdown
              />
            </Typography>
          </Box>
        </div>
      </div>
      <div className="mt-5  ">
        <h1 className="p-2  text-pink-800">Time of the Day</h1>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
              display: "flex",
              flexDirection: "row",
              mx: 3,
            }}
            value={props.taskTime}
            onChange={(e) => props.changeTaskTime(e.target.value)}
          >
            <FormControlLabel
              value="Morning"
              control={<Radio />}
              label="Morning (8:00 - 12:00)"
            />
            <FormControlLabel
              value="Afternoon"
              control={<Radio />}
              label="Afternoon (12:00 - 05:00)"
            />
            <FormControlLabel
              value="Evening"
              control={<Radio />}
              label="Evening (05:00 - 09:30)"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="mt-5">
        <h1 className="p-2  text-pink-800"> Price </h1>
        <div className=" px-5 mt-5 ">
          <Slider
            color="secondary"
            aria-label="Price"
            defaultValue={300}
            step={100}
            min={100}
            max={1000}
            // marks={mark}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
    </div>
  );
}

export default SideBox;
