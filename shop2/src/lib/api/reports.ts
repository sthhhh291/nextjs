import api_base from './base_url';

export const get_report_month = async function (year: number) {
  const res = await fetch(api_base + `/reports/${year}/month`);
  const data = await res.json();
  return data;
};

export const get_report_quarter = async function (year: number) {
  const res = await fetch(api_base + `/reports/${year}}/quarter/`);
  const data = await res.json();
  return data;
};

export const get_report_week = async function (year: number) {
  const res = await fetch(api_base + `/reports/${year}/week`);
  const data = await res.json();
  return data;
};

export const get_report_employee_month = async function (year: number) {
  const res = await fetch(api_base + `/reports/${year}/employee/month`);
  const data = await res.json();
  return data;
};

// const res = await fetch(`/api/reports/quarter/${year}/${quarter}`)

// export const add_report = async function(values) {
//     const res = await fetch(api_base + `/reports/`, {
//         method: "POST",
//         body:
//         JSON.stringify(values)
//         ,
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//         },
//     })
//     const data = await res.json();
//     return data
// }

// export const edit_report = async function (initialValues,values) {
//     const res = await fetch(api_base + `/reports/${initialValues.initialValues.report.id}`, {
//         method: "PUT",
//         body:
//         JSON.stringify(values)
//         ,
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//         },
//     })
//     const data = await res.json();
//     return data
// }

// export const delete_report = async function (report) {
//     const res = await fetch(api_base + `/reports/${report.report.report.id}`, {
//         method: "DELETE"
//     })
//     const data = await res.json();
//     return data
// }
