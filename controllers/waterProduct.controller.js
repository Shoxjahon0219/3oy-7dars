const pool = require("../config/db");

const getAllWaterProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM water_products ORDER BY id");
    res.status(200).send(products.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getWaterProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM water_products WHERE id = $1", [id]);
    
    if (product.rows.length == 0) {
      return res.status(404).send({ error: "Water product not found" });
    }
    
    res.status(200).send(product.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const createWaterProduct = async (req, res) => {
  try {
    const { name, volume_liters, price } = req.body;
    
    const newProduct = await pool.query(
      "INSERT INTO water_products (name, volume_liters, price) VALUES ($1, $2, $3) RETURNING *",
      [name, volume_liters, price]
    );

    res.status(201).send({
      message: "Water product created successfully",
      data: newProduct.rows[0]
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateWaterProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, volume_liters, price } = req.body;
    
    const updatedProduct = await pool.query(
      "UPDATE water_products SET name = $1, volume_liters = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, volume_liters, price, id]
    );

    if (updatedProduct.rows.length == 0) {
      return res.status(404).send({ error: "Water product not found" });
    }

    res.status(200).send({
      message: "Water product updated successfully",
      data: updatedProduct.rows[0]
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const deleteWaterProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedProduct = await pool.query(
      "DELETE FROM water_products WHERE id = $1 RETURNING *",
      [id]
    );

    if (deletedProduct.rows.length == 0) {
      return res.status(404).send({ error: "Water product not found" });
    }

    res.status(200).send({
      message: "Water product deleted successfully",
      data: deletedProduct.rows[0]
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  getAllWaterProducts,
  getWaterProductById,
  createWaterProduct,
  updateWaterProduct,
  deleteWaterProduct
};