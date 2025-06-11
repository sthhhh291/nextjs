import api_base from "./base_url";
// import { customer, customerCreate } from "../types";

interface customerCreate {
  first_name: string;
  last_name: string;
  notes: string;
}

interface customer extends customerCreate {
  id: number;
}

export const get_customers = async function (
  filter: string,
  page: number,
  limit: number
) {
  const res = await fetch(
    api_base + `/customers?filter=${filter}&page=${page}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};

export const get_customers_full = async function () {
  const res = await fetch(api_base + `/customers/full`);
  const data = await res.json();
  return data;
};

export const get_customer = async function (id: number) {
  const res = await fetch(api_base + `/customers/${id}`);
  const data = await res.json();
  return data;
};

export const get_customer_phones = async function (id: number) {
  const res = await fetch(api_base + `/customers/${id}/phones`);
  const data = await res.json();
  return data;
};

export const get_customer_cars = async function (id: number) {
  const res = await fetch(api_base + `/customers/${id}/cars`);
  const data = await res.json();
  return data;
};

export const add_customer = async function (values: customerCreate) {
  const res = await fetch(api_base + `/customers/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const edit_customer = async function (
  initialValues: customer,
  values: customer
) {
  const res = await fetch(api_base + `/customers/${initialValues.id}`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const delete_customer = async function (customer: customer) {
  const res = await fetch(api_base + `/customers/${customer.id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
