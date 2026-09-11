import { Phone } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// phones section

// create phone for a customer
export const createPhone = async (formData: FormData) => {
  const customer_id = formData.get("customer_id");
  const type = String(formData.get("type") ?? "");
  const number = String(formData.get("number") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/phones`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, number, customer_id }),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create phone",
      success: false,
      phone: null,
    };
  }
  return { success: true, error: null, phone: await res.json() };
};

// update phone for a customer
export const updatePhone = async (formData: FormData) => {
  const id = formData.get("id");
  const customer_id = formData.get("customer_id");
  const type = String(formData.get("type") ?? "");
  const number = String(formData.get("number") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/phones/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, number, customer_id }),
  });
  console.log("updatePhone response:", res);
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update phone",
      success: false,
      phone: null,
    };
  }

  return { success: true, error: null, phone: await res.json() };
};

// save phone form data (create or update)
export const savePhone = async (
  prevState: { error: string | null; success: boolean; phone: Phone | null },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updatePhone(formData);
    if (res.success && res.phone) {
      revalidatePath(`/customers/${res.phone.customer_id}`);
    }
    return res;
  } else {
    const res = await createPhone(formData);
    if (res.success && res.phone) {
      revalidatePath(`/customers/${res.phone.customer_id}`);
    }
    return res;
  }
};

// delete phone by id
export const deletePhone = async (id: number, customerId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/phones/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete phone:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete phone (${res.status})`);
  }
  revalidatePath(`/customers/${customerId}`);
};
