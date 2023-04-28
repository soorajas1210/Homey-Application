const mongoose = require("mongoose");

const paymentSuccessSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  bookedId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Booked",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  providerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Provider",
  },
  invoiceId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Invoice",
  },
});

const Payment = mongoose.model("Payment", paymentSuccessSchema);

module.exports = Payment;
