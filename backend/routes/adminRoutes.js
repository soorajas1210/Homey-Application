const { add } = require("date-fns");
const express = require("express");
const {
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
} = require("../controllers/adminController");
const adminProtect = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

router.post("/adminLogin", adminLogin);
router.post("/addServiceTypes", addServiceTypes);
router.patch("/blockUser/:id",adminProtect, blockUser);
router.get("/usersList",adminProtect, getUsers);
router.get("/serviceTypeList", serviceTypeList);
router.post("/addServices", addServices);
router.get("/servicesList", servicesList);
router.patch("/verifyProvider/:id", verifyProvider);
router.patch("/rejectProvider/:id", rejectProvider);
router.get("/providersList",providersList);
router.patch("/blockProvider/:id", blockProvider);
router.post("/addLocation", addLocation);
router.get("/locationList", locationList);
router.get("/getBookedList", getBookedList);
router.get("/deleteLocation", deleteLocation);
router.get("/paymentInfo", paymentInfo);


module.exports = router;
