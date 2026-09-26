"use server";

import { User } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// markup section
// get all markup with pagination and optional search term
export const getUsers = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/auth/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch markup:", res.statusText);
    throw new Error("Failed to fetch markup");
  }
  const data = await res.json();
  console.log("users", data);
  return data;
};

// get a single markup by id
export const getUserById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid customer ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/auth/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch markup:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch markup (${res.status})`);
  }

  return res.json();
};

// create a new markup
//  id: number;
//   username: string;
//   is_admin: boolean;
//   is_active: boolean;
export const createUser = async (formData: FormData) => {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const is_admin = formData.has("is_admin");
  const is_active = formData.has("is_active");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  console.log("Creating user:", { username, is_admin, is_active });
  const res = await fetch(`${baseUrl}/auth/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      is_admin,
      is_active,
    }),
  });

  const responseBody = await res.text();
  console.log("Create user backend response:", {
    status: res.status,
    statusText: res.statusText,
    body: responseBody,
  });

  if (!res.ok) {
    return {
      error: responseBody || res.statusText || "Failed to create user",
      success: false,
      markup: null,
    };
  }
  return {
    success: true,
    error: null,
    markup: responseBody ? (JSON.parse(responseBody) as User) : null,
  };
};

// update markup for a customer
export const updateUser = async (formData: FormData) => {
  // const id = formData.get("id");
  const username = formData.get("username");
  const is_admin = String(formData.get("is_admin") ?? "");
  const is_active = String(formData.get("is_active") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/auth/users/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      is_admin,
      is_active,
    }),
  });
  console.log("updateUser response:", res);
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update markup",
      success: false,
      markup: null,
    };
  }

  return { success: true, error: null, markup: await res.json() };
};

// save markup form data (create or update)
export const saveUser = async (
  prevState: {
    error: string | null;
    success: boolean;
    markup: User | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateUser(formData);
    if (res.success) {
      revalidatePath("/users");
    }
    return res;
  } else {
    const res = await createUser(formData);
    if (res.success) {
      revalidatePath("/users");
    }
    return res;
  }
};

// delete a markup by id
export const deleteUser = async (id: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/auth/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete markup:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete markup (${res.status})`);
  }
  revalidatePath(`/`);
};
