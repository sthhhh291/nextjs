import { ResultSetHeader } from "mysql2";
import db from "./db";

// get all customers with pagination
export const getCustomers = async (
  filter: string,
  limit: number,
  page: number
) => {
  const offset = (page - 1) * limit || 0;
  const customersSql = `SELECT id,first_name,last_name,notes FROM customers
    WHERE concat(first_name, " ", last_name) LIKE ?
    ORDER BY last_name,first_name LIMIT ? OFFSET ?`;
  const countSql = `SELECT count(*) as count FROM customers WHERE concat(first_name, " ", last_name) LIKE ?`;
  const customersParams = [`%${filter}%`, +limit, +offset];
  const countParams = [`%${filter}%`];

  const [results] = await db.query(customersSql, customersParams);
  const [countRows] = await db.query(countSql, countParams);
  const customers: customer[] = results as customer[];
  const total = (countRows as { count: number }[])[0].count;
  const pages = Math.ceil(total / limit);
  const totals = {
    total: total,
    per_page: limit,
    page: page,
    next_page: page + 1 > pages ? pages : +page + 1,
    prev_page: page - 1 < 1 ? 1 : +page - 1,
    pages: pages,
  };
  return {
    customers,
    totals,
  };
};

// get one customer
export const getCustomer = async (id: number) => {
  const customerSql = `SELECT id,first_name,last_name,notes FROM customers
    WHERE id=?`;
  const customerParams = [id];

  const [results] = await db.query(customerSql, customerParams);
  const customers = results as customer[];
  const customer: customer = customers[0];
  return customer;
};

// get all cars for 1 customer
export const getCustomerCars = async (id: number) => {
  const carSql =
    "SELECT cars.id,cars.customer_id,cars.year,cars.make,cars.model,cars.engine,cars.vin,\
    cars.license,cars.fleet_no,cars.notes from cars where cars.customer_id=?;";
  const carParams = [id];

  const [results] = await db.query(carSql, carParams);
  const cars: car[] = results as car[];
  return cars;
};

// get all phones for 1 customer
export const getCustomerPhones = async (id: number) => {
  const phoneSql =
    "SELECT id,customer_id,phone_type,phone_number from phones where customer_id=?";
  const phoneParams = [id];

  const [results] = await db.query(phoneSql, phoneParams);
  const phones: phone[] = results as phone[];
  return phones;
};

//create customer
export const createCustomer = async (
  first: string,
  last: string,
  notes: string
) => {
  const sql = "INSERT INTO customers(first_name,last_name,notes) values(?,?,?)";
  const params = [first, last, notes];
  const [results] = await db.query<ResultSetHeader>(sql, params);
  console.log("results", results);
  const insertId = results.insertId;
  const newCustomer = await getCustomer(insertId);
  console.log("new customer", newCustomer);
};

//edit customer
export const editCustomer = async (
  id: number,
  first: string,
  last: string,
  notes: string
) => {
  const sql =
    "UPDATE customers SET first_name=?, last_name=?, notes=? WHERE id=?";
  const params = [first, last, notes, id];
  const [results] = await db.query<ResultSetHeader>(sql, params);
  console.log("updated customer", results);
  const newCustomer = await getCustomer(id);
  console.log("updated customer", newCustomer);
};

//delete customer
export const deleteCustomer = async (id: number) => {
  const sql = "DELETE FROM customers WHERE id=?";
  const params = [id];
  await db.query(sql, params);
};
