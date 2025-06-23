import mysql2, { Pool } from "mysql2";
// const dotenv = require("dotenv");
// dotenv.config();
const db_user = process.env.DATABASE_USER;
const db_uri = process.env.DATABASE_URI;
const db_password = process.env.DATABASE_PASSWORD;
const db_database = process.env.DATABASE;

let db: Pool;
try {
  db = mysql2.createPool({
    host: db_uri,
    user: db_user,
    password: db_password,
    database: db_database,
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
  });
} catch (error) {
  console.error("Error connecting to the database: ", error);
  throw error;
}

export default db;
