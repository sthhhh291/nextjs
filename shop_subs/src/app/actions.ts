"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";

// authentication actions
export const login = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // console.log("Logging in with:", { username });
  console.log("Base URL:", baseUrl + "/auth/login");

  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    console.error("Login failed:", res.statusText);
    throw new Error("Login failed");
  }
  const data = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("access_token", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: data.expires_in, // Set the cookie expiration based on the token's expiration
  });
  cookieStore.set("username", username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  cookieStore.set("is_admin", data.is_admin.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  redirect("/"); // Redirect to the home page after successful login
  // return data;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("username");
  cookieStore.delete("is_admin");
  redirect("/login"); // Redirect to the login page after logout
};

// customer actions

// work in progress, not fully implemented yet
export const getCustomers = async (
  page: number = 1,
  size: number = 20,
  searchTerm: string = "",
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(
    `${baseUrl}/customers?page=${page}&size=${size}&searchTerm=${searchTerm}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!res.ok) {
    console.error("Failed to fetch customers:", res.statusText);
    throw new Error("Failed to fetch customers");
  }
  const data = await res.json();
  console.log("Fetched customers:", data.items);
  console.log("pagination info:", data.total, data.page, data.size, data.pages);
  return data;
};
