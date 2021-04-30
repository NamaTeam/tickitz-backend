const router = require("express").Router();
const paymentController = require("../controllers/Payment");

router.get("/", paymentController.chargeRequest);

module.exports = router;
