import api_base from './base_url';

// description: '',
//       estimate_id: estimateId,
//       laborHours: 0,
//       laborPrice: 0,
//       quantity: 1,
//       cost: 0,
//       list: 0,
//       price: 0,

interface sub_estimate {
  id?: number;
  estimate_id: number;
  laborHours: number;
  laborPrice: number;
  quantity: number;
  cost: number;
  list: number;
  price: number;
}

export const get_sub_estimates = async function (
  filter: string,
  page: number,
  limit: number
) {
  const res = await fetch(
    api_base + `/sub_estimates?filter=${filter}&page=${page}&limit=${limit}`
  );
  const data = await res.json();
  return data;
};

export const get_sub_estimate = async function (id: number) {
  const res = await fetch(api_base + `/sub_estimates/${id}`);
  const data = await res.json();
  return data;
};

export const add_sub_estimate = async function (values: sub_estimate) {
  // ('values',values)
  const res = await fetch(api_base + `/sub_estimates/`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  return data;
};

export const edit_sub_estimate = async function (initialValues: sub_estimate) {
  const res = await fetch(api_base + `/sub_estimates/${initialValues.id}`, {
    method: 'PUT',
    body: JSON.stringify(initialValues),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data = await res.json();
  return data;
};

export const delete_sub_estimate = async function (sub_estimate: sub_estimate) {
  // ('deletesub',sub_estimate.id)
  const res = await fetch(api_base + `/sub_estimates/${sub_estimate.id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};

// const fetchsub_estimates = async() => {
//     const res = await fetch(api_base + `/sub_estimates?filter=${filter}&page=${page}&limit=${limit}`)
//     const data = await res.json();
//     // (data)
//     setsub_estimates(data.sub_estimates)
//     setTotals(data.totals)
// }
