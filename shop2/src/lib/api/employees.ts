import api_base from './base_url';

export const get_employees = async function () {
  const res = await fetch(api_base + '/employees');
  const data = await res.json();
  return data.employees;
};
