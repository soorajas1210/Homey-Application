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
router.get("/providerRecommendations", userProtect, providerRecommendations);  
router.post("/selectedProvider", userProtect, selectedProvider);
router.get("/getBookingData", userProtect, getBookingData); 
router.post("/bookService", userProtect, bookService);
router.get("/userbookedList", userProtect, userbookedList); 
router.get("/getUserInfo", userProtect, getUserInfo);
router.get("/providerbookedList", userProtect, providerbookedList); 






module.exports = router;
