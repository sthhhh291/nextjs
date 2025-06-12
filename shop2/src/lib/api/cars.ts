// import { car, carCreate, estimate, repair_order } from "../types";
import api_base from "./base_url";
import { get_estimate_labor } from "./estimates";

interface carCreate {
  customer_id: number;
  year: number;
  make: string;
  model: string;
  engine: string;
  vin: string;
  license: string;
  fleet_no: string;
  notes: string;
}

interface car extends carCreate {
  id: number;
  estimates?: estimate[];
  repair_orders?: repair_order[];
}

type estimate = {
  id: number;
  car_id: number;
  date: string;
  labor?: unknown; // Assuming labor is an array of objects, adjust as necessary
  parts?: unknown; // Assuming parts is an array of objects, adjust as necessary
  total?: number; // Assuming total is a number, adjust as necessary
};
type repair_order = {
  id: number;
  car_id: number;
  date: string;
  labor?: unknown; // Assuming labor is an array of objects, adjust as necessary
  parts?: unknown; // Assuming parts is an array of objects, adjust as necessary
  total?: number; // Assuming total is a number, adjust as necessary
};
export const get_cars = async function (
  customerFilter: string,
  carFilter: string,
  page: number,
  limit: number
) {
  const res = await fetch(
    api_base +
      `/cars?customer=${customerFilter}&car=${carFilter}&page=${page}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};

export const get_cars_full = async function () {
  const res = await fetch(api_base + `/cars/full`);
  const data = await res.json();
  return data;
};

export const get_car_vin = async function (vin: string) {
  const res = await fetch(api_base + `/cars/vin?vin=${vin}`);
  const data = await res.json();
  return data;
};

export const get_car = async function (id: number) {
  const res = await fetch(api_base + `/cars/${id}`);
  const data = await res.json();
  return data;
};

export const get_car_customer = async function (id: number) {
  const res = await fetch(api_base + `/cars/${id}/customer`);
  const data = await res.json();
  return data;
};

export const get_car_phones = async function (id: number) {
  const res = await fetch(api_base + `/cars/${id}/phones`);
  const data = await res.json();
  return data;
};

export const get_car_estimates = async function (id: number) {
  const res = await fetch(api_base + `/cars/${id}/estimates`);
  const data = await res.json();
  data.map(async (est: estimate) => {
    const labor = await get_estimate_labor(est.id);
    est.labor = labor;
  });
  return data;
};

export const add_car = async function (values: carCreate) {
  const res = await fetch(api_base + `/cars/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const get_car_repairs = async function (id: number) {
  const res = await fetch(api_base + `/cars/${id}/repair_orders`);
  const data = await res.json();
  data.map(async (est: repair_order) => {
    const labor = await get_estimate_labor(est.id);
    est.labor = labor;
  });
  return data;
};
export const edit_car = async function (initialValues: car, values: car) {
  // 'car_id', initialValues.id;
  const res = await fetch(api_base + `/cars/${initialValues.id}`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const change_owner = async function (
  car_id: number,
  customer_id: number
) {
  const res = await fetch(api_base + `/cars/${car_id}/newperson`, {
    method: "PUT",
    body: JSON.stringify({ customer_id: customer_id }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const delete_car = async function (car: car) {
  const res = await fetch(api_base + `/cars/${car.id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
