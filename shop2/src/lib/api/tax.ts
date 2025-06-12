import api_base from "./base_url";

interface tax_create {
  value: string;
}
interface tax extends tax_create {
  id: number;
}

export const get_tax = async function () {
  const res = await fetch(api_base + `/tax`);
  const data = await res.json();
  console.log("get_tax", data);
  return data;
};

export const add_tax = async function (values: tax_create) {
  const res = await fetch(api_base + `/tax/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const edit_tax = async function (initialValues: tax) {
  const res = await fetch(api_base + `/tax`, {
    method: "PUT",
    body: JSON.stringify(initialValues),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const delete_tax = async function () {
  const res = await fetch(api_base + `/income`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
