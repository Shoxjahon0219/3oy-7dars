const pool = require("../config/db");

const getAllOrders = async (req, res) => {
  try {
    const orders = await pool.query(`
      SELECT * FROM orders
    `);
    res.status(200).send(orders.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query(
      `
      SELECT FROM orders WHERE o.id = $1
    `,
      [id]
    );

    if (order.rows.length == 0) {
      return res.status(404).send({ error: "Order not found" });
    }
    res.status(200).send(order.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const { customer_id, delivery_staff_id, order_date, status } = req.body;

    const newOrder = await client.query(
      "INSERT INTO orders (customer_id, delivery_staff_id, order_date) VALUES ($1, $2, $3) RETURNING *",
      [customer_id, delivery_staff_id, order_date]
    );

    res.status(201).send({
      message: "Order created successfully",
      data: newOrder.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_id, delivery_staff_id, order_date, status } = req.body;

    const updatedOrder = await pool.query(
      "UPDATE orders SET customer_id = $1, delivery_staff_id = $2, order_date = $3, status = $4 WHERE id = $5 RETURNING *",
      [customer_id, delivery_staff_id, order_date, status, id]
    );

    if (updatedOrder.rows.length == 0) {
      return res.status(404).send({ error: "Order not found" });
    }

    res.status(200).send({
      message: "Order updated successfully",
      data: updatedOrder.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { id } = req.params;

    await client.query("DELETE FROM order_items WHERE order_id = $1", [id]);

    await client.query("DELETE FROM payments WHERE order_id = $1", [id]);

    const deletedOrder = await client.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );

    if (deletedOrder.rows.length == 0) {
      return res.status(404).send({ error: "Order not found" });
    }

    res.status(200).send({
      message: "Order deleted successfully",
      data: deletedOrder.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
