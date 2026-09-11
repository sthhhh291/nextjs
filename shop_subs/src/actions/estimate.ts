import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Estimate } from "@/types";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// estimates area
export const getEstimates = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access token")?.value;
  const res = await fetch(`${baseUrl}/estimates`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch estimates:", res.statusText);
    throw new Error("Failed to fetch estimates");
  }
  return res.json();
};

// get single estimate by id
export const getEstimateById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid estimate ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/estimates/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch estimate:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch estimate (${res.status})`);
  }

  return res.json();
};

// create a new estimate
export const createEstimate = async (formData: FormData) => {
  const car_id = formData.get("car_id");
  const employee_id = String(formData.get("employee_id") ?? "");
  const date = String(formData.get("date") ?? "");
  const hours = String(formData.get("hours") ?? "");
  const mileage = String(formData.get("mileage") ?? "");
  const estimate_type = String(formData.get("estimate_type") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/estimates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      car_id,
      employee_id,
      date,
      hours,
      mileage,
      estimate_type,
    }),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create estimate",
      success: false,
      car: null,
    };
  }
  return { success: true, error: null, estimate: await res.json() };
};

// update Estimate for a car
export const updateEstimate = async (formData: FormData) => {
  const id = formData.get("id");
  const car_id = formData.get("car_id");
  const employee_id = String(formData.get("employee_id") ?? "");
  const date = String(formData.get("date") ?? "");
  const hours = String(formData.get("hours") ?? "");
  const mileage = String(formData.get("mileage") ?? "");
  const estimate_type = String(formData.get("estimate_type") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/estimates/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      car_id,
      employee_id,
      date,
      hours,
      mileage,
      estimate_type,
    }),
  });
  console.log("updateCar response:", res);
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update estimate",
      success: false,
      car: null,
    };
  }

  return { success: true, error: null, estimate: await res.json() };
};

// save car form data (create or update)
export const saveEstimate = async (
  prevState: {
    error: string | null;
    success: boolean;
    estimate: Estimate | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateEstimate(formData);
    if (res.success && res.estimate) {
      revalidatePath(`/cars/${res.estimate.car_id}`);
    }
    return res;
  } else {
    const res = await createEstimate(formData);
    if (res.success && res.estimate) {
      revalidatePath(`/estimates/${res.estimate.car_id}`);
    }
    return res;
  }
};

// delete a car by id
export const deleteEstimate = async (id: number, carId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/estimates/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete estimate:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete estimate (${res.status})`);
  }
  revalidatePath(`/cars/${carId}`);
};

// get subs by estimate id
export const getSubsByEstimateId = async (estimateId: number) => {
  if (!Number.isInteger(estimateId) || estimateId < 1) {
    throw new Error("Invalid estimate ID");
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/estimates/${estimateId}/sub-estimates`, {
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
