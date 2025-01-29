"use server";

import { cookies } from "next/headers";
import { ApiURL } from "../config";

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("restaurant-token");

  if (!token) {
    console.log("Nenhum token encontrado.");
    return null;
  }

  const res = await fetch(`${ApiURL}/perfil`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token.value}` },
  });

  if (!res.ok) {
    console.log("Erro na API:", res.status);
    return null;
  }

  const data = await res.json();
  return data.usuario || null;
}
