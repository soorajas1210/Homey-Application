const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateTocken = require("../utils/generateTocken");
const Service = require("../models/servicesModel");
const ServiceCategory = require("../models/serviceCategoryModel");
const stripe = require("stripe")(
  "sk_test_51N0SnbSGULmMYgVw4RBtkPI7c9i4ijS3uL5GB0Sxs2HLDyQlBV5ldmV6zOsYf7n3S9h2KRR4pEOBr9xLsxsiSUsi00jaO2FFoq"
);
const uuid = require("uuid").v4;
const Location = require("../models/locationModel");
const Provider = require("../models/serviceProviderModel");
const Booking = require("../models/bookingModel");
const Booked = require("../models/completedBookingModel");
const Invoice = require("../models/InvoiceModel");
const Payment = require("../models/paymentSuccessModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

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
    if (id === "undefined") {
      const List = await Service.find();

      return res.json(List);
    } else {
      const loc = await Location.findById(id);

      Service.find({ locations: { $in: [loc.location] } })
        .then((services) => {
          if (services.length > 0) {
            res.status(200).json(services);
          } else {
            res.json([]);
          }
        })
        .catch((err) => {
          res.status(500).json({ error: "Internal server error" });
        });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding services" });
  }
});

const searchProvider = asyncHandler(async (req, res) => {
  try {
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
    res.status(500).json({ error: "Error finding providers" });
  }
});

const providerRecommendations = asyncHandler(async (req, res) => {
  try {
    const { myValue } = req;
    const newDate = req.body.newDate;
    const taskTime = req.body.taskTime;

    const myId = myValue.toString();
    const sarchBookData = await Booking.findOne({ userId: myId }).populate(
      "serviceId"
    );
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
              {
                bookings: {
                  $not: {
                    $elemMatch: {
                      date: newDate,
                      time: taskTime,
                    },
                  },
                },
              },
            ],
          });

          if (providerData.length > 0) {
            allUserData.push({
              ...provider.toObject(),
              ...providerData[0].toObject(),
            });
          }
        }
      } else {
        res.status(400);
        throw new Error("No users found with role 'toVerify'");
      }
    }
    res.json(allUserData);
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
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

      const pId = bookingData.providerId;
      if (pId) {
        const newPid = pId.toString();

        const ProviderData = await Provider.findById(newPid).populate("userId");

        const mergedData = {
          ...bookingData.toObject(),
          ...ProviderData.toObject(),
        };

        res.status(200).json(mergedData);
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

const bookService = asyncHandler(async (req, res) => {
  try {
    const { myValue, body } = req;

    const myId = myValue.toString();

    const { newData } = body;

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
          const booking = BookingList[i];

          const providerData = await Provider.find({
            _id: booking.providerId,
          }).populate("userId");

          if (providerData.length > 0) {
            allBookingData.push({
              ...booking.toObject(),
              ...providerData[0].toObject(),
              bookingObjectId: booking._id,
            });
          } else {
            allBookingData.push(booking.toObject());
          }
        }
      } else {
      }
    }

    res.status(200).json(allBookingData);
  } catch (error) {
    res.status(500).json({ error: "No Booking data found" });
  }
});

const getUserInfo = asyncHandler(async (req, res) => {
  try {
    const myId = req.params.id;

    const userData = await User.findById(myId);
    if (userData) {
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
    } else {
      throw new Error("No data found!");
    }
  } catch (error) {
    throw new Error("No data found!");
  }
});

const providerbookedList = asyncHandler(async (req, res) => {
  try {
    const { myValue } = req;
    const myId = myValue.toString();

    const providerId = await Provider.findOne({ userId: myId });

    const pId = providerId._id;

    const newPid = pId.toString();
    const bookingData = await Booked.find({
      providerId: newPid,
    }).populate("userId");

    if (bookingData.length > 0) {
      res.status(200).json(bookingData);
    }
  } catch (error) {
    res.status(500).json({ error: "No Booking data found" });
  }
});

const cancelBooking = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const cancelData = await Booked.updateOne(
      { _id: id },
      { $set: { status: "cancelled" } }
    );

    if (cancelData.status === "canceled") {
      res.status(200).json(cancelData);
    }
  } catch (error) {
    res.status(500).json({ error: "No Booking data found" });
  }
});

const checkInvoice = asyncHandler(async (req, res) => {
  try {
    const invoiceData = await Invoice.findOne({ bookedId: req.params.id })
      .populate("userId")
      .populate("providerId");
    if (invoiceData) {
      res.status(200).json(invoiceData);
    } else {
      res.status(400);
      throw new Error("No Data !");
    }
  } catch (error) {
    res.status(500).json({ error: "No Booking data found" });
  }
});

const checkoutService = asyncHandler(async (req, res) => {
  try {
    const { product } = req.body;

    if (product) {
      const total = product.amount;
      const payment = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "inr",
      });

      res.status(201).send({
        clientSecret: payment.client_secret,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failure" });
  }
});

const paymentSuccess = asyncHandler(async (req, res) => {
  try {
    const { newData } = req.body;

    if (newData) {
      const pDetails = await Provider.findById(newData.providerId).populate(
        "userId"
      );

      if (pDetails) {
        const paymentData = await Payment.create({
          firstName: newData.firstName,
          lastName: newData.lastName,
          provderFirstName: pDetails.userId.firstName,
          providerLastName: pDetails.userId.lastName,
          streetAddress: newData.streetAddress,
          city: newData.city,
          state: newData.state,
          country: newData.country,
          pin: newData.pin,
          phoneNumber: newData.phoneNumber,
          bookedId: newData.bookedId,
          userId: newData.userId,
          providerId: newData.providerId,
          invoiceId: newData.invoiceId,
          review: newData.review,
        });

        if (paymentData) {
          await Invoice.updateOne(
            { _id: newData.invoiceId },
            { $set: { status: "payed" } }
          );
          await Booked.updateOne(
            { _id: newData.bookedId },
            { $set: { status: "payed" } }
          );
          res.status(200).json(paymentData);
        }
      }
    } else {
      res.status(400);
      throw new Error("NO data Found!");
    }
  } catch (error) {
    res.status(500).json({ error: "Failure" });
  }
});

const providerReview = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const data = await Payment.find({
        providerId: id,
      });
      if (data) {
        res.status(200).json(data);
      } else {
        throw new Error("nodata found");
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Failure" });
  }
});

const createChat = asyncHandler(async (req, res) => {
  try {
    const newChat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
      serviceId: req.body.serviceId,
    });
    const result = await newChat.save();
    if (result) {
      await Booked.updateOne(
        { _id: req.body.serviceId },
        { $set: { chat: "Active" } }
      );
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const userChat = asyncHandler(async (req, res) => {
  try {
    const chat = await Chat.find({
      $and: [
        { members: { $in: [req.params.userId] } },
        { serviceId: { $eq: req.body.bookedId } },
      ],
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const findChat = asyncHandler(async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const addMessage = asyncHandler(async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const message = new Message({
      chatId,
      senderId,
      text,
    });
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const getMessages = asyncHandler(async (req, res) => {
  try {
    const { chatId } = req.params;
    const result = await Message.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const getChatInfo = asyncHandler(async (req, res) => {
  try {
    const myId = req.params.id;
    const userData = await User.findById(myId);
    if (userData) {
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
    } else {
      throw new Error("No data found!");
    }
  } catch (error) {
    throw new Error("No data found!");
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    const { myValue, body } = req;
    const myId = myValue.toString();
    const { editData } = body;

    if (editData) {
      const update = await User.findOneAndUpdate(
        { _id: myId },
        {
          firstName: editData.firstName,
          lastName: editData.lastName,
          email: editData.email,
          mobileno: editData.phoneNumber,
          streetAddress: editData.streetAddress,
          city: editData.city,
          state: editData.state,
          pin: editData.pin,
          country: editData.country,
        }
      );
      if (update) {
        res.status(200).json(update);
      } else {
        throw new Error("Details not updated");
      }
    }
  } catch (error) {
    throw new Error("No data found!");
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
  cancelBooking,
  checkInvoice,
  checkoutService,
  paymentSuccess,
  userChat,
  createChat,
  findChat,
  addMessage,
  getMessages,
  getChatInfo,
  editUser,
  providerReview,
};
