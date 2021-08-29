const router = require("express").Router();
const paymentController = require("../controllers/Payment");

router.post("/gopay", paymentController.chargeRequestGopay);

module.exports = router;
