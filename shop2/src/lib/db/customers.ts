import db from "./db";

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

// console.log(connection);

// get all customers with pagination
// export function getCustomers(filter:string,limit:number,page:number,offset:number) {
//     connection.query(
//         'SELECT id,first_name,last_name,notes FROM customers\
//           where concat(first_name," ", last_name) like ?\
//            order by last_name,first_name limit ? offset ?;\
//           select count(*) as count from customers where concat(first_name," ", last_name) like ?;',
//         [`%${filter}%`, +limit, +offset, `%${filter}%`],
//         (err, results) => {
//           if (err) {
//             res.status(500).send("Error fetching customers" + err.stack);
//             return;
//           }
//           const customers = results[0];
//           const total = results[1][0].count;
//           const pages = Math.ceil(total / limit);
//           let result = {
//             customers: customers,
//             totals: {
//               total: total,
//               per_page: +limit,
//               page: +page,
//               next_page: +page + 1 > pages ? pages : +page + 1,
//               prev_page: +page - 1 < 1 ? 1 : +page - 1,
//               pages: pages,
//             },
//           };
//           res.json(result);
//         }
//       );
// }
// router.get("/", (req, res) => {
//   let filter = req.query.filter || "";
//   let limit = req.query.limit || 20;
//   let page = req.query.page || 1;
//   let offset = (page - 1) * limit || 0;
//   connection.query(
//     'SELECT id,first_name,last_name,notes FROM customers\
//       where concat(first_name," ", last_name) like ?\
//        order by last_name,first_name limit ? offset ?;\
//       select count(*) as count from customers where concat(first_name," ", last_name) like ?;',
//     [`%${filter}%`, +limit, +offset, `%${filter}%`],
//     (err, results) => {
//       if (err) {
//         res.status(500).send("Error fetching customers" + err.stack);
//         return;
//       }
//       const customers = results[0];
//       const total = results[1][0].count;
//       const pages = Math.ceil(total / limit);
//       let result = {
//         customers: customers,
//         totals: {
//           total: total,
//           per_page: +limit,
//           page: +page,
//           next_page: +page + 1 > pages ? pages : +page + 1,
//           prev_page: +page - 1 < 1 ? 1 : +page - 1,
//           pages: pages,
//         },
//       };
//       res.json(result);
//     }
//   );
// });

// // get all customers. let tanstack query handle pagination
// router.get("/full", (req, res) => {
//   var offset = (req.query.page - 1) * 50;
//   if (!req.query.page) offset = 0;
//   connection.query(
//     "SELECT id,first_name,last_name,notes FROM customers order by last_name, first_name",
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query: " + err.stack);
//         res.status(500).send("Error fetching customers");
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// // get one customer note: this has been simplified
// router.get("/:id", (req, res) => {
//   connection.query(
//     "SELECT id,first_name,last_name,notes FROM customers WHERE id=?;",
//     [req.params.id],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query: " + err.stack);
//         res.status(500).send("Error fetching customer" + err);
//         return;
//       }
//       let customer = {
//         customer: results[0],
//       };
//       res.json(customer);
//     }
//   );
// });

// //get cars by customer_id ie cars for bob johnson
// router.get("/:id/cars", (req, res) => {
//   connection.query(
//     "SELECT cars.id,cars.customer_id,cars.year,cars.make,cars.model,cars.engine,cars.vin,\
//     cars.license,cars.fleet_no,cars.notes from cars where cars.customer_id=?;",
//     [req.params.id],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query: " + err.stack);
//         res.status(500).send("Error fetching car");
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// //get phones by customer_id ie phones for bob johnson
// router.get("/:id/phones", (req, res) => {
//   connection.query(
//     "SELECT id,customer_id,phone_type,phone_number from phones where customer_id=?;",
//     [req.params.id],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query: " + err.stack);
//         res.status(500).send("Error fetching phone" + err);
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// // create customer
// router.post("/", (req, res) => {
//   const customer = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     notes: req.body.notes,
//   };
//   connection.query(
//     "insert into customers(first_name,last_name,notes) values(?,?,?);",
//     [customer.first_name, customer.last_name, customer.notes],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query: " + err.stack);
//         res.status(500).send("Error fetching customers");
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// // edit customer
// router.put("/:id", (req, res) => {
//   const customer = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     notes: req.body.notes,
//   };
//   connection.query(
//     "update customers set first_name=?, last_name=?,notes=? where id=?;",
//     [customer.first_name, customer.last_name, customer.notes, req.params.id],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query: " + err.stack);
//         res.status(500).send("Error fetching customers" + err);
//         return;
//       }
//       connection.query(
//         "select first_name,last_name,notes from customers where id=?",
//         [req.params.id],
//         (err, results) => {
//           if (err) {
//             console.error("Error executing query: " + err.stack);
//             res.status(500).send("Error fetching customers" + err);
//           }
//           res.json(results[0]);
//         }
//       );
//     }
//   );
// });

// //delete customer probably not gonna use this
// router.delete("/:id", (req, res) => {
//   connection.query(
//     "delete from customers where id = ?;",
//     [req.params.id],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing query: " + err.stack);
//         res.status(500).send("Error fetching customers");
//         return;
//       }
//       res.json(results);
//     }
//   );
// });

// module.exports = router;
