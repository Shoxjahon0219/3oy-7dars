const router = require("express").Router();

const {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItem.controller");

router.get("/", getAllOrderItems);
router.get("/:id", getOrderItemById);
router.post("/", createOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;