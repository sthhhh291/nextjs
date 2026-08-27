"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// authentication actions
export const login = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // console.log("Logging in with:", { username });
  console.log("Base URL:", baseUrl + "/auth/login");

  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    console.error("Login failed:", res.statusText);
    throw new Error("Login failed");
  }
  const data = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("access_token", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: data.expires_in, // Set the cookie expiration based on the token's expiration
  });
  cookieStore.set("username", username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  cookieStore.set("is_admin", data.is_admin.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  redirect("/"); // Redirect to the home page after successful login
  // return data;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("username");
  cookieStore.delete("is_admin");
  redirect("/login"); // Redirect to the login page after logout
};

// customer actions

// create customer
export const createCustomer = async (formData: FormData) => {
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const notes = formData.get("notes") as string;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
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
    return data;
  }

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
    return data;
  }

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
  console.log("Fetched customers:", data.items);
  console.log("pagination info:", data.total, data.page, data.size, data.pages);
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

  return res.json();
};

export const getCustomerPhones = async (customerId: number) => {  
  if(!Number.isInteger(customerId) || customerId < 1) {
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
  }
