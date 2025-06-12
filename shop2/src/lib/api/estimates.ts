import api_base from "./base_url";
// import { estimate, estimateCreate } from '../types';

interface estimateCreate {
  car_id: number;
  date: string;
  employee_id: number;
  miles: number;
  hours_taken: number;
  pub_notes: string;
  priv_notes: string;
}

interface estimate extends estimateCreate {
  id: number;
  labor?: unknown[];
  parts?: unknown[];
  oil?: unknown[];
  totals?: unknown;
}

export const get_estimates = async function (
  customerFilter: string,
  carFilter: string,
  estimateFilter: string,
  page: number,
  limit: number
) {
  const res = await fetch(
    api_base +
      `/estimates?customer=${customerFilter}&car=${carFilter}&page=${page}\
      &estimate=${estimateFilter}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};

export const get_estimates_full = async function () {
  const res = await fetch(api_base + `/estimates/full`);
  const data = await res.json();
  return data;
};

export const get_estimate = async function (id: number) {
  const res = await fetch(api_base + `/estimates/${id}`);
  const data = await res.json();
  return data;
};

export const get_estimate_customer = async function (id: number) {
  const res = await fetch(api_base + `/estimates/${id}/customer`);
  const data = await res.json();
  return data;
};

export const get_estimate_phones = async function (id: number) {
  const res = await fetch(api_base + `/estimates/${id}/phones`);
  const data = await res.json();
  return data;
};

export const get_estimate_car = async function (id: number) {
  const res = await fetch(api_base + `/estimates/${id}/car`);
  const data = await res.json();
  return data;
};

export const get_estimate_labor = async function (id: number) {
  const res = await fetch(api_base + `/estimates/${id}/labor`);
  const data = await res.json();

  return data;
};

export const get_estimate_parts = async function (id: number) {
  const res = await fetch(api_base + `/estimates/${id}/parts`);
  const data = await res.json();

  return data;
};

export const get_estimate_oil = async function (id: number) {
  const res = await fetch(api_base + `/estimates/${id}/oil`);
  const data = await res.json();

  return data;
};

export const get_estimate_employee = async function (id: number) {
  const res = await fetch(api_base + `/estimates/${id}/employee`);
  const data = await res.json();
  return data;
};

export const get_estimate_totals = async function (id: number) {
  const res = await fetch(api_base + `/estimates/${id}/totals`);
  const data = await res.json();
  return data;
};

export const add_estimate = async function (values: estimateCreate) {
  // 'estimatevalues', values;
  const res = await fetch(api_base + `/estimates/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const edit_estimate = async function (initialValues: estimate) {
  // ('init',initialValues.id)
  const res = await fetch(api_base + `/estimates/${initialValues.id}`, {
    method: "PUT",
    body: JSON.stringify(initialValues),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const delete_estimate = async function (estimate: estimate) {
  const res = await fetch(api_base + `/estimates/${estimate.id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export const change_car = async (car_id: number, estimate_id: number) => {
  const res = await fetch(api_base + `/estimates/${estimate_id}/newcar`, {
    method: "PUT",
    body: JSON.stringify({ car_id: car_id }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const convert_to_repair = async (
  estimate_id: number,
  date: string,
  employee_id: number,
  car_id: number
) => {
  const res = await fetch(api_base + `/estimates/${estimate_id}/convert`, {
    method: "POST",
    body: JSON.stringify({ date, employee_id, car_id }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};
