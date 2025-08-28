const pool = require("../config/db");
const DeviceDetector = require("node-device-detector");
const DeviceHelper = require('node-device-detector/helper');


const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});

const addAddress = async (req, res) => {
  try {
    const { name, address, location, customer_id, district_id } = req.body;

    const newaddress = await pool.query(
      `
      INSERT INTO address (name, address, location, customer_id, district_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [name, address, location, customer_id, district_id]
    );

    pool.query("");

    res.status(201).send({
      message: "New address added",
      data: newaddress.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const getAllAddress = async (req, res) => {
  try {

    const userAgent = req.headers["user-agent"]
    const result = detector.detect(userAgent);

    console.log(DeviceHelper.isDesktop(result));
    

    const address = await pool.query(
      `
      SELECT * FROM address
      `
    );
    res.status(200).send({
      message: "All address",
      data: address.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const getAddressByID = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await pool.query(
      `
      SELECT * FROM address WHERE id = $1
      `,
      [id]
    );

    res.status(200).send({
      message: " address",
      data: address.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const deleteAddressByID = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await pool.query(
      `
      DELETE FROM address WHERE id = $1
      `,
      [id]
    );

    res.status(200).send({
      message: " address deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, address, location, customer_id, district_id } = req.body;

    const newaddress = await pool.query(
      `
      UPDATE address set name = $1, address = $2, location = $3, customer_id = $4, district_id = $5
      WHERE id = $6 RETURNING *
      `,
      [name, address, location, customer_id, district_id, id]
    );
    res.status(201).send({
      message: "address updates",
      data: newaddress.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

module.exports = {
  addAddress,
  getAllAddress,
  getAddressByID,
  updateAddress,
  deleteAddressByID,
};
