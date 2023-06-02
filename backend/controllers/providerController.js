const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const Provider = require("../models/serviceProviderModel");
const User = require("../models/userModel");
const Service = require("../models/servicesModel");
const Booked = require("../models/completedBookingModel");
const Invoice = require("../models/InvoiceModel");

const toVerify = asyncHandler(async (req, res) => {
  try {

    const { myValue, body } = req;

    if (!myValue) {
      throw new Error("No user ID provided");
    }

    const myId = myValue.toString();

    const {
      workLocation,
      serviceCategory,
      serviceCharge,
      workHours,
      experience,
      phoneNumber,
      profileImage,
      idProof,
      country,
      streetAddress,
      city,
      state,
      pin,
    } = body;

    const result = await cloudinary.uploader.upload(profileImage, {
      folder: "providerProfileFolder",
      width: 200,
      crop: "scale",
    });
    const idResult = await cloudinary.uploader.upload(idProof, {
      folder: "idProofFolder",
      width: 300,
      crop: "scale",
    });

    const userData = await User.findById(myId);
    if (userData.role === "provider") {
      res.status(400).json({ message: "You are a service provider" });
      return;
    }
    if (userData.role !== "user") {
      res.status(400).json({ message: "Invalid user role" });
      return;
    }

    if (userData.role === "user") {
      const provider = await Provider.create({
        userId: myId,
        workLocation,
        serviceCategory,
        serviceCharge,
        workHours,
        experience,
        phoneNumber,
        profileImage: {
          url: result.secure_url,
          public_id: result.public_id,
        },
        idProof: {
          url: idResult.secure_url,
          public_id: idResult.public_id,
        },
        country,
        streetAddress,
        city,
        state,
        pin,
      });
      if (provider) {

        await User.updateOne({ _id: myId }, { $set: { role: "toVerify" } });
        res.status(201).json({
          userId: myId,
          _id: provider._id,
          workLocation: provider.workLocation,
          serviceCategory: provider.serviceCategory,
          serviceCharge: provider.serviceCharge,
          workHours: provider.workHours,
          experience: provider.experience,
          phoneNumber: provider.phoneNumber,
          profileImage: provider.profileImage,
          idProof: provider.idProof,
          country: provider.country,
          streetAddress: provider.streetAddress,
          city: provider.city,
          state: provider.state,
          pin: provider.pin,
          role: provider.role,
        });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const toVerifyList = asyncHandler(async (req, res) => {
  try {
    const allUserData = [];
    const usersToVerify = await User.find({ role: "toVerify" });

    if (usersToVerify.length > 0) {
      for (let i = 0; i < usersToVerify.length; i++) {
        const user = usersToVerify[i];
        const providerData = await Provider.find({ userId: user._id });

        if (providerData.length > 0) {
          allUserData.push({
            ...user.toObject(),
            ...providerData[0].toObject(),
          });
        } else {
          allUserData.push(user.toObject());
        }
      }
    } else {
      res.status(400).send("No users found with role 'toVerify'");
    }

    res.json(allUserData);
  } catch (error) {
    res.status(400).send("Error Occurred!");
  }
});

const providerInfo = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    if (id) {
      const provider = await Provider.findById(id).populate("userId");
      res.status(200).json(provider);
    }
  } catch (error) {
    throw new Error("No data found!");
  }
});

const providerBookingHandler = asyncHandler(async (req, res) => {
  try {
    const { body } = req;
    const { id, status } = body;

    const bookingData = await Booked.findById(id);
    const pid = bookingData.providerId;
    const newPid = pid.toString();

      const newBooking = {
      date: bookingData.serviceDate,
      time: bookingData.serviceTime,
    };

    if (bookingData) {
      if (status === "Accepted") {
        const updatedData = await Booked.updateOne(
          { _id: id },
          { $set: { status: "Accepted" } }
        );
        Provider.updateOne(
          {
            _id: newPid,
          },
          { $push: { bookings: newBooking } },
          { upsert: true, new: true }
        )
          .then((updated) => {
            console.log("Provider document updated successfully:", updated);
          })
          .catch((err) => {
            console.log("Error in the operation:", err);
          });

        res.status(200).json(updatedData);
      } else if (status === "Rejected") {
        const updatedData = await Booked.updateOne(
          { _id: id },
          { $set: { status: "Rejected" } }
        );
        res.status(200).json(updatedData);
      } else {

        res.status(400).send("Invalid status value!");
      }
    }
  } catch (error) {
    res.status(400).send("Error Occurred!");
  }
});

const bookedServiceDetails = asyncHandler(async (req, res) => {
  try {
    const serviceDetails = await Booked.findById(req.params.id)
      .populate("userId")
      .populate("serviceId")
      .populate("providerId");

    if (serviceDetails) {
      res.status(200).json(serviceDetails);
    } else {
      res.status(400).send("no service details found!");
    }
  } catch (error) {
    res.status(400).send("Error Occurred!");
  }
});

const sendInvoice = asyncHandler(async (req, res) => {
  try {
    const { newData } = req.body;

    const invoiceData = Invoice.create({
      bookedId: newData.bookedId,
      userId: newData.userId,
      providerId: newData.providerId,
      email: newData.email,
      serviceType: newData.serviceType,
      amount: newData.amount,
      workHours: newData.workHours,
      description: newData.description,
    });

    if (invoiceData) {
      await Booked.updateOne(
        { _id: newData.bookedId },
        { $set: { status: "forPayment" } }
      );

      res.status(200).send(invoiceData);
    } else {
      res.status(404).send("Invoice not Send");
    }
  } catch (error) {
    res.status(400).send("Error Occurred!");
  }
});

const providerChat = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

module.exports = {
  toVerify,
  toVerifyList,
  providerBookingHandler,
  bookedServiceDetails,
  sendInvoice,
  providerChat,
  providerInfo,
};
