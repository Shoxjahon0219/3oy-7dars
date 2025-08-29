const pool = require("../config/db");

const getAllDeliveryStaff = async (req, res) => {
  try {
    const staff = await pool.query(`
      SELECT * FROM delivery_staff
    `);
    res.status(200).send(staff.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getDeliveryStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await pool.query(
      `
      SELECT * FROM delivery_staff WHERE ds.id = $1
    `,
      [id]
    );

    if (staff.rows.length == 0) {
      return res.status(404).send({ error: "Delivery staff not found" });
    }

    res.status(200).send(staff.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const createDeliveryStaff = async (req, res) => {
  try {
    const { name, phone, vehicle_number, region_id } = req.body;

    const newStaff = await pool.query(
      "INSERT INTO delivery_staff (name, phone, vehicle_number, region_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, phone, vehicle_number, region_id]
    );

    res.status(201).send({
      message: "Delivery staff created successfully",
      data: newStaff.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateDeliveryStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, vehicle_number, region_id } = req.body;

    const updatedStaff = await pool.query(
      "UPDATE delivery_staff SET name = $1, phone = $2, vehicle_number = $3, region_id = $4 WHERE id = $5 RETURNING *",
      [name, phone, vehicle_number, region_id, id]
    );

    if (updatedStaff.rows.length == 0) {
      return res.status(404).send({ error: "Delivery staff not found" });
    }

    res.status(200).send({
      message: "Delivery staff updated successfully",
      data: updatedStaff.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const deleteDeliveryStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStaff = await pool.query(
      "DELETE FROM delivery_staff WHERE id = $1 RETURNING *",
      [id]
    );

    if (deletedStaff.rows.length == 0) {
      return res.status(404).send({ error: "Delivery staff not found" });
    }

    res.status(200).send({
      message: "Delivery staff deleted successfully",
      data: deletedStaff.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDeliveryStaff,
  getDeliveryStaffById,
  createDeliveryStaff,
  updateDeliveryStaff,
  deleteDeliveryStaff,
};
