const router = require("express").Router()

const {
  getAllDeliveryStaff,
  getDeliveryStaffById,
  createDeliveryStaff,
  updateDeliveryStaff,
  deleteDeliveryStaff
} = require("../controllers/deliveryStaff.controller")

router.get("/", getAllDeliveryStaff)
router.get("/:id", getDeliveryStaffById)
router.post("/", createDeliveryStaff)
router.put("/:id", updateDeliveryStaff)
router.delete("/:id", deleteDeliveryStaff)

module.exports = router