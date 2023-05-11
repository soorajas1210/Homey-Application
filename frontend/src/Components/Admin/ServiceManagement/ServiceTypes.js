import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addServiceType } from "../../../actions/adminActions";
import ServicesList from "./ServicesList";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { storage_bucket } from "../../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { afterServiceTypeSuccess } from "../../../Redux/Admin/addServiceTypeSlice";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

function ServiceTypes() {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [desc, setDesc] = useState(false);
  const [text, setText] = useState("");

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    const folderName = "service-types";
    // Code to upload the file goes here
    const fileRef = ref(storage_bucket, `${folderName}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
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
          setFileLink(downloadURL);
          setDesc(true);
        });
      }
    );
  };

  const [serviceType, setServiceType] = useState("");
  const dispatch = useDispatch();
  console.log(serviceType);
  console.log("the output", fileLink);

  const addType = useSelector((state) => state.addServiceType);
  const { loading, error, smessage } = addType;

  useEffect(() => {
    let timeout;
    if (smessage) {
      timeout = setTimeout(() => {
        dispatch(afterServiceTypeSuccess());
      }, 1000); // specify the time limit in milliseconds
    }
    return () => clearTimeout(timeout);
  }, [smessage, dispatch]);

  const addToType = async (e) => {
    e.preventDefault();
    dispatch(addServiceType(serviceType, fileLink, text));
    setDesc(false);
    setText("");
    setFile("");
    setServiceType("");
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <Box
          component="form"
          noValidate
          onSubmit={addToType}
          sx={{ minWidth: 150, width: "100%", px: 2 }}
        >
          <Card variant="outlined" sx={{ boxShadow: 3 }}>
            <React.Fragment>
              <CardContent>
                {smessage && <Alert severity="success">{smessage}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
                {loading && <CircularProgress size={60} thickness={6} />}
                <Typography variant="h5" component="div">
                  Service Types
                </Typography>

                <div className="mt-5 mb-5 flex flex-col md:flex-row gap-5">
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleFileInputChange}
                  />
                  <label htmlFor="contained-button-file">
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
                    onClick={handleUploadClick}
                    className={classes.button}
                    disabled={!file}
                  >
                    Upload
                  </Button>
                  {fileLink && (
                    <span>
                      {" "}
                      <CheckCircleTwoToneIcon /> {"uploaded"}{" "}
                    </span>
                  )}
                </div>

                <TextField
                  id="outlined-basic"
                  label="Add Service Type"
                  variant="outlined"
                  size="small"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                />
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
              <CardActions sx={{ justifyContent: "flex-end " }}>
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
      </Grid>
      <Grid item xs={12} md={6}>
        <ServicesList />
      </Grid>
    </Grid>
  );
}

export default ServiceTypes;
