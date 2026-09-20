"use server";

import { Admin } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// admin section
// get all admin with pagination and optional search term
export const getadmin = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/admin`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch admin:", res.statusText);
    throw new Error("Failed to fetch admin");
  }
  const data = await res.json();
  return data;
};

// get a single admin by id
export const getAdminById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid customer ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/admin/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch admin:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch admin (${res.status})`);
  }

  return res.json();
};

// create a new admin
export const createAdmin = async (formData: FormData) => {
  const tax_rate = formData.get("tax_rate");
  const labor_rate = String(formData.get("labor_rate") ?? "");
  const shop_fees_percent = String(formData.get("shop_fees_percent") ?? "");
  const shop_fees_limit = String(formData.get("shop_fees_limit") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/admin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tax_rate,
      labor_rate,
      shop_fees_limit,
      shop_fees_percent,
    }),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create admin",
      success: false,
      admin: null,
    };
  }
  return { success: true, error: null, admin: await res.json() };
};

// update admin for a customer
export const updateAdmin = async (formData: FormData) => {
  // const id = formData.get("id");
  const tax_rate = formData.get("tax_rate");
  const labor_rate = String(formData.get("labor_rate") ?? "");
  const shop_fees_percent = String(formData.get("shop_fees_percent") ?? "");
  const shop_fees_limit = String(formData.get("shop_fees_limit") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/admin/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tax_rate,
      labor_rate,
      shop_fees_limit,
      shop_fees_percent,
    }),
  });
  console.log("updateAdmin response:", res);
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update admin",
      success: false,
      admin: null,
    };
  }

  return { success: true, error: null, admin: await res.json() };
};

// save admin form data (create or update)
export const saveAdmin = async (
  prevState: {
    error: string | null;
    success: boolean;
    admin: Admin | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateAdmin(formData);
    if (res.success && res.admin) {
      revalidatePath(`/customers/${res.admin.customer_id}`);
    }
    return res;
  } else {
    const res = await createAdmin(formData);
    if (res.success && res.admin) {
      revalidatePath(`/customers/${res.admin.customer_id}`);
    }
    return res;
  }
};

// delete a admin by id
export const deleteAdmin = async (id: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete admin:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete admin (${res.status})`);
  }
  revalidatePath(`/`);
};
