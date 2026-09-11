"use server";

import { Car, Customer, Phone } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Estimate, Sub_estimate } from "@/types";

const baseUrl = process.env.API_ADDRESS || "http://localhost:3000";
