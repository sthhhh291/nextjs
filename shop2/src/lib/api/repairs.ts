import api_base from "./base_url";

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

export const get_repair_orders = async function (
  customerFilter: string,
  carFilter: string,
  repair_orderFilter: string,
  page: number,
  limit: number
) {
  const res = await fetch(
    api_base +
      `/repair_orders?customer=${customerFilter}&car=${carFilter}&page=${page}\
      &repair_order=${repair_orderFilter}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};

export const get_repair_orders_full = async function () {
  const res = await fetch(api_base + `/repair_orders/full`);
  const data = await res.json();
  return data;
};

export const get_repair_order = async function (id: number) {
  const res = await fetch(api_base + `/repair_orders/${id}`);
  const data = await res.json();
  return data;
};

export const get_repair_order_customer = async function (id: number) {
  const res = await fetch(api_base + `/repair_orders/${id}/customer`);
  const data = await res.json();
  return data;
};

export const get_repair_order_phones = async function (id: number) {
  const res = await fetch(api_base + `/repair_orders/${id}/phones`);
  const data = await res.json();
  return data;
};

export const get_repair_order_car = async function (id: number) {
  const res = await fetch(api_base + `/repair_orders/${id}/car`);
  const data = await res.json();
  return data;
};

export const get_repair_order_labor = async function (id: number) {
  const res = await fetch(api_base + `/repair_orders/${id}/labor`);
  const data = await res.json();
  return data;
};

export const get_repair_order_parts = async function (id: number) {
  const res = await fetch(api_base + `/repair_orders/${id}/parts`);
  const data = await res.json();
  return data;
};

export const get_repair_order_oil = async function (id: number) {
  const res = await fetch(api_base + `/repair_orders/${id}/oil`);
  const data = await res.json();
  return data;
};

export const get_repair_order_employee = async function (id: number) {
  const res = await fetch(api_base + `/repair_orders/${id}/employee`);
  const data = await res.json();
  return data;
};

export const get_repair_order_totals = async function (id: number) {
  const res = await fetch(api_base + `/repair_orders/${id}/totals`);
  const data = await res.json();
  return data;
};

export const add_repair_order = async function (values: estimateCreate) {
  const res = await fetch(api_base + `/repair_orders/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const edit_repair_order = async function (initialValues: estimate) {
  // ('init',initialValues.id)
  const res = await fetch(api_base + `/repair_orders/${initialValues.id}`, {
    method: "PUT",
    body: JSON.stringify(initialValues),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const delete_repair_order = async function (repair_order: estimate) {
  const res = await fetch(api_base + `/repair_orders/${repair_order.id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export const change_car = async (car_id: number, repair_order_id: number) => {
  const res = await fetch(
    api_base + `/repair_orders/${repair_order_id}/newcar`,
    {
      method: "PUT",
      body: JSON.stringify({ car_id: car_id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const data = await res.json();
  return data;
};
