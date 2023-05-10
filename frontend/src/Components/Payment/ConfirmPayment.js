import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CurrencyFormat from "react-currency-format";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { bookedServiceDetails } from "../../actions/servicesActions";
import {
  checkInvoice,
  checkoutService,
  paymentSuccess,
} from "../../actions/userActions";

function ConfirmPayment() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    dispatch(checkInvoice(id));
  }, [id, dispatch]);

  const newInvoice = useSelector((state) => state.getInvoice);
  const { invoice } = newInvoice;

  useEffect(() => {
    dispatch(bookedServiceDetails(id));
  }, [dispatch, id]);
  const details = useSelector((state) => state.providerBookedDetails);
  const { providerBookedDetails } = details;

  const bookedId = providerBookedDetails?._id;
  const userId = providerBookedDetails?.userId._id;
  const providerId = providerBookedDetails?.providerId._id;
  const invoiceId = invoice?._id;

  const [product] = useState({
    name:
      providerBookedDetails?.userId.firstName +
      " " +
      providerBookedDetails?.userId.lastName,

    amount: parseFloat(invoice?.amount),
  });

  const newData = {
    firstName,
    lastName,
    streetAddress,
    city,
    state,
    country,
    pin,
    phoneNumber,
    bookedId,
    userId,
    providerId,
    invoiceId,
  };

  // payment
  const elements = useElements();
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState("");
  const [pay, setPay] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(checkoutService(product));
  }, [dispatch, product]);

  const secrete = useSelector((state) => state.clientSecrete);
  const { secreteKey } = secrete;

  useEffect(() => {
    setClientSecret(secreteKey);
  }, [secreteKey]);

  const detailsCheck = (e) => {
    e.preventDefault();
    setPay(true);
  };

  const confirm = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Disable submit button

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        console.log("payment successful");
        dispatch(paymentSuccess(newData));
        toast.success("👍 Payment Successful!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => console.warn(error));
    setSubmitting(false); // Re-enable submit button
  };

  return (
    <Container>
      <Box>
        <ReviewContainer>
          <Typography
            variant="h3"
            gutterBottom
            className="font-bold text-green-900 flex justify-center "
          >
            Confirm Payment
          </Typography>

          <Box component="form" onSubmit={detailsCheck}>
            {/* <div>
                <p>
                  {providerBookedDetails?.firstName +
                    " " +
                    providerBookedDetails?.lastName}
                </p>
                <p>{providerBookedDetails?.city}</p>
                <p>{providerBookedDetails?.state}</p>
                <p>{providerBookedDetails?.country}</p>

                <p>Phone: {providerBookedDetails?.phoneNumber}</p>
              </div> */}

            <Grid item bgcolor="#f9f9f9" padding={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="PIN code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Mobile Number"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                    maxLength="10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="outlined" color="secondary" type="submit">
                {" "}
                Submit{" "}
              </Button>
            </Box>
          </Box>
        </ReviewContainer>

        {pay && (
          <>
            <Box sx={{ display: "inline-grid", mt: 5, gap: 4 }}>
              <Typography sx={{ fontSize: 30 }}>
                Payment Method : Card
              </Typography>

              <Typography>Card Details</Typography>

              <CardElement />
            </Box>
            <Subtotal>
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <p>
                      Subtotal :{" "}
                      <strong>
                        {" "}
                        <span>{"₹ "}</span> {product.amount}
                      </strong>
                    </p>
                  </>
                )}
                decimalScale={2}
                value={product.amount}
                displayType="text"
                thousandSeparator={true}
                prefix={"₹ "}
              />
              <Button
                disabled={submitting}
                variant="outlined"
                sx={{ fontWeight: 1000 }}
                onClick={confirm}
              >
                Pay Now
              </Button>
            </Subtotal>
          </>
        )}
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={4000}
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
  );
}

const ReviewContainer = styled.div`
  background-color: #fff;
  flex: 0.7;
  padding: 15px;
  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
  }
`;

const Subtotal = styled.div`
  flex: 0.3;
  background-color: #fff;
  margin-left: 15px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
  }
  p {
    font-size: 20px;
  }
  small {
    display: flex;
    align-items: center;
    margin-top: 10px;
    span {
      margin-left: 10px;
    }
  }
  button {
    width: 65%;
    height: 33px;
    margin-top: 20px;
    background-color: #ffd814;
    border: none;
    outline: none;
    border-radius: 8px;
  }
`;

export default ConfirmPayment;
