const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateTocken = require("../utils/generateTocken");
const ServiceCategory = require("../models/serviceCategoryModel");
const Service = require("../models/servicesModel");
const Provider = require("../models/serviceProviderModel");
const Location = require("../models/locationModel");
const Booked = require("../models/completedBookingModel");
const Payment = require("../models/paymentSuccessModel");

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });
  console.log(admin.isAdmin);
  if (admin && (await admin.matchPassword(password))) {
    if (admin.isAdmin === true) {
      res.json({
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        mobileno: admin.mobileno,
        pic: admin.pic,
        isAdmin: admin.isAdmin,
        token: generateTocken(admin._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password!");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  console.log("object");
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const blockUser = asyncHandler(async (req, res) => {
  try {
    console.log("object");
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.isVerified) {
        user.isVerified = false;
      } else {
        user.isVerified = true;
      }
      // user.isVerified = req.body.isVerified;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isVerified: updatedUser.isVerified,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found!");
    }
  } catch (error) {
    console.log(error.message);
  }
});

const addServiceTypes = asyncHandler(async (req, res) => {
  try {
    const { serviceType, fileLink, text } = req.body;
    const serviceTypeExists = await ServiceCategory.findOne({ serviceType });
    if (serviceTypeExists) {
      res.status(400);
      throw new Error("service Type Already Exists");
    }
    const serviceCategory = await ServiceCategory.create({
      serviceType,
      image: fileLink,
      serviceTypeDescription: text,
    });

    if (serviceCategory) {
      res.status(200).json({
        _id: serviceCategory._id,
        serviceType: serviceCategory.serviceType,
        image: serviceCategory.image,
        serviceTypeDescription: serviceCategory.serviceTypeDescription,
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  } catch (error) {
    console.log(error.message);
  }
});

const addServices = asyncHandler(async (req, res) => {
  const { stype, services, imageLink, text } = req.body;
  console.log(stype, services);
  const serviceExists = await Service.findOne({
    $and: [{ serviceType: { $eq: stype } }, { serviceName: { $eq: services } }],
  });
  //  $and: [{serviceType:{$eq: stype} }, { serviceName: {$eq: services }}

  console.log(serviceExists);

  if (serviceExists) {
    res.status(400);
    throw new Error("service  Already Exists");
  }

  const serviceTypeExists = await ServiceCategory.findOne({
    serviceType: stype,
  });
  // console.log(serviceTypeExists);
  if (serviceTypeExists) {
    const service = await Service.create({
      serviceType: stype,
      serviceName: services,
      image: imageLink,
      serviceDescription: text,
    });

    if (service) {
      res.status(200).json({
        _id: service._id,
        serviceType: service.serviceType,
        serviceName: service.serviceName,
        image: service.image,
        serviceDescription: service.serviceDescription,
      });
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const serviceTypeList = asyncHandler(async (req, res) => {
  try {
    const typeList = await ServiceCategory.find();
    res.json(typeList);
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const servicesList = asyncHandler(async (req, res) => {
  try {
    const List = await Service.find();
    res.json(List);
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const verifyProvider = asyncHandler(async (req, res) => {
  try {
    console.log("verify provider");

    const user = await User.findById(req.params.id);
    console.log(user);
    console.log(req.params.id);
    if (user) {
      const verified = await User.updateOne(
        { _id: req.params.id },
        { $set: { role: "provider" } }
      );

      const providerData = await Provider.findOne({ userId: req.params.id });
      console.log("providerData", providerData);

      console.log("serviceCategory", providerData.serviceCategory);
      const result = await Service.findOneAndUpdate(
        { serviceName: providerData.serviceCategory },
        { $set: { locations: providerData.workLocation } },
        { upsert: true, new: true }
      );

      console.log(result);

      res.json({ verified });
    } else {
      res.status(404);
      throw new Error("User Not Found!");
    }
  } catch (error) {
    console.log(error.message);
  }
});

const rejectProvider = asyncHandler(async (req, res) => {
  try {
    console.log("rejectprovider");
    const user = await User.findById(req.params.id);
    console.log(user);
    console.log(req.params.id);
    if (user) {
      const reject = await User.updateOne(
        { _id: req.params.id },
        { $set: { role: "user" } }
      );

      await Provider.deleteOne({ userId: req.params.id });

      res.json({ reject });
    } else {
      res.status(404);
      throw new Error("User Not Found!");
    }
  } catch (error) {
    console.log(error.message);
    res.status(404);
    throw new Error("User Not Found!");
  }
});

const providersList = asyncHandler(async (req, res) => {
  try {
    const allUserData = [];
    const providerList = await User.find({
      role: { $in: ["provider", "blocked"] },
    });

    if (providerList) {
      if (providerList.length > 0) {
        for (let i = 0; i < providerList.length; i++) {
          const provider = providerList[i];
          const providerData = await Provider.find({ userId: provider._id });

          if (providerData.length > 0) {
            allUserData.push({
              ...provider.toObject(),
              ...providerData[0].toObject(),
            });
          } else {
            allUserData.push(provider.toObject());
          }
        }
      } else {
        console.log("No users found with role 'toVerify'");
      }
    }

    res.json(allUserData);
  } catch (error) {
    console.log(error.message);
    res.status(404);
    throw new Error("User Not Found!");
  }
});

const blockProvider = asyncHandler(async (req, res) => {
  try {
    console.log("block provider");
    console.log(req.body.role);

    const user = await User.findById(req.params.id);
    if (req.body.role === "provider") {
      const updatedUser = await User.updateOne(
        { _id: req.params.id },
        { $set: { role: "blocked" } }
      );
      res.json({ updatedUser });
    } else if (req.body.role === "blocked") {
      const updatedUser = await User.updateOne(
        { _id: req.params.id },
        { $set: { role: "provider" } }
      );
      res.json({ updatedUser });
    } else {
      res.status(404);
      throw new Error("User Not Found!");
    }
  } catch (error) {
    console.log(error.message);
    res.status(404);
    throw new Error("User Not Found!");
  }
});

const addLocation = asyncHandler(async (req, res) => {
  try {
    const { location } = req.body;

    const oldLocation = await Location.findOne({ location: location });

    if (oldLocation) {
      res.status(400);
      throw new Error("Location Already Exists");
    }

    const newLocation = await Location.create({
      location: location,
    });

    if (newLocation) {
      res.status(200).json({ location: newLocation.location });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const locationList = asyncHandler(async (req, res) => {
  try {
    const list = await Location.find();

    if (list) {
      res.status(200).json(list);
    } else {
      res.status(404);
      throw new Error("No location Found!");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getBookedList = asyncHandler(async (req, res) => {
  try {
    const bookedList = await Booked.find();

    if (bookedList) {
      res.status(200).json(bookedList);
    }
  } catch (error) {
    console.log(error.message);
    res.status(404);
    throw new Error("No booking Yet!");
  }
});

const deleteLocation = asyncHandler(async (req, res) => {
  try {
    const locId = req.body.locId;
    const deleteData = await Location.findByIdAndDelete(locId);
    res.status(204).end();
  } catch (error) {
    console.log(error.message);
    res.status(404);
    throw new Error("No booking Yet!");
  }
});

const paymentInfo = asyncHandler(async (req, res) => {
  try {
    const paymentDetails = await Payment.find().populate("invoiceId");

    if (paymentDetails) {
      res.status(200).json(paymentDetails);
    }
  } catch (error) {
    console.log(error.message);
    res.status(404);
    throw new Error("No payment Yet!");
  }
});



module.exports = {
  adminLogin,
  getUsers,
  blockUser,
  addServiceTypes,
  addServices,
  serviceTypeList,
  servicesList,
  verifyProvider,
  rejectProvider,
  providersList,
  blockProvider,
  addLocation,
  locationList,
  getBookedList,
  deleteLocation,
  paymentInfo,
};
