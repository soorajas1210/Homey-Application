import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Users.css";
import { GoogleLogin } from "react-google-login";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/alert";
import { useSelector, useDispatch } from "react-redux";
import Logo from "./Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { gsignin, signin } from "../../actions/userActions";
import { gapi } from "gapi-script";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  palette: {
    green: createColor("#0d7a5f"),
  },
});
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clientId =
    "76025880735-a9nmdamlf7b7oqm2steabiu9d94j62fq.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);
  // signin with google
  const onSigninSuccess = (res) => {
    console.log("login Success", res.profileObj);
    const googleSignin = res.profileObj;
    console.log(googleSignin.email);
    gSubmit(googleSignin.email);
  };

  const onFailureSuccess = (res) => {
    console.log("login is failed", res);
  };
  const gSubmit = (gemail) => {
    dispatch(gsignin(gemail));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div className="image">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="container">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "green",
            }}
          >
            <Toolbar disableGutters>
              <Link to="/">
                <Box
                  component="img"
                  sx={{
                    height: 30,
                    width: 90,
                  }}
                  alt="Your logo."
                  src={Logo}
                />
              </Link>
            </Toolbar>
            {error && <Alert severity="error">{error}</Alert>}
            {loading && <CircularProgress size={60} thickness={6} />}
            <Typography
              marginTop={5}
              component="h1"
              variant="h5"
              color={"green"}
            >
              Sign in
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="green"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <h1>
                    Don't have an account?
                    <Link to="/signup" variant="body2">
                      <span className="text-green-800 text-lg">Sign Up</span>
                    </Link>
                  </h1>
                </Grid>
              </Grid>
              {/* <GoogleButton
                className=" mt-5  ml-14 mb-5 "
                // onClick={() => {
                //   console.log("Google button clicked");
                // }}
                onSuccess={onSigninSuccess}
                onFailure={onFailureSuccess}
                clientId={clientId}
              /> */}
              <GoogleLogin
                className=" mt-5  mb-5  ml-24 "
                clientId={clientId}
                buttonText="Signin With Google"
                onSuccess={onSigninSuccess}
                onFailure={onFailureSuccess}
                cookiePolicy={"single_host_origin"}
              />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default SignIn;
