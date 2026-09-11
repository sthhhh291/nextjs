import { Car } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// cars section
// get all cars with pagination and optional search term
export const getCars = async (
  page: number = 1,
  size: number = 20,
  searchTerm: string = "",
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(
    `${baseUrl}/cars?page=${page}&size=${size}&searchTerm=${searchTerm}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!res.ok) {
    console.error("Failed to fetch cars:", res.statusText);
    throw new Error("Failed to fetch cars");
  }
  const data = await res.json();
  console.log("Fetched cars:", data.items);
  console.log("pagination info:", data.total, data.page, data.size, data.pages);
  return data;
};

// get a single car by id
export const getCarById = async (id: number) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("Invalid customer ID");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    throw new Error("Authentication required");
  }

  const res = await fetch(`${baseUrl}/cars/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to fetch car:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to fetch car (${res.status})`);
  }

  return res.json();
};

// create a new car
export const createCar = async (formData: FormData) => {
  const customer_id = formData.get("customer_id");
  const year = String(formData.get("year") ?? "");
  const make = String(formData.get("make") ?? "");
  const car_model = String(formData.get("car_model") ?? "");
  const engine = String(formData.get("engine") ?? "");
  const vin = String(formData.get("vin") ?? "");
  const license = String(formData.get("license") ?? "");
  const color = String(formData.get("color") ?? "");
  const notes = String(formData.get("notes") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${baseUrl}/cars`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      year,
      make,
      car_model,
      engine,
      vin,
      license,
      color,
      notes,
      customer_id,
    }),
  });

  if (!res.ok) {
    return {
      error: res.statusText || "Failed to create car",
      success: false,
      car: null,
    };
  }
  return { success: true, error: null, car: await res.json() };
};

// update car for a customer
export const updateCar = async (formData: FormData) => {
  const id = formData.get("id");
  const customer_id = formData.get("customer_id");
  const year = String(formData.get("year") ?? "");
  const make = String(formData.get("make") ?? "");
  const car_model = String(formData.get("car_model") ?? "");
  const engine = String(formData.get("engine") ?? "");
  const vin = String(formData.get("vin") ?? "");
  const license = String(formData.get("license") ?? "");
  const color = String(formData.get("color") ?? "");
  const notes = String(formData.get("notes") ?? "");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/cars/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      year,
      make,
      car_model,
      engine,
      vin,
      license,
      color,
      notes,
      customer_id,
    }),
  });
  console.log("updateCar response:", res);
  if (!res.ok) {
    return {
      error: res.statusText || "Failed to update car",
      success: false,
      car: null,
    };
  }

  return { success: true, error: null, car: await res.json() };
};

// save car form data (create or update)
export const saveCar = async (
  prevState: { error: string | null; success: boolean; car: Car | null },
  formData: FormData,
) => {
  const id = formData.get("id") || null;
  if (id) {
    const res = await updateCar(formData);
    if (res.success && res.car) {
      revalidatePath(`/customers/${res.car.customer_id}`);
    }
    return res;
  } else {
    const res = await createCar(formData);
    if (res.success && res.car) {
      revalidatePath(`/customers/${res.car.customer_id}`);
    }
    return res;
  }
};

// delete a car by id
export const deleteCar = async (id: number, customerId: number) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/cars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to delete car:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error(`Failed to delete car (${res.status})`);
  }
  revalidatePath(`/customers/${customerId}`);
};

// get estimates by car id
export const getEstimatesByCarId = async (carId: number) => {
  if (!Number.isInteger(carId) || carId < 1) {
    throw new Error("Invalid car ID");
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}/cars/${carId}/estimates`, {
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
