"use server";

import { cookies } from "next/headers";
import { ApiURL } from "../config";
import Mesa from "../interfaces/mesa";
import { revalidateTag } from "next/cache";

export async function getMesa(): Promise<Mesa[]> {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("restaurant-token");

    const res = await fetch(`${ApiURL}/mesa`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token?.value}` },
      next: {
        tags:['carregar-mesas']
      }
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
export async function fetchAtualizarMesa(state: any, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("restaurant-token");

  const id = parseInt(formData.get("id") as string);
  const codigo = formData.get("codigo") as string;
  const n_lugares = parseInt(formData.get("n_lugares") as string);

  if (!id || !codigo || !n_lugares) {
      return { erro: true, mensagem: "Dados inválidos" };
  }

  try {
      const res = await fetch(`${ApiURL}/mesa`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token?.value}`,
          },
          body: JSON.stringify({ id, codigo, n_lugares }),
      });

      if (!res.ok) {
          console.error("Erro ao atualizar mesa:", res.status);
          return { erro: true, mensagem: "Erro ao atualizar a mesa" };
      }

      const data = await res.json();
      const { erro, mensagem } = data;

      if (!erro) revalidateTag("carregar-mesas");

      return { erro, mensagem };
  } catch (error) {
      console.error("Erro na requisição fetchAtualizarMesa:", error);
      return {
          erro: true,
          mensagem: "Ocorreu um erro inesperado",
      };
  }
}
export async function fetchCriarMesa(state: any, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("restaurant-token");
  const codigo = formData.get("codigo") as string;
  const n_lugares = parseInt(formData.get("n_lugares") as string);

  if ( !codigo || !n_lugares) {
      return { erro: true, mensagem: "Dados inválidos" };
  }

  try {
      const res = await fetch(`${ApiURL}/mesa/novo`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token?.value}`,
          },
          body: JSON.stringify({  codigo, n_lugares }),
      });

      if (!res.ok) {
          console.error("Erro ao atualizar mesa:", res.status);
          return { erro: true, mensagem: "Erro ao atualizar a mesa" };
      }

      const data = await res.json();
      const { erro, mensagem } = data;

      if (!erro) revalidateTag("carregar-mesas");

      return { erro, mensagem };
  } catch (error) {
      console.error("Erro na requisição fetchAtualizarMesa:", error);
      return {
          erro: true,
          mensagem: "Ocorreu um erro inesperado",
      };
  }
}