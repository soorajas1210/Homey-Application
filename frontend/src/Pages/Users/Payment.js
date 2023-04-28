import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ConfirmPayment from "../../Components/Payment/ConfirmPayment";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const stripePromise = loadStripe(
  "pk_test_51N0SnbSGULmMYgVw756QqtAsgMmvFvEXaQT0orK4sOkdHxRuLueST6TDxsI7OPaBgIebMIk1wqt5YQ2wpJTIsbxn00F4sQoe0p"
);

function Payment() {
  return (
    <div>
      <Navbar />
      <Elements stripe={stripePromise}>
        <ConfirmPayment />
      </Elements>
      <Footer />
    </div>
  );
}

export default Payment;
