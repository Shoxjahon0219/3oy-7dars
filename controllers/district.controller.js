const pool = require("../config/db");

const getAllDistricts = async (req, res) => {
  try {
    const districts = await pool.query(
      "SELECT * FROM district"
    );
    res.status(200).send(districts.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await pool.query(
      "SELECT * FROM district WHERE id = $1",
      [id]
    );

    if (district.rows.length == 0) {
      return res.status(404).send({ error: "district not found" });
    }

    res.status(200).send(district.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const createDistrict = async (req, res) => {
  try {
    const { name} = req.body;

    const newdistrict = await pool.query(
      "INSERT INTO district (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).send({
      message: "district created successfully",
      data: newdistrict.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updateddistrict = await pool.query(
      "UPDATE district SET name = $1 WHERE id = $4 RETURNING *",
      [name, id]
    );

    if (updateddistrict.rows.length == 0) {
      return res.status(404).send({ error: "district not found" });
    }

    res.status(200).send({
      message: "district updated successfully",
      data: updateddistrict.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteddistrict = await pool.query(
      "DELETE FROM district WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleteddistrict.rows.length == 0) {
      return res.status(404).send({ error: "district not found" });
    }

    res.status(200).send({
      message: "district deleted successfully",
      data: deleteddistrict.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDistricts,
  getDistrictById,
  createDistrict,
  updateDistrict,
  deleteDistrict,
};
