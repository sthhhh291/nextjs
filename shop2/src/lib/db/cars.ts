import { ResultSetHeader } from "mysql2";
import db from "./db";

// get all cars with pagination
export const getcars = async (filter: string, limit: number, page: number) => {
  const offset = (page - 1) * limit || 0;
  const carsSql = `SELECT id,year,make,model,engine,vin\
    FROM cars
    WHERE concat(year, " ", make, " ", model, " ", engine, " ", vin) \
    LIKE ?
    ORDER BY year desc, make, model LIMIT ? OFFSET ?`;
  const countSql = `SELECT count(*) as count FROM cars\
    WHERE concat(year, " ", make, " ", model, " ", engine, " ", vin) LIKE ?`;
  const carsParams = [`%${filter}%`, +limit, +offset];
  const countParams = [`%${filter}%`];

  const [results] = await db.query(carsSql, carsParams);
  const [countRows] = await db.query(countSql, countParams);
  const cars: car[] = results as car[];
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
    cars,
    totals,
  };
};

// get one car
export const getcar = async (id: number) => {
  const carSql = `SELECT id, customer_id, year,make,model,engine,vin,license,fleet_no\
    FROM cars
    WHERE id=?`;
  const carParams = [id];

  const [results] = await db.query(carSql, carParams);
  const cars = results as car[];
  const car: car = cars[0];
  return car;
};

// get all estimates for 1 car
export const getCarEstimates = async (id: number) => {
  const estimateSql =
    "SELECT id,car_id,employee_id,date,miles,hours_taken,priv_notes,pub_notes\
    from estimates where estimates.estimate_id=?;";
  const estimateParams = [id];

  const [results] = await db.query(estimateSql, estimateParams);
  const estimates: estimate[] = results as estimate[];
  return estimates;
};

// get all repairs for 1 car
export const getCarRepairs = async (id: number) => {
  const repairSql =
    "SELECT id,car_id,employee_id,date,miles,hours_taken,priv_notes,pub_notes\
    from repair_orders where id=?;";
  const repairParams = [id];

  const [results] = await db.query(repairSql, repairParams);
  const repairs: estimate[] = results as estimate[];
  return repairs;
};

//create car
export const createcar = async (
  customer_id: number,
  year: string,
  make: string,
  model: string,
  engine: string,
  vin: string,
  license: string,
  fleet_no: string
) => {
  const sql =
    "INSERT INTO cars(customer_id,year,make,model,engine,vin,license,fleet_no)\
                values(?,?,?,?,?,?,?,?)";
  const params = [
    customer_id,
    year,
    make,
    model,
    engine,
    vin,
    license,
    fleet_no,
  ];
  const [results] = await db.query<ResultSetHeader>(sql, params);
  console.log("results", results);
  const insertId = results.insertId;
  const newcar = await getcar(insertId);
  console.log("new car", newcar);
};

//edit car
export const editcar = async (
  customer_id: number,
  year: string,
  make: string,
  model: string,
  engine: string,
  vin: string,
  license: string,
  fleet_no: string,
  id: number
) => {
  const sql =
    "UPDATE cars SET customer_id=?, year=?, make=?,model=?\
    ,engine=?,vin=?,license=?, fleet_no=? WHERE id=?";
  const params = [
    customer_id,
    year,
    make,
    model,
    engine,
    vin,
    license,
    fleet_no,
    id,
  ];
  const [results] = await db.query<ResultSetHeader>(sql, params);
  console.log("updated car", results);
  const newcar = await getcar(id);
  console.log("updated car", newcar);
};

//delete car
export const deletecar = async (id: number) => {
  const sql = "DELETE FROM cars WHERE id=?";
  const params = [id];
  await db.query(sql, params);
};
