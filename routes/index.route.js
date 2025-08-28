const { Router } = require("express");
const customerRouter = require("./customer.route");
const waterProductRoutes = require("./waterProduct.routes");
const addressRouter = require("./address.route");

const router = Router();

router.use("/customer", customerRouter);
router.use("/water-products", waterProductRoutes);
router.use("/address", addressRouter);

module.exports = router;
