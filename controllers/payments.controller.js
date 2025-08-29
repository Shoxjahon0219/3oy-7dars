const pool = require("../config/db");

const getAllPayments = async (req, res) => {
  try {
    const payments = await pool.query("SELECT * FROM payments");
    res.status(200).send(payments.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await pool.query("SELECT * FROM payments WHERE id = $1", [
      id,
    ]);
    if (payment.rows.length == 0) {
      return res.status(404).send({ error: "Payment not found" });
    }
    res.status(200).send(payment.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const createPayment = async (req, res) => {
  try {
    const { order_id, amount, payment_date, payment_method } = req.body;
    const newPayment = await pool.query(
      "INSERT INTO payments (order_id, amount, payment_date, payment_method) VALUES ($1, $2, $3, $4) RETURNING *",
      [order_id, amount, payment_date, payment_method]
    );
    res.status(201).send({
      message: "Payment created successfully",
      data: newPayment.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, amount, payment_date, payment_method } = req.body;
    const updatedPayment = await pool.query(
      "UPDATE payments SET order_id = $1, amount = $2, payment_date = $3, payment_method = $4 WHERE id = $5 RETURNING *",
      [order_id, amount, payment_date, payment_method, id]
    );
    if (updatedPayment.rows.length == 0) {
      return res.status(404).send({ error: "Payment not found" });
    }
    res.status(200).send({
      message: "Payment updated successfully",
      data: updatedPayment.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await pool.query(
      "DELETE FROM payments WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedPayment.rows.length == 0) {
      return res.status(404).send({ error: "Payment not found" });
    }
    res.status(200).send({
      message: "Payment deleted successfully",
      data: deletedPayment.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
