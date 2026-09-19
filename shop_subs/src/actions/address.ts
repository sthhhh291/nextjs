"use server";

import { Address } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";


// create address for a customer
export const createAddress = async (formData: FormData) => {
  const customer_id = formData.get("customer_id");
  const street = String(formData.get("street") ?? "");
  const city = String(formData.get("city") ?? "");
  const state = String(formData.get("state") ?? "");
  const zip_code = String(formData.get("zip_code") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/addresses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customer_id, street,city,state,zip_code}),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create address",
      success: false,
      address: null,
    };
  }
  return { success: true, error: null, address: await res.json() };
};

// update address for a customer
export const updateAddress = async (formData: FormData) => {
  const id = formData.get("id");
  const customer_id = formData.get("customer_id");
  const street = String(formData.get("street") ?? "");
  const city = String(formData.get("city") ?? "");
  const state = String(formData.get("state") ?? "");
  const zip_code = String(formData.get("zip_code") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/addresses/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customer_id, street,city,state,zip_code}),
  });
  console.log("updateAddress response:", res);
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update address",
      success: false,
      address: null,
    };
  }

  return { success: true, error: null, address: await res.json() };
};

// save address form data (create or update)
export const saveAddress = async (
  prevState: { error: string | null; success: boolean; address: Address | null },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateAddress(formData);
    if (res.success && res.address) {
      revalidatePath(`/customers/${res.address.customer_id}`);
    }
    return res;
  } else {
    const res = await createAddress(formData);
    if (res.success && res.address) {
      revalidatePath(`/customers/${res.address.customer_id}`);
    }
    return res;
  }
};

// delete address by id
export const deleteAddress = async (id: number, customerId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/addresses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete address:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete address (${res.status})`);
  }
  revalidatePath(`/customers/${customerId}`);
};
