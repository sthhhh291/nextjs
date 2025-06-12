import api_base from "./base_url";

interface parts_list_create {
  description: string;
  mfr_no: string;
  part_no: string;
}

interface parts_list extends parts_list_create {
  id: number;
}

export const get_parts = async function () {
  const res = await fetch(api_base + `/part_list`);
  const data = await res.json();
  console.log("parts_list", data);
  return data;
};

export const get_part = async function (id: number) {
  const res = await fetch(api_base + `/part_list/${id}`);
  const data = await res.json();
  return data;
};

export const add_part = async function (values: parts_list_create) {
  const res = await fetch(api_base + `/part_list/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();

  return data.part_list;
};

export const edit_part = async function (initialValues: parts_list) {
  const res = await fetch(api_base + `/part_list/${initialValues.id}`, {
    method: "PUT",
    body: JSON.stringify(initialValues),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const delete_part = async function (part_list: parts_list) {
  const res = await fetch(api_base + `/part_list/${part_list.id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
