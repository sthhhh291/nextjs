"use server";

import { cookies } from "next/headers"; 
import { redirect } from "next/navigation";

const baseUrl = process.env.API_URL || "http://localhost:3000";

export const login = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log("Logging in with:", { username});
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
    // return data;
};

export const logout = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("username");
    cookieStore.delete("is_admin");
    redirect("/login"); // Redirect to the login page after logout
}