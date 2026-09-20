"use server";

import { PartsOrder } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";
// parts_order section
// get all parts_order with pagination and optional search term
export const getPartsOrder = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/parts_order`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch parts_order:", res.statusText);
    throw new Error("Failed to fetch parts_order");
  }
  const data = await res.json();
  return data;
};

// get a single parts_order by id
export const getPartsOrderById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid customer ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

 const res = await fetch(`${baseUrl}/parts_order/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch parts_order:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch parts_order (${res.status})`);
  }

  return res.json();
};

// create a new parts_order
export const createPartsOrder = async (formData: FormData) => {
  const mfr_no = formData.get("mfr_no");
  const part_no = String(formData.get("part_no") ?? "");
  const description = String(formData.get("description") ?? "");
  const price = String(formData.get("price") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  
  const res = await fetch(`${baseUrl}/parts_order`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mfr_no,
      part_no,
      description,
      price
    }),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create parts_order",
      success: false,
      parts_order: null,
    };
  }
  return { success: true, error: null, parts_order: await res.json() };
};

// update parts_order for a customer
export const updatePartsOrder = async (formData: FormData) => {
  // const id = formData.get("id");
  const mfr_no = formData.get("mfr_no");
  const part_no = String(formData.get("part_no") ?? "");
  const description = String(formData.get("description") ?? "");
  const price = String(formData.get("price") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/parts_order/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mfr_no,
      part_no,
      description,
      price
    }),
  });
  console.log("updatePartsOrder response:", res);
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update parts_order",
      success: false,
      parts_order: null,
    };
  }

  return { success: true, error: null, parts_order: await res.json() };
};

// save parts_order form data (create or update)
export const savePartsOrder = async (
  prevState: {
    error: string | null;
    success: boolean;
    parts_order: PartsOrder | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updatePartsOrder(formData);
    if (res.success && res.parts_order) {
      revalidatePath(`/customers/${res.parts_order.customer_id}`);
    }
    return res;
  } else {
    const res = await createPartsOrder(formData);
    if (res.success && res.parts_order) {
      revalidatePath(`/customers/${res.parts_order.customer_id}`);
    }
    return res;
  }
};

// delete a parts_order by id
export const deletePartsOrder = async (id: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/parts_order/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete parts_order:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete parts_order (${res.status})`);
  }
  revalidatePath(`/`);
};
