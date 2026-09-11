"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Sub_estimate } from "@/types";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// sub estimates area

export const getSubs = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access token")?.value;
  const res = await fetch(`${baseUrl}/sub-estimates`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch subs:", res.statusText);
    throw new Error("Failed to fetch subs");
  }
  return res.json();
};

// get single estimate by id
export const getSubById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid sub ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/sub-estimates/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch sub:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch sub (${res.status})`);
  }

  return res.json();
};

// create a new estimate
export const createSubEstimate = async (formData: FormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const estimate_id = formData.get("estimate_id");
  const description = formData.get("description");

  const res = await fetch(`${baseUrl}/sub-estimates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ estimate_id, description }),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create sub",
      success: false,
      car: null,
    };
  }
  return { success: true, error: null, sub: await res.json() };
};

// update Estimate for a car
export const updateSubEstimate = async (formData: FormData) => {
  const id = formData.get("id");
  const estimate_id = formData.get("estimate_id");
  const description = formData.get("description");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/sub-estimates/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      estimate_id,
      description,
    }),
  });
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update sub",
      success: false,
      sub: null,
    };
  }

  return { success: true, error: null, sub: await res.json() };
};

// save car form data (create or update)
export const saveSubEstimate = async (
  prevState: {
    error: string | null;
    success: boolean;
    sub: Sub_estimate | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateSubEstimate(formData);
    if (res.success && res.sub) {
      revalidatePath(`/estimates/${res.sub.estimate_id}`);
    }
    return res;
  } else {
    const res = await createSubEstimate(formData);
    if (res.success && res.sub) {
      revalidatePath(`/estimates/${res.sub.estimate_id}`);
    }
    return res;
  }
};

// delete a car by id
export const deleteSubEstimate = async (id: number, estimateId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/sub-estimates/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete sub:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete sub (${res.status})`);
  }
  revalidatePath(`/estimates/${estimateId}`);
};

// get labor, parts, oils by sub id
// export const getLaborPartsOilBySubId = async (subId: number) => {
//   if (!Number.isInteger(subId) || subId < 1) {
//     throw new Error("Invalid estimate ID");
//   }
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("access_token")?.value;
//   const [ labor_res, part_res, oil_res, total_res] = Promise.all(
//     await fetch(`${baseUrl}/sub-estimates/${subId}/labor`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       })
//     }
// }
