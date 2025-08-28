const { Router } = require("express");
const customerRouter = require("./customer.route");
const waterProductRoutes = require("./waterProduct.routes");
const addressRouter = require("./address.route");
const deliveryStaffRoutes = require("./deliveryStaff.routes");

const router = Router();

router.use("/customer", customerRouter);
router.use("/water-products", waterProductRoutes);
router.use("/address", addressRouter);
router.use("/delivery-staff", deliveryStaffRoutes);

module.exports = router;
