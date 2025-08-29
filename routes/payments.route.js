const router = require("express").Router();

const {
	getAllPayments,
	getPaymentById,
	createPayment,
	updatePayment,
	deletePayment,
} = require("../controllers/payments.controller");

router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.post("/", createPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;