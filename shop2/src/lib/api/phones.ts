import api_base from "./base_url";

interface phoneCreate {
  customer_id: number;
  phone_type: string;
  phone_number: string;
}

interface phone extends phoneCreate {
  id: number;
}

export const get_phone = async function (id: number) {
  const res = await fetch(api_base + `/phones/${id}`);
  const data = await res.json();
  return data;
};

export const add_phone = async function (values: phoneCreate) {
  const res = await fetch(api_base + `/phones/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();

  return data;
};

export const edit_phone = async function (initialValues: phone, values: phone) {
  const res = await fetch(api_base + `/phones/${initialValues.id}`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const delete_phone = async function (phone: phone) {
  const res = await fetch(api_base + `/phones/${phone.id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
