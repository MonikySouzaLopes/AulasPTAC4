"use server";

import { cookies } from "next/headers";
import { ApiURL } from "../config";
import Mesa from "../interfaces/mesa";

export async function getMesa(): Promise<Mesa[]> {
  try {
    const cookieStore = cookies(); // Sem await, pois não é assíncrono
    const token = cookieStore.get("restaurant-token");

    const res = await fetch(`${ApiURL}/mesa`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token?.value}` },
    });

    if (!res.ok) {
      console.error("Erro ao buscar mesas:", res.status);
      return []; // Retorna um array vazio em caso de erro
    }

    const data = await res.json();
    return data.mesas || []; // Garante que sempre retorna um array
  } catch (error) {
    console.error("Erro na requisição getMesa:", error);
    return []; // Em caso de erro, retorna array vazio
  }
}
