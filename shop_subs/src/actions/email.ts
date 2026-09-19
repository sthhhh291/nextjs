"use server";

import { Email } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// emails section

// create email for a customer
export const createEmail = async (formData: FormData) => {
  const customer_id = formData.get("customer_id");
  const address = String(formData.get("address") ?? "");
  const type = String(formData.get("type") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, address, customer_id }),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create email",
      success: false,
      email: null,
    };
  }
  return { success: true, error: null, email: await res.json() };
};

// update email for a customer
export const updateEmail = async (formData: FormData) => {
  const id = formData.get("id");
  const customer_id = formData.get("customer_id");
  const address = String(formData.get("address") ?? "");
  const number = String(formData.get("number") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/emails/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address, number, customer_id }),
  });
  console.log("updateEmail response:", res);
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update email",
      success: false,
      email: null,
    };
  }

  return { success: true, error: null, email: await res.json() };
};

// save email form data (create or update)
export const saveEmail = async (
  prevState: { error: string | null; success: boolean; email: Email | null },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateEmail(formData);
    if (res.success && res.email) {
      revalidatePath(`/customers/${res.email.customer_id}`);
    }
    return res;
  } else {
    const res = await createEmail(formData);
    if (res.success && res.email) {
      revalidatePath(`/customers/${res.email.customer_id}`);
    }
    return res;
  }
};

// delete email by id
export const deleteEmail = async (id: number, customerId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/emails/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete email:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete email (${res.status})`);
  }
  revalidatePath(`/customers/${customerId}`);
};
