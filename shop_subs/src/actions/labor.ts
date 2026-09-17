"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Labor } from "@/types";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// labor area
export const getLabors = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access token")?.value;
  const res = await fetch(`${baseUrl}/labor`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch labor:", res.statusText);
    throw new Error("Failed to fetch labor");
  }
  return res.json();
};

// get single labor by id
export const getLaborById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid labor ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/labor/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch labor:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch labor (${res.status})`);
  }

  return res.json();
};

// create a new labor
export const createLabor = async (formData: FormData) => {
  const sub_estimate_id = Number(formData.get("sub_estimate_id"));
  const description = String(formData.get("description"));
  const hours = Number(formData.get("hours") ?? "");
  const rate = Number(formData.get("rate") ?? "");
  const price = Number(formData.get("price") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/labor`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sub_estimate_id,
      description,
      hours,
      rate,
      price,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    return {
      error: errorBody || res.statusText || "Failed to create labor",
      success: false,
      labor: null,
    };
  }
  return { success: true, error: null, labor: await res.json() };
};

// update Labor for a car
export const updateLabor = async (formData: FormData) => {
  const id = formData.get("id");
  const sub_estimate_id = Number(formData.get("sub_estimate_id"));
  const description = String(formData.get("description"));
  const hours = Number(formData.get("hours") ?? "");
  const rate = Number(formData.get("rate") ?? "");
  const price = Number(formData.get("price") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/labor/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      sub_estimate_id,
      description,
      hours,
      rate,
      price,
    }),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    return {
      error: errorBody || res.statusText || "Failed to update labor",
      success: false,
      labor: null,
    };
  }

  return { success: true, error: null, labor: await res.json() };
};

// save car form data (create or update)
export const saveLabor = async (
  prevState: {
    error: string | null;
    success: boolean;
    labor: Labor | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateLabor(formData);
    if (res.success && res.labor) {
      revalidatePath(`/cars/${res.labor.sub_estimate_id}`);
    }
    return res;
  } else {
    const res = await createLabor(formData);
    if (res.success && res.labor) {
      revalidatePath(`/cars/${res.labor.sub_estimate_id}`);
    }
    return res;
  }
};

// delete a car by id
export const deleteLabor = async (id: number, carId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/labor/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete labor:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete labor (${res.status})`);
  }
  revalidatePath(`/cars/${carId}`);
};
