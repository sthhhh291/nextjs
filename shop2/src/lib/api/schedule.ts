import api_base from "./base_url";

interface scheduleCreate {
  date: string;
  car_id: number;
  description: string;
}

interface schedule extends scheduleCreate {
  id: number;
}

export const get_schedules = async function () {
  const res = await fetch(api_base + `/schedule`);
  const data = await res.json();
  return data;
};

export const get_schedules_by_date = async function (date: string) {
  const res = await fetch(api_base + `/schedule/day/${date}`);
  const data = await res.json();
  return data;
};

export const get_schedule = async function (id: number) {
  const res = await fetch(api_base + `/schedule/${id}`);
  const data = await res.json();
  return data;
};

export const add_schedule = async function (values: scheduleCreate) {
  const res = await fetch(api_base + `/schedule/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const edit_schedule = async function (initialValues: schedule) {
  const res = await fetch(api_base + `/schedule/${initialValues.id}`, {
    method: "PUT",
    body: JSON.stringify(initialValues),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const delete_schedule = async function (schedule: schedule) {
  const res = await fetch(api_base + `/income/${schedule.id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
