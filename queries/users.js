const db = require("../db/dbConfig");

const createCustomer = async (customer) => {
  try {
    const {
      name,
      email,
      contact_info,
      customer_image_url,
      location,
      dietary_preferences,
    } = customer;

    const newCustomer = await db.one(
      "INSERT INTO customers (name, email, contact_info, customer_image_url, location, dietary_preferences) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        name,
        email,
        contact_info,
        customer_image_url,
        location,
        dietary_preferences,
      ]
    );
    return newCustomer;
  } catch (err) {
    return err;
  }
};

const getAllCustomers = async () => {
  try {
    const customers = await db.any("SELECT * FROM customers");
    return customers;
  } catch (err) {
    return err;
  }
};

const getCustomerByEmail = async (email) => {
  try {
    const customer = await db.oneOrNone(
      "SELECT * FROM customers WHERE email = $1",
      [email]
    );
    return customer;
  } catch (err) {
    return null;
  }
};

const getCustomerById = async (id) => {
  try {
    const customer = await db.oneOrNone(
      "SELECT * FROM customers WHERE customer_id = $1",
      [id]
    );
    return customer;
  } catch (err) {
    return err;
  }
};

const updateCustomer = async (id, customer) => {
  try {
    const { name, contact_info, customer_image_url, dietary_preferences } =
      customer;

    const updatedCustomer = await db.one(
      "UPDATE customers SET name = $1, contact_info = $2, customer_image_url = $3, dietary_preferences = $4 WHERE customer_id = $5 RETURNING *",
      [name, contact_info, customer_image_url, dietary_preferences, id]
    );
    return updatedCustomer;
  } catch (err) {
    return err;
  }
};

const deleteCustomer = async (id) => {
  try {
    await db.none("DELETE FROM customers WHERE customer_id = $1", [id]);
    return { message: "Customer deleted successfully" };
  } catch (err) {
    return err;
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerByEmail,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
