"use server";

import { Customer } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// create customer
export const createCustomer = async (formData: FormData) => {
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const notes = formData.get("notes") as string;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  try {
    const res = await fetch(`${baseUrl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ first_name, last_name, notes }),
    });
    if (!res.ok) {
      console.error("Failed to create customer:", res.statusText);
      throw new Error("Failed to create customer");
    }
    const data = await res.json();
    console.log("Created customer:", data);
    return { error: null, success: true, customer: data };
  } catch (error) {
    return { error: (error as Error).message, success: false, customer: null };
  }
};

//   update customer
export const updateCustomer = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const notes = formData.get("notes") as string;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ first_name, last_name, notes }),
  });
  if (!res.ok) {
    console.error("Failed to update customer:", res.statusText);
    throw new Error("Failed to update customer");
  }
  const data = await res.json();
  console.log("Updated customer:", data);
  return { error: null, success: true, customer: data };
};

//save customer form data (create or update)
export const saveCustomer = async (
  prevState: {
    error: string | null;
    success: boolean;
    customer: Customer | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") as string | null;
  if (id) {
    const res = await updateCustomer(formData);
    if (res.success) {
      revalidatePath(`/customers/${id}`);
    }
    return res;
  } else {
    const res = await createCustomer(formData);
    if (res.success) {
      redirect(`/customers/${res.customer?.id}`);
    }
    return res;
  }
};

// search for customers with pagination and optional search term
export const getCustomers = async (
  page: number = 1,
  size: number = 20,
  searchTerm: string = "",
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(
    `${baseUrl}/customers?page=${page}&size=${size}&searchTerm=${searchTerm}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!res.ok) {
    console.error("Failed to fetch customers:", res.statusText);
    throw new Error("Failed to fetch customers");
  }
  const data = await res.json();
  // console.log("Fetched customers:", data.items);
  // console.log("pagination info:", data.total, data.page, data.size, data.pages);
  // return {error: null, success: true, customers: data};
  return data;
};

// get a single customer by id
export const getCustomerById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid customer ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/customers/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch customer:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch customer (${res.status})`);
  }

  // return {error: null, success: true, customer: await res.json()};
  return res.json();
};

// get customer phones by customer id
export const getCustomerPhones = async (customerId: number) => {
  if (!Number.isInteger(customerId) || customerId < 1) {
    throw new Error("Invalid customer ID");
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/customers/${customerId}/phones`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch customer phones:", res.statusText);
    throw new Error("Failed to fetch customer phones");
  }
  return res.json();
};

// get customer addresses by customer id
export const getCustomerAddresses = async (customerId: number) => {
  if (!Number.isInteger(customerId) || customerId < 1) {
    throw new Error("Invalid customer ID");
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/customers/${customerId}/addresses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch customer addresses:", res.statusText);
    throw new Error("Failed to fetch customer addresses");
  }
  return res.json();
};

// get customer emails by customer id
export const getCustomerEmails = async (customerId: number) => {
  if (!Number.isInteger(customerId) || customerId < 1) {
    throw new Error("Invalid customer ID");
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/customers/${customerId}/emails`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch customer emails:", res.statusText);
    throw new Error("Failed to fetch customer emails");
  }
  return res.json();
};

// get customer cars by customer id
export const getCustomerCars = async (customerId: number) => {
  if (!Number.isInteger(customerId) || customerId < 1) {
    throw new Error("Invalid customer ID");
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/customers/${customerId}/cars`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch customer cars:", res.statusText);
    throw new Error("Failed to fetch customer cars");
  }
  return res.json();
};

// delete a customer by id
export const deleteCustomer = async (id: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/customers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to delete customer:", res.statusText);
    throw new Error("Failed to delete customer");
  }
  console.log("Deleted customer with id:", id);
};
