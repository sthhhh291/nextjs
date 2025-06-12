import api_base from './base_url';

interface labor {
  id?: number;
  estimate_id?: number;
  repair_order_id?: number;
  description: string;
  hours: number;
  price: number;
}

export const get_labors = async function (
  filter: string,
  page: number,
  limit: number
) {
  const res = await fetch(
    api_base + `/labor?filter=${filter}&page=${page}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};

export const get_labor = async function (id: number) {
  const res = await fetch(api_base + `/labor/${id}`);
  const data = await res.json();
  return data;
};

export const add_labor = async function (values: labor) {
  // ('values',values)
  const res = await fetch(api_base + `/labor/`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  console.log('add labor', data);
  return data;
};

export const edit_labor = async function (initialValues: labor) {
  const res = await fetch(api_base + `/labor/${initialValues.id}`, {
    method: 'PUT',
    body: JSON.stringify(initialValues),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  return data;
};

export const delete_labor = async function (labor: labor) {
  // ('deletesub',labor.id)
  const res = await fetch(api_base + `/labor/${labor.id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};
