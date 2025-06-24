import mysql2, { Pool } from "mysql2/promise";

let db: Pool;
try {
  db = mysql2.createPool({
    host: process.env.DATABASE_URI,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
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
