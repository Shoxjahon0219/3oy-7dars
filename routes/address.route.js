const {
  addAddress,
  getAllAddress,
  getAddressByID,
  updateAddress,
  deleteAddressByID,
} = require("../controllers/address.controller.js");

const router = require("express").Router();

router.post("/", addAddress);
router.get("/", getAllAddress);
router.get("/:id", getAddressByID);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddressByID);

module.exports = router;
