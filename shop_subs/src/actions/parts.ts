"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Part } from "@/types";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// parts area
export const getParts = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access token")?.value;
  const res = await fetch(`${baseUrl}/parts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch parts:", res.statusText);
    throw new Error("Failed to fetch parts");
  }
  return res.json();
};

// get single parts by id
export const getPartById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid parts ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/parts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch parts:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch parts (${res.status})`);
  }

  return res.json();
};

// create a new parts
export const createPart = async (formData: FormData) => {
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
    const res = await fetch(`${baseUrl}/parts/`, {
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
        url: `${baseUrl}/parts/`,
        status: res.status,
        statusText: res.statusText,
        response: errorBody,
        responseHeaders: Object.fromEntries(res.headers.entries()),
        payload,
        hasAccessToken: Boolean(accessToken),
      });
      return {
        error: errorBody || res.statusText || "Failed to create parts",
        success: false,
        parts: null,
      };
    }

    const createdPartId = await res.json();
    return {
      success: true,
      error: null,
      parts: typeof createdPartId === "number" ? null : createdPartId,
    };
  } catch (error) {
    console.error("Error while creating part", {
      url: `${baseUrl}/parts/`,
      error,
      payload,
      hasAccessToken: Boolean(accessToken),
    });
    return {
      error: error instanceof Error ? error.message : "Failed to create parts",
      success: false,
      parts: null,
    };
  }
};

// update Part for a car
export const updatePart = async (formData: FormData) => {
  const id = formData.get("id");
  const description = String(formData.get("description"));
  const manufacturer = String(formData.get("manufacturer"));
  const part_number = String(formData.get("part_number"));
  const quantity = Number(formData.get("quantity") ?? "");
  const cost = Number(formData.get("cost") ?? "");
  const list = Number(formData.get("list") ?? "");
  const price = Number(formData.get("price") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/parts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
      url: `${baseUrl}/parts/${id}`,
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
      error: errorBody || res.statusText || "Failed to update parts",
      success: false,
      parts: null,
    };
  }

  await res.json();
  return { success: true, error: null, parts: null };
};

// save car form data (create or update)
export const savePart = async (
  prevState: {
    error: string | null;
    success: boolean;
    parts: Part | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    return updatePart(formData);
  } else {
    return createPart(formData);
  }
};

// delete a car by id
export const deletePart = async (id: number, carId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/parts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete parts:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete parts (${res.status})`);
  }
  revalidatePath(`/cars/${carId}`);
};
