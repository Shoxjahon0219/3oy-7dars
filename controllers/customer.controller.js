const pool = require("../config/db");

const addCustomer = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const newCustomer = await pool.query(
      `
      INSERT INTO customers (name, phone, email)
      VALUES ($1, $2, $3) RETURNING *
      `,
      [name, phone, email]
    );
    console.log(newCustomer.rows);
    res.status(201).send({
      message: "New Customer added",
      data: newCustomer.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await pool.query(
      `
      SELECT * FROM customers
      `
    );
    res.status(200).send({
      message: "All Customers",
      data: customers.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const getCustomerByID = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await pool.query(
      `
      SELECT * FROM customers WHERE id = $1
      `,
      [id]
    );

    res.status(200).send({
      message: " Customer",
      data: customer.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const deleteCustomerByID = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await pool.query(
      `
      DELETE FROM customers WHERE id = $1
      `,
      [id]
    );

    res.status(200).send({
      message: " Customer deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, phone, email } = req.body;

    const newCustomer = await pool.query(
      `
      UPDATE customers set name = $1, phone=$2, email=$3
      WHERE id = $4 RETURNING *
      `,
      [name, phone, email, id]
    );
    res.status(201).send({
      message: "Customer updates",
      data: newCustomer.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerByID,
  updateCustomer,
  deleteCustomerByID,
};