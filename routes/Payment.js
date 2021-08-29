const router = require("express").Router();
const paymentController = require("../controllers/Payment");

router.post("/gopay", paymentController.chargeRequest);

module.exports = router;
