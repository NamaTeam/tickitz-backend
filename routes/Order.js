const router = require("express").Router();
const verifyToken = require("../helpers/verifyToken");
const orderController = require("../controllers/Order");

router.get("/:id", orderController.getOrderHistory);

router.post("/:id", orderController.addNewOrder);

module.exports = router;
