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
import Logo from "./Logo.png";
import "./Users.css";
import { Link, useNavigate } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/alert";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { BsFillShieldLockFill} from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/userActions";
import { userRegistered } from "../../Redux/Users/UserSignupSlice";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  palette: {
    green: createColor("#0d7a5f"),
  },
});
function SignUp() {
  const [checked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [counter, setCounter] = useState(0);
  const [otp, setOtp] = useState("");
  const [otploading, setOtpLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  // validate
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileNoError, setMobileNoError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstNameError(value.trim() === "" || value.trim().length <= 2);
        break;
      case "lastName":
        setLastNameError(value.trim() === "");
        break;
      case "email":
        setEmailError(value.trim() === "" || !/\S+@\S+\.\S+/.test(value));
        break;
      case "mobile":
        setMobileNoError(value.trim() === "" || value.trim().length !== 10);
        break;
      case "password":
        setPasswordError(value.trim() === "");
        break;
      case "confirmPassword":
        setConfirmPasswordError(value.trim() !== password);
        break;
      default:
        break;
    }
  };

  const userSignup = useSelector((state) => state.userSignup);

  const { loading, error, registered, smessage } = userSignup;

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (registered) {
      navigate("/signin");
      dispatch(userRegistered());
    }
  }, [registered, dispatch, navigate]);

  // OTP VERIFY
  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          onSignUp();
        },
        "expired-callback": () => {},
      },
      auth
    );
  }

  function onSignUp(event) {
    event.preventDefault();
    if (checked) {
      setCounter(60);
      setOtpLoading(true);
      onCaptchVerify();
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = "+91" + mobileno;

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setOtpLoading(false);
          setShowOTP(true);
          toast.success("OTP Sended Successfully");
        })
        .catch((error) => {
          console.log(error);
          setOtpLoading(false);
        });
    } else {
      toast("please check the box ✔️", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  function onOTPVerify() {
    setOtpLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setShowOTP(false);

        handleSubmit();
        setOtpLoading(false);
      })
      .className((err) => {
        console.log(err);
        setOtpLoading(false);
        toast.error("This is an error!");
      });
  }

  // SUBMIT HANDLER
  const handleSubmit = async () => {
    if (password !== confirmpassword) {
      setMessage("Password Do Not Match");
    } else {
      setMessage(null);
      console.log("handle");
      dispatch(signup(firstName, lastName, email, mobileno, password));
    }
  };

  return (
    <div className="image">
      {showOTP ? (
        <div>
          <section className="bg-transparent flex items-center justify-center h-screen rounded-xl">
            <div>
              <div id="recaptcha-container"></div>

              <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>

                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {otploading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </div>
              {/* resendotp */}
              <div className="text-green-200 ml-5 ">
                {counter === 0 ? (
                  <button className="text-blue-600" onClick={onSignUp}>
                    Resend OTP
                  </button>
                ) : (
                  <div>{`OTP will expire in ${counter} seconds`}</div>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs" className="container">
            <CssBaseline />
            <div id="recaptcha-container"></div>
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
              {message && <Alert severity="warning">{message}</Alert>}
              {smessage && <Alert severity="success">{smessage}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
              {loading && <CircularProgress size={60} thickness={6} />}
              <Typography component="h1" variant="h5" marginTop={5}>
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={onSignUp}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={firstName}
                      onBlur={handleBlur}
                      onChange={(e) => setFirstName(e.target.value)}
                      error={firstNameError}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={lastName}
                      onBlur={handleBlur}
                      onChange={(e) => setLastName(e.target.value)}
                      error={lastNameError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onBlur={handleBlur}
                      onChange={(e) => setEmail(e.target.value)}
                      error={emailError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile Number"
                      name="mobile"
                      autoComplete="mobileno"
                      value={mobileno}
                      onBlur={handleBlur}
                      onChange={(e) => setMobileno(e.target.value)}
                      error={mobileNoError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={password}
                      onBlur={handleBlur}
                      onChange={(e) => setPassword(e.target.value)}
                      error={passwordError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      value={confirmpassword}
                      onBlur={handleBlur}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={confirmPasswordError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          value="allowExtraEmails"
                          color="primary"
                          checked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                        />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="green"
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <h1>Already have an account?</h1>
                    <Link to="/signin" variant="body2">
                      <span className="text-green-800 text-lg"> Sign in</span>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}

export default SignUp;
