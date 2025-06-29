import { ResultSetHeader } from "mysql2";
import db from "./db";

// get all repairs with pagination
export const getrepairs = async (
  filter: string,
  limit: number,
  page: number
) => {
  const offset = (page - 1) * limit || 0;
  const repairsSql = `SELECT id,car_id,employee_id,date,miles,hours_taken,priv_notes,pub_notes\
    FROM repair_orders
    WHERE concat(date) \
    LIKE ?
    ORDER BY year desc, make, model LIMIT ? OFFSET ?`;
  const countSql = `SELECT count(*) as count FROM repair_orders\
    WHERE concat(date) LIKE ?`;
  const repairsParams = [`%${filter}%`, +limit, +offset];
  const countParams = [`%${filter}%`];

  const [results] = await db.query(repairsSql, repairsParams);
  const [countRows] = await db.query(countSql, countParams);
  const repairs: estimate[] = results as estimate[];
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
    repairs,
    totals,
  };
};

// get one repair
export const getrepair = async (id: number) => {
  const repairSql = `SELECT id,car_id,employee_id,date,miles,hours_taken,priv_notes,pub_notes\
    FROM repair_orders
    WHERE id=?`;
  const repairParams = [id];

  const [results] = await db.query(repairSql, repairParams);
  const repairs = results as estimate[];
  const repair: estimate = repairs[0];
  return repair;
};

// get all subs for 1 repair
export const getrepairEstimates = async (id: number) => {
  const laborSql =
    "SELECT id,repair_order_id,description,hours,price\
    from labor where labor.repair_order_id=?;";
  const partSql =
    "SELECT id,repair_order_id,description,mfr_no,part_no,quantity,cost,list,price\
    from parts where parts.repair_order_id=?;";
  const estimateParams = [id];
  const oilSql =
    "SELECT id,repair_order_id,description,mfr_no,part_no,quantity,cost,list,price\
    from oil where oil.repair_order_id=?;";
  const [laborResults] = await db.query(laborSql, estimateParams);
  const [partResults] = await db.query(partSql, estimateParams);
  const [oilResults] = await db.query(oilSql, estimateParams);
  const labor: labor[] = laborResults as labor[];
  const parts: part[] = partResults as part[];
  const oil: part[] = oilResults as part[];
  const subs = { labor, parts, oil };
  return subs;
};

// get all repairs for 1 repair
export const getrepairRepairs = async (id: number) => {
  const repairSql =
    "SELECT id,repair_id,employee_id,date,miles,hours_taken,priv_notes,pub_notes\
    from repair_orders where repair_id=?;";
  const repairParams = [id];

  const [results] = await db.query(repairSql, repairParams);
  const repairs: estimate[] = results as estimate[];
  return repairs;
};

//create repair
export const createrepair = async (
  car_id: number,
  employee_id: number,
  date: string,
  miles: string,
  hours_taken: string,
  priv_notes: string,
  pub_notes: string
) => {
  const sql =
    "INSERT INTO repair_orders(car_id,employee_id,date,miles,hours_taken,priv_notes,pub_notes)\
                values(?,?,?,?,?,?,?,?)";
  const params = [
    car_id,
    employee_id,
    date,
    miles,
    hours_taken,
    priv_notes,
    pub_notes,
  ];
  const [results] = await db.query<ResultSetHeader>(sql, params);
  console.log("results", results);
  const insertId = results.insertId;
  const newrepair = await getrepair(insertId);
  console.log("new repair", newrepair);
};

//edit repair
export const editrepair = async (
  car_id: number,
  employee_id: number,
  date: string,
  miles: string,
  hours_taken: string,
  priv_notes: string,
  pub_notes: string,
  id: number
) => {
  const sql =
    "UPDATE repair_orders SET car_id=?, employee_id=?, date=?,miles=?\
    ,hours_taken=?,priv_notes=?,pub_notes=?,  WHERE id=?";
  const params = [
    car_id,
    employee_id,
    date,
    miles,
    hours_taken,
    priv_notes,
    pub_notes,
    id,
  ];
  const [results] = await db.query<ResultSetHeader>(sql, params);
  console.log("updated repair", results);
  const newrepair = await getrepair(id);
  console.log("updated repair", newrepair);
};

//delete repair
export const deleterepair = async (id: number) => {
  const sql = "DELETE FROM repair_orders WHERE id=?";
  const params = [id];
  await db.query(sql, params);
};
