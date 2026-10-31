"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Totals } from "@/types";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// totals area
export const getTotals = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access token")?.value;
  const res = await fetch(`${baseUrl}/totals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch totals:", res.statusText);
    throw new Error("Failed to fetch totals");
  }
  return res.json();
};

// get totals by range (begin, end) most likey used for date range filtering
export const getTotalsByRange = async (begin: string, end: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/totals/range?begin=${begin}&end=${end}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch totals by range:", res.statusText);
    throw new Error("Failed to fetch totals by range");
  }
  console.log("Fetched totals by range:", await res.clone().json());
  return res.json();
};

export const getTotalsByQuarter = async (year: number) => {
  const q1begin = `${year}-01-01`;
  const q1end = `${year}-03-31`;
  const q2begin = `${year}-04-01`;
  const q2end = `${year}-06-30`;
  const q3begin = `${year}-07-01`;
  const q3end = `${year}-09-30`;
  const q4begin = `${year}-10-01`;
  const q4end = `${year}-12-31`;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(
    `${baseUrl}/totals/range?begin=${q1begin}&end=${q1end}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const res2 = await fetch(
    `${baseUrl}/totals/range?begin=${q2begin}&end=${q2end}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const res3 = await fetch(
    `${baseUrl}/totals/range?begin=${q3begin}&end=${q3end}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const res4 = await fetch(
    `${baseUrl}/totals/range?begin=${q4begin}&end=${q4end}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!res.ok) {
    console.error("Failed to fetch totals by range:", res.statusText);
    throw new Error("Failed to fetch totals by range");
  }
  console.log("Fetched totals by range:", await res.clone().json());
  const results = {
    q1: await res.json(),
    q2: await res2.json(),
    q3: await res3.json(),
    q4: await res4.json(),
  };
  return results;
};

export const getTotalsByMonth = async (year: number) => {
  const jan = [`1-1-${year}`, `1-31-${year}`];

  const jan_res = await getTotalsByRange(jan[0], jan[1]);
  console.log("january result for year", jan_res);
  return jan_res;
};

export const getTotalsById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid totals ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/totals/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch totals:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch totals (${res.status})`);
  }

  return res.json();
};

// create a new totals
export const createTotals = async (formData: FormData) => {
  const sub_estimate_id = Number(formData.get("sub_estimate_id"));
  const description = String(formData.get("description"));
  const hours = Number(formData.get("hours") ?? "");
  const rate = Number(formData.get("rate") ?? "");
  const price = Number(formData.get("price") ?? "");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/totals`, {
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
      error: errorBody || res.statusText || "Failed to create totals",
      success: false,
      totals: null,
    };
  }
  return { success: true, error: null, totals: await res.json() };
};

// update Totals for a car
export const updateTotals = async (formData: FormData) => {
  const id = formData.get("id");
  const sub_estimate_id = Number(formData.get("sub_estimate_id"));
  const description = String(formData.get("description"));
  const hours = Number(formData.get("hours") ?? "");
  const rate = Number(formData.get("rate") ?? "");
  const price = Number(formData.get("price") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/totals/${id}`, {
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
      error: errorBody || res.statusText || "Failed to update totals",
      success: false,
      totals: null,
    };
  }

  return { success: true, error: null, totals: await res.json() };
};

// save car form data (create or update)
export const saveTotals = async (
  prevState: {
    error: string | null;
    success: boolean;
    totals: Totals | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateTotals(formData);
    if (res.success && res.totals) {
      revalidatePath(`/cars/${res.totals.sub_estimate_id}`);
    }
    return res;
  } else {
    const res = await createTotals(formData);
    if (res.success && res.totals) {
      revalidatePath(`/cars/${res.totals.sub_estimate_id}`);
    }
    return res;
  }
};

// delete a car by id
export const deleteTotals = async (id: number, carId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/totals/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete totals:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete totals (${res.status})`);
  }
  revalidatePath(`/cars/${carId}`);
};
