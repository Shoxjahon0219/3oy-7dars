const router = require("express").Router()

const {
  getAllWaterProducts,
  getWaterProductById,
  createWaterProduct,
  updateWaterProduct,
  deleteWaterProduct
} = require("../controllers/waterProduct.controller")

router.get("/", getAllWaterProducts)
router.get("/:id", getWaterProductById)
router.post("/", createWaterProduct)
router.put("/:id", updateWaterProduct)
router.delete("/:id", deleteWaterProduct)

module.exports = router