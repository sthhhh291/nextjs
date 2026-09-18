"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Part } from "@/types";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// oil area
export const getOils = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access token")?.value;
  const res = await fetch(`${baseUrl}/oil`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch oil:", res.statusText);
    throw new Error("Failed to fetch oil");
  }
  return res.json();
};

// get single oil by id
export const getOilById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid oil ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/oil/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch oil:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch oil (${res.status})`);
  }

  return res.json();
};

// create a new oil
export const createOil = async (formData: FormData) => {
  const sub_estimate_id = Number(formData.get("sub_estimate_id"));
  const description = String(formData.get("description"));
  const manufacturer = String(formData.get("manufacturer"));
  const part_number = String(formData.get("part_number"));
 const quantity = Number(formData.get("quantity") ?? "");
  const cost = Number(formData.get("cost") ?? "");
  const list = Number(formData.get("list") ?? "");
  const price = Number(formData.get("price") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const payload = {
    sub_estimate_id,
    manufacturer,
    part_number,
    description,
    quantity,
    cost,
    list,
    price,
  };

  try {
    const res = await fetch(`${baseUrl}/oil/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Failed to create part", {
        url: `${baseUrl}/oil/`,
        status: res.status,
        statusText: res.statusText,
        response: errorBody,
        responseHeaders: Object.fromEntries(res.headers.entries()),
        payload,
        hasAccessToken: Boolean(accessToken),
      });
      return {
        error: errorBody || res.statusText || "Failed to create oil",
        success: false,
        oil: null,
      };
    }

    const createdOilId = await res.json();
    return {
      success: true,
      error: null,
      oil: typeof createdOilId === "number" ? null : createdOilId,
    };
  } catch (error) {
    console.error("Error while creating part", {
      url: `${baseUrl}/oil/`,
      error,
      payload,
      hasAccessToken: Boolean(accessToken),
    });
    return {
      error: error instanceof Error ? error.message : "Failed to create oil",
      success: false,
      oil: null,
    };
  }
};

// update Oil for a car
export const updateOil = async (formData: FormData) => {
  const id = formData.get("id");
  const sub_estimate_id = Number(formData.get("sub_estimate_id"));
  const description = String(formData.get("description"));
  const manufacturer = String(formData.get("manufacturer"));
  const part_number = String(formData.get("part_number"));
  const quantity = Number(formData.get("quantity") ?? "");
  const cost = Number(formData.get("cost") ?? "");
  const list = Number(formData.get("list") ?? "");
  const price = Number(formData.get("price") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/oil/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sub_estimate_id,
      description,
      manufacturer,
      part_number,
      quantity,
      cost,
      list,
      price,
    }),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to update part", {
      url: `${baseUrl}/oil/${id}`,
      status: res.status,
      statusText: res.statusText,
      response: errorBody,
      payload: {
        manufacturer,
        part_number,
        description,
        quantity,
        cost,
        list,
        price,
      },
      hasAccessToken: Boolean(accessToken),
    });
    return {
      error: errorBody || res.statusText || "Failed to update oil",
      success: false,
      oil: null,
    };
  }

  await res.json();
  return { success: true, error: null, oil: null };
};

// save car form data (create or update)
export const saveOil = async (
  prevState: {
    error: string | null;
    success: boolean;
    oil: Part | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateOil(formData);
    if (res.success && res.oil) {
      revalidatePath("/");
    }
    return res;
  } else {
    const res = await createOil(formData);
    if (res.success && res.oil) {
      revalidatePath("/");
    }
    return res;
  }
};

// delete a car by id
export const deleteOil = async (id: number, carId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/oil/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete oil:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete oil (${res.status})`);
  }
  revalidatePath(`/cars/${carId}`);
};
