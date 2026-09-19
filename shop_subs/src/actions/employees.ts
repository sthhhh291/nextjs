"use server";

import { Employee } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// employees section
// get all employees with pagination and optional search term
export const getEmployees = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/employees`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch employees:", res.statusText);
    throw new Error("Failed to fetch employees");
  }
  const data = await res.json();
  return data;
};

// get a single employee by id
export const getEmployeeById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid customer ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/employees/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch employee:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch employee (${res.status})`);
  }

  return res.json();
};

// create a new employee
export const createEmployee = async (formData: FormData) => {
  const customer_id = formData.get("customer_id");
  const title = String(formData.get("title") ?? "");
  const salary = String(formData.get("salary") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/employees`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customer_id, title, salary }),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create employee",
      success: false,
      employee: null,
    };
  }
  return { success: true, error: null, employee: await res.json() };
};

// update employee for a customer
export const updateEmployee = async (formData: FormData) => {
  const id = formData.get("id");
  const customer_id = formData.get("customer_id");
  // const first_name = String(formData.get("first_name") ?? "");
  // const last_name = String(formData.get("last_name") ?? "");
  const title = String(formData.get("title") ?? "");
  const salary = String(formData.get("salary") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/employees/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_id,
      title,
      salary,
    }),
  });
  // const res2 = await fetch(`${baseUrl}/customers/${customer_id}`, {
  //   method: "PUT",
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     first_name,
  //     last_name,
  //   }),
  // });
  console.log("updateEmployee response:", res);
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update employee",
      success: false,
      employee: null,
    };
  }

  return { success: true, error: null, employee: await res.json() };
};

// save employee form data (create or update)
export const saveEmployee = async (
  prevState: {
    error: string | null;
    success: boolean;
    employee: Employee | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateEmployee(formData);
    if (res.success && res.employee) {
      revalidatePath(`/customers/${res.employee.customer_id}`);
    }
    return res;
  } else {
    const res = await createEmployee(formData);
    if (res.success && res.employee) {
      revalidatePath(`/customers/${res.employee.customer_id}`);
    }
    return res;
  }
};

// delete a employee by id
export const deleteEmployee = async (id: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/employees/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete employee:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete employee (${res.status})`);
  }
  revalidatePath(`/`);
};
