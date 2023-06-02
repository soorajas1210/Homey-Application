const express = require("express");
const {
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
} = require("../controllers/userController");
const userProtect = require("../middlewares/userAuthMiddleware");

// router onjet
const router = express.Router();

// routes
router.post("/signinWithGoogle", signinWithGoogle);
router.post("/signin", signinUser);
router.post("/signup", registerUser);
router.get("/getServiceDetails/:id", getServiceDetails);
router.get("/getCategoryDetails/:id", getCategoryDetails);
router.get("/serviceSearch/:id", serviceSearch);
router.post("/searchProvider", userProtect, searchProvider);
router.post("/providerRecommendations", userProtect, providerRecommendations);
router.post("/selectedProvider", userProtect, selectedProvider);
router.get("/getBookingData", userProtect, getBookingData);
router.post("/bookService", userProtect, bookService);
router.get("/userbookedList", userProtect, userbookedList);
router.get("/getUserInfo/:id", userProtect, getUserInfo);
router.get("/providerbookedList", userProtect, providerbookedList);
router.patch("/cancelBooking", userProtect, cancelBooking);
router.get("/getInvoice/:id", userProtect, checkInvoice);
router.post("/checkout", userProtect, checkoutService);
router.post("/paymentSuccess", userProtect, paymentSuccess);
router.patch("/editUser",userProtect, editUser);
router.get("/providerReview/:id", providerReview);

// chat
router.post("/createChat", createChat);
router.post("/chat/:userId", userChat);
router.get("/find/:firstId/:secondId", findChat);
router.post("/messages", addMessage);
router.get("/getMessages/:chatId", getMessages);
router.get("/getChatInfo/:id", getChatInfo);

module.exports = router;
