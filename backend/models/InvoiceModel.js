const mongoose = require('mongoose')

const InvoiceSchema = mongoose.Schema(
  {
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
    email: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    workHours: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports =  Invoice;