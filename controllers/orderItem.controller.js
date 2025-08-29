const pool = require("../config/db");

const getAllOrderItems = async (req, res) => {
  try {
    const items = await pool.query("SELECT * FROM order_items");
    res.status(200).send(items.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await pool.query("SELECT * FROM order_items WHERE id = $1", [
      id,
    ]);
    if (item.rows.length == 0) {
      return res.status(404).send({ error: "OrderItem not found" });
    }
    res.status(200).send(item.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;
    const newItem = await pool.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [order_id, product_id, quantity, price]
    );
    res.status(201).send({
      message: "OrderItem created successfully",
      data: newItem.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, product_id, quantity, price } = req.body;
    const updatedItem = await pool.query(
      "UPDATE order_items SET order_id = $1, product_id = $2, quantity = $3, price = $4 WHERE id = $5 RETURNING *",
      [order_id, product_id, quantity, price, id]
    );
    if (updatedItem.rows.length == 0) {
      return res.status(404).send({ error: "OrderItem not found" });
    }
    res.status(200).send({
      message: "OrderItem updated successfully",
      data: updatedItem.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await pool.query(
      "DELETE FROM order_items WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedItem.rows.length == 0) {
      return res.status(404).send({ error: "OrderItem not found" });
    }
    res.status(200).send({
      message: "OrderItem deleted successfully",
      data: deletedItem.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
