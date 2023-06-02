import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addServices, sTypeList } from "../../../actions/adminActions";
import Alert from "@material-ui/lab/alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core";
import { storage_bucket } from "../../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { afterServiceSuccess } from "../../../Redux/Admin/addServiceSlice";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

function ServicesList() {
  const classes = useStyles();
  const [image, setImage] = useState();
  const [services, setServices] = useState("");
  const [stype, setStype] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [desc, setDesc] = useState(false);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  // IMAGE UPLOAD
  const fileInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onUploadClick = () => {
    const folderName = "services";
    // Code to upload the file goes here
    const fileRef = ref(storage_bucket, `${folderName}/${image.name}`);
    const uploadTask = uploadBytesResumable(fileRef, image);
    // track progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "%done");
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(fileRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageLink(downloadURL);
          setDesc(true);
        });
      }
    );
  };

  const typeList = useSelector((state) => state.serviceTypeList);
  const { serviceType } = typeList;

  const service = useSelector((state) => state.addService);
  const { loading, error, smessage } = service;



  console.log("hello", serviceType);

  useEffect(() => {
    dispatch(sTypeList());
  }, [dispatch]);

useEffect(() => {
  let timeout;
  if (smessage) {
    timeout = setTimeout(() => {
  dispatch(afterServiceSuccess());
    }, 5000); // specify the time limit in milliseconds
  }
  return () => clearTimeout(timeout);
}, [smessage,dispatch]);

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(addServices(stype, services, imageLink, text));
    setDesc(false);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleChange}
      sx={{ minWidth: 150, width: "100%", px: { xs: 2, md: 4 }}}
    >
      <Card variant="outlined" sx={{ boxShadow: 3 }}>
        <React.Fragment>
          <CardContent>
            {smessage && <Alert severity="success">{smessage}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            {loading && <CircularProgress size={60} thickness={6} />}
            <Typography variant="h5" component="div">
              Services
            </Typography>

            {/* FILE UPLOAD */}
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { md: "center" },
                gap: { xs: 2, md: 5 },
              }}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="button-file"
                multiple
                type="file"
                onChange={fileInputChange}
              />
              <label htmlFor="button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  className={classes.button}
                >
                  Upload Image
                </Button>
              </label>
              <Button
                variant="contained"
                color="secondary"
                onClick={onUploadClick}
                className={classes.button}
                disabled={!image}
              >
                Upload
              </Button>
              {imageLink && (
                <span>
                  <CheckCircleTwoToneIcon /> {"uploaded"}
                </span>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, md: 5 },
                mt: 2,
              }}
            >
              <FormControl
                size="small"
                sx={{ minWidth: 100, width: { xs: "100%", sm: 150 } }}
              >
                <InputLabel id="demo-simple-select-helper-label">
                  Service Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={stype}
                  onChange={(e) => setStype(e.target.value)}
                >
                  {serviceType.map((type) => (
                    <MenuItem key={type.serviceType} value={type.serviceType}>
                      {type.serviceType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Add Services"
                variant="outlined"
                size="small"
                value={services}
                onChange={(e) => setServices(e.target.value)}
              />
            </Box>
            {desc && (
              <Box sx={{ mt: 5 }}>
                <TextField
                  label="Description"
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  minRows={6}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Box>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end "}}>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              sx={{ mr: { xs: 0, sm: 2 } }}
            >
              Add
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}

export default ServicesList;
