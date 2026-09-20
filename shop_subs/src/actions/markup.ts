"use server";

import { Markup } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// markup section
// get all markup with pagination and optional search term
export const getMarkup = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/markups`, {
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
  return data;
};

// get a single markup by id
export const getMarkupById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid customer ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

 const res = await fetch(`${baseUrl}/markups/${id}`, {
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
export const createMarkup = async (formData: FormData) => {
  const markup_factor = formData.get("markup_factor");
  const amount = String(formData.get("amount") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/markups`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      markup_factor,
      amount,
    }),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create markup",
      success: false,
      markup: null,
    };
  }
  return { success: true, error: null, markup: await res.json() };
};

// update markup for a customer
export const updateMarkup = async (formData: FormData) => {
  // const id = formData.get("id");
  const markup_factor = formData.get("markup_factor");
  const amount = String(formData.get("amount") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/markups/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      markup_factor,
      amount,
    }),
  });
  console.log("updateMarkup response:", res);
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
export const saveMarkup = async (
  prevState: {
    error: string | null;
    success: boolean;
    markup: Markup | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateMarkup(formData);
    if (res.success && res.markup) {
      revalidatePath(`/customers/${res.markup.customer_id}`);
    }
    return res;
  } else {
    const res = await createMarkup(formData);
    if (res.success && res.markup) {
      revalidatePath(`/customers/${res.markup.customer_id}`);
    }
    return res;
  }
};

// delete a markup by id
export const deleteMarkup = async (id: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/markups/${id}`, {
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
