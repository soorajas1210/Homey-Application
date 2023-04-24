const express = require("express");
const {
  toVerify,
  toVerifyList,
  providerBookingHandler,
  bookedServiceDetails,
  sendInvoice,
} = require("../controllers/providerController");
const userProtect = require("../middlewares/userAuthMiddleware");

const router = express.Router();

router.post("/toVerify", userProtect, toVerify);
router.get("/toVerifyList", toVerifyList);
router.patch("/providerBookingHandler", userProtect, providerBookingHandler);
router.get("/serviceDetails/:id", userProtect, bookedServiceDetails);
router.post("/sendInvoice", userProtect, sendInvoice);

module.exports = router;
