import api_base from './base_url';

interface part {
  id?: number;
  estimate_id: number;
  description: string;
  mfr_no: string;
  part_no: string;
  quantity: number;
  cost: number;
  list: number;
  price: number;
}

export const get_parts = async function (
  filter: string,
  page: number,
  limit: number
) {
  const res = await fetch(
    api_base + `/parts?filter=${filter}&page=${page}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};

export const get_part = async function (id: number) {
  const res = await fetch(api_base + `/parts/${id}`);
  const data = await res.json();
  return data;
};

export const add_part = async function (values: part) {
  // ('values',values)
  const res = await fetch(api_base + `/parts/`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  return data;
};

export const edit_part = async function (initialValues: part) {
  const res = await fetch(api_base + `/parts/${initialValues.id}`, {
    method: 'PUT',
    body: JSON.stringify(initialValues),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  return data;
};

export const delete_part = async function (part: part) {
  // ('deletesub',part.id)
  const res = await fetch(api_base + `/parts/${part.id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};
