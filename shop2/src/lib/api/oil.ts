import api_base from './base_url';

interface oil {
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

export const get_oils = async function (
  filter: string,
  page: number,
  limit: number
) {
  const res = await fetch(
    api_base + `/oil?filter=${filter}&page=${page}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};

export const get_oil = async function (id: number) {
  const res = await fetch(api_base + `/oil/${id}`);
  const data = await res.json();
  return data;
};

export const add_oil = async function (values: oil) {
  const res = await fetch(api_base + `/oil/`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  return data;
};

export const edit_oil = async function (initialValues: oil) {
  const res = await fetch(api_base + `/oil/${initialValues.id}`, {
    method: 'PUT',
    body: JSON.stringify(initialValues),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  return data;
};

export const delete_oil = async function (oil: oil) {
  const res = await fetch(api_base + `/oil/${oil.id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};
