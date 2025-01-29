"use server";

import { cookies } from "next/headers";
import { ApiURL } from "../config";

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("restaurant-token");

  if (!token) return null;

  const res = await fetch(`${ApiURL}/perfil`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token.value}` },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.usuario || null;
}
