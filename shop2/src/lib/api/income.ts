import api_base from "./base_url";

interface incomeCreate {
  description: string;
  date: string;
  type: string;
  amount: number;
}

interface income extends incomeCreate {
  id: number;
}

export const get_incomes = async function () {
  // export const get_incomes = async function (filter,page,limit) { // removed pagination for now
  const res = await fetch(api_base + `/income`);
  // const res = await fetch(api_base + `/income?filter=${filter}&page=${page}&limit=${limit}`)
  const data = await res.json();
  return data;
};

export const get_income = async function (id: number) {
  // 'sub_id', id;
  const res = await fetch(api_base + `/income/${id}`);
  const data = await res.json();
  return data;
};

export const add_income = async function (values: incomeCreate) {
  // ('values',values)
  const res = await fetch(api_base + `/income/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const edit_income = async function (initialValues: income) {
  // ('editsubestimate',initialValues,'subid',initialValues.id)
  const res = await fetch(api_base + `/income/${initialValues.id}`, {
    method: "PUT",
    body: JSON.stringify(initialValues),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  return data;
};

export const delete_income = async function (income: income) {
  // ('deletesub',income.id)
  const res = await fetch(api_base + `/income/${income.id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

// const fetchincomes = async() => {
//     const res = await fetch(api_base + `/incomes?filter=${filter}&page=${page}&limit=${limit}`)
//     const data = await res.json();
//     // (data)
//     setincomes(data.incomes)
//     setTotals(data.totals)
// }
