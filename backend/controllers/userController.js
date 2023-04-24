const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateTocken = require("../utils/generateTocken");
const Service = require("../models/servicesModel");
const ServiceCategory = require("../models/serviceCategoryModel");

const Location = require("../models/locationModel");
const Provider = require("../models/serviceProviderModel");
const Booking = require("../models/bookingModel");
const Booked = require("../models/completedBookingModel");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, mobileno, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    mobileno,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileno: user.mobileno,
      isAdmin: user.isAdmin,
      token: generateTocken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    console.log(user.isVerified);
    if (user.isVerified === true) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        pic: user.pic,
        lastName: user.lastName,
        email: user.email,
        mobileno: user.mobileno,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        token: generateTocken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Your Account Is Blocked!");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const signinWithGoogle = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      console.log(user.isVerified);
      if (user.isVerified === true) {
        res.json({
          _id: user._id,
          firstName: user.firstName,
          pic: user.pic,
          email: user.email,
          mobileno: user.mobileno,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
          token: generateTocken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Your Account Is Blocked!");
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid Email !");
  }
});

const getServiceDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    console.log("id", id);
    const data = await Service.findById(id);
    if (data) {
      res.json(data);
    } else {
      res.status(400);
      throw new Error("No Data!");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured !");
  }
});

const getCategoryDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    console.log("id", id);
    const data = await ServiceCategory.findById(id);
    if (data) {
      res.json(data);
    } else {
      res.status(400);
      throw new Error("No Data!");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured !");
  }
});

const serviceSearch = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id:", id);
    if (id === "undefined") {
      const List = await Service.find();

      return res.json(List);
    } else {
      const loc = await Location.findById(id);
      console.log("loc.location:", loc.location);

      Service.find({ locations: { $in: [loc.location] } })
        .then((services) => {
          if (services.length > 0) {
            res.json(services);
          } else {
            res.json({ message: "No services found in that location" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        });
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: "Error finding services" });
  }
});

const searchProvider = asyncHandler(async (req, res) => {
  try {
    console.log("data", req.body);
    const { myValue, body } = req;
    const myId = myValue.toString();
    const { id, location, taskSize, details } = body;

    const userExists = await Booking.findOne({ userId: myId });
    if (userExists) {
      const updatedData = await Booking.updateOne(
        { userId: myId },
        {
          $set: {
            serviceId: id,
            location: location,
            taskSize: taskSize,
            taskDetails: details,
          },
        }
      );

      res.status(200).json(updatedData);
    } else {
      const createdData = await Booking.create({
        userId: myId,
        serviceId: id,
        location: location,
        taskSize: taskSize,
        taskDetails: details,
      });
      res.status(201).json(createdData);
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: "Error finding providers" });
  }
});

const providerRecommendations = asyncHandler(async (req, res) => {
  const { myValue } = req;
  const myId = myValue.toString();
  console.log(myId);
  const sarchBookData = await Booking.findOne({ userId: myId }).populate(
    "serviceId"
  );

  console.log("serarchbook data: ", sarchBookData);

  const allUserData = [];
  const providerList = await User.find({
    role: { $in: ["provider"] },
  });

  if (providerList) {
    if (providerList.length > 0) {
      for (let i = 0; i < providerList.length; i++) {
        const provider = providerList[i];
        const providerData = await Provider.find({
          $and: [
            { userId: provider._id },
            { serviceCategory: sarchBookData.serviceId.serviceName },
            { workLocation: sarchBookData.location },
          ],
        });

        if (providerData.length > 0) {
          allUserData.push({
            ...provider.toObject(),
            ...providerData[0].toObject(),
          });
        }
        // else {
        //   allUserData.push(provider.toObject());
        // }
      }
    } else {
      console.log("No users found with role 'toVerify'");
    }
  }

  res.json(allUserData);
});

const selectedProvider = asyncHandler(async (req, res) => {
  try {
    const { myValue, body } = req;
    const myId = myValue.toString();

    const { newDate, taskTime, sProvider } = body;

    const userExists = await Booking.findOne({ userId: myId });
    if (userExists) {
      const updatedData = await Booking.updateOne(
        { userId: myId },
        {
          $set: {
            date: newDate,
            taskTime: taskTime,
            providerId: sProvider,
          },
        }
      );

      res.status(200).json(updatedData);
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: "Error" });
  }
});

const getBookingData = asyncHandler(async (req, res) => {
  try {
    const { myValue } = req;
    const myId = myValue.toString();
    const userExists = await Booking.findOne({ userId: myId });
    if (userExists) {
      const bookingData = await Booking.findOne({ userId: myId }).populate(
        "serviceId"
      );
      console.log(bookingData);

      const pId = bookingData.providerId;
      if (pId) {
        const newPid = pId.toString();
        console.log("providerId: ", newPid);
        const ProviderData = await Provider.findById(newPid).populate("userId");
        console.log("provider Data", ProviderData);

        // Combine the bookingData and ProviderData into a single object
        const mergedData = {
          ...bookingData.toObject(),
          ...ProviderData.toObject(),
        };

        console.log("merged Data", mergedData);
        res.status(200).json(mergedData);
      }
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: "Error" });
  }
});

const bookService = asyncHandler(async (req, res) => {
  try {
    const { myValue, body } = req;

    const myId = myValue.toString();

    const { newData } = body;

    console.log(newData);

    const bookedData = await Booked.create({
      userId: myId,
      serviceId: newData.sId,
      providerId: newData.pId,
      firstName: newData.firstName,
      lastName: newData.lastName,
      streetAddress: newData.streetAddress,
      city: newData.city,
      state: newData.state,
      pin: newData.pin,
      country: newData.country,
      email: newData.email,
      phoneNumber: newData.phoneNumber,
      serviceSize: newData.serviceSize,
      serviceTime: newData.serviceTime,
      serviceName: newData.serviceName,
      serviceLocation: newData.serviceLocation,
      serviceDate: newData.serviceDate,
      serviceDetails: newData.serviceDetails,
    });

    if (bookedData) {
      res.status(200).json(bookedData);
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: "Error" });
  }
});

const userbookedList = asyncHandler(async (req, res) => {
  try {
    const { myValue } = req;

    const myId = myValue.toString();

    const allBookingData = [];
    const BookingList = await Booked.find({ userId: myId });

    if (BookingList) {
      if (BookingList.length > 0) {
        for (let i = 0; i < BookingList.length; i++) {
          const provider = BookingList[i];
          const providerData = await Provider.find({
            _id: provider.providerId,
          }).populate("userId");

          if (providerData.length > 0) {
            allBookingData.push({
              ...provider.toObject(),
              ...providerData[0].toObject(),
            });
          } else {
            allBookingData.push(provider.toObject());
          }
        }
      } else {
        console.log("No users found with role 'toVerify'");
      }
    }

    res.json(allBookingData);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: "No Booking data found" });
  }
});

const getUserInfo = asyncHandler(async (req, res) => {
  try {
    const { myValue } = req;
    const myId = myValue.toString();
    console.log("myId", myId);

    const userData = await User.findById(myId);
    console.log("userInfo:", userData);
    if (userData.role !== "provider") {
      res.status(200).json(userData);
    }
    if (userData.role === "provider") {
      const pData = await Provider.find({ userId: myId });
      const mergedData = {
        ...userData.toObject(),
        ...pData[0].toObject(),
      };

      res.status(200).json(mergedData);
    }
  } catch (error) {
    console.log("error:", error);
    throw new Error("No data found!");
  }
});

const providerbookedList = asyncHandler(async (req, res) => {
  try {
    const { myValue } = req;
    const myId = myValue.toString();
    console.log("inside providerbookedList", myId);
    const providerId = await Provider.findOne({ userId: myId });
    console.log("providerId", providerId);

    const pId = providerId._id;
    console.log("providerId", pId);
    const newPid = pId.toString();
    const bookingData = await Booked.find({
      providerId: newPid,
    }).populate("userId");
    console.log("booking Data", bookingData);
    if (bookingData.length > 0) {
      res.status(200).json(bookingData);
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: "No Booking data found" });
  }
});

module.exports = {
  signinUser,
  registerUser,
  signinWithGoogle,
  getServiceDetails,
  getCategoryDetails,
  serviceSearch,
  searchProvider,
  providerRecommendations,
  selectedProvider,
  getBookingData,
  bookService,
  userbookedList,
  getUserInfo,
  providerbookedList,
};