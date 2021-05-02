const router = require("express").Router();
const verifyToken = require("../helpers/verifyToken");
const orderController = require("../controllers/Order");

router.get("/history/:id", orderController.getOrderHistory);

router.get('/:id', orderController.getOrderById);

router.post("/:id", orderController.addNewOrder);

router.patch('/:id', orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);

module.exports = router;
