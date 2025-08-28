const {
  addCustomer,
  getAllCustomers,
  getCustomerByID,
  updateCustomer,
  deleteCustomerByID,
} = require("../controllers/customer.controller");

const router = require("express").Router();

router.post("/", addCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getCustomerByID);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomerByID);

module.exports = router;
