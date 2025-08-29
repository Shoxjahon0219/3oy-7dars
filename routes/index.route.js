const { Router } = require("express");
const customerRouter = require("./customer.route");
const waterProductRoutes = require("./waterProduct.route");
const addressRouter = require("./address.route");
const deliveryStaffRoutes = require("./deliveryStaff.route");
const districtRouter = require("./district.route");
const orderRouter = require("./order.route");
const orderItemRouter = require("./orderItem.route");
const paymentsRouter = require("./payments.route");

const router = Router();

router.use("/customers", customerRouter);
router.use("/water_products", waterProductRoutes);
router.use("/address", addressRouter);
router.use("/delivery_staff", deliveryStaffRoutes);
router.use("/districts", districtRouter);
router.use("/orders", orderRouter);
router.use("/order_items", orderItemRouter);
router.use("/payments", paymentsRouter);

module.exports = router;
