'use server';

import { cookies } from "next/headers";
import { ApiURL } from "../config";
import Reserva from "../interfaces/reserva";
import { revalidateTag } from "next/cache";

// 🔹 Busca reservas por data específica
export async function fetchReserva(data: string): Promise<Reserva[]> {
    if (!data || data.trim() === "") {
        console.error(" Data inválida fornecida.");
        return [];
    }
    try {
        const cookieStore = await cookies();
        const token = await cookieStore.get("restaurant-token");

        const res = await fetch(`${ApiURL}/reservas/date`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ data })
        });

        if (!res.ok) {
            console.error("Erro ao buscar reservas:", res.status);
            return [];
        }

        const dataRes = await res.json();
        return dataRes.reservas || [];
    } catch (error) {
        console.error("Erro na requisição fetchReserva:", error);
        return [];
    }
}

// 🔹 Cria uma nova reserva
export async function fetchNovaReserva(mesaId: number, n_pessoas: number, data: string) {
    const cookieStore = await cookies();
    const token = await cookieStore.get("restaurant-token");

    if (!data || !n_pessoas || !mesaId || !token) {
        return { erro: true, mensagem: 'Dados inválidos' };
    }

    try {
        const res = await fetch(`${ApiURL}/reservas/novo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ data, mesaId, n_pessoas })
        });

        const dataRes = await res.json();
        return { erro: dataRes.erro, mensagem: dataRes.mensagem };
    } catch (error) {
        console.error("Erro ao criar reserva:", error);
        return { erro: true, mensagem: 'Erro ao fazer requisição' };
    }
}

// 🔹 Busca todas as reservas do usuário
export async function fetchMinhasReservas(): Promise<Reserva[]> {
    try {
        const cookieStore = await cookies();
        const token = await cookieStore.get("restaurant-token");

        const res = await fetch(`${ApiURL}/reservas`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            next: {
                tags: ['minhas_reservas']
            }
        });

        const dataRes = await res.json();
        return dataRes.reservas || [];
    } catch (error) {
        console.error("Erro ao buscar minhas reservas:", error);
        return [];
    }
}

// 🔹 Atualiza uma reserva existente
export async function fetchAtualizarReserva(state: any, formData: FormData) {
    const cookieStore = await cookies();
    const token = await cookieStore.get("restaurant-token");

    const n_pessoas = parseInt(formData.get('n_pessoas') as string);
    const reservaId = parseInt(formData.get('reservaId') as string);

    if (!reservaId || !n_pessoas || !token) {
        return { erro: true, mensagem: 'Dados inválidos' };
    }

    try {
        const res = await fetch(`${ApiURL}/reservas/`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ reservaId, n_pessoas })
        });

        const dataRes = await res.json();
        if (!dataRes.erro) revalidateTag('minhas_reservas');

        return { erro: dataRes.erro, mensagem: dataRes.mensagem };
    } catch (error) {
        console.error("Erro ao atualizar reserva:", error);
        return { erro: true, mensagem: 'Erro ao fazer requisição' };
    }
}

// 🔹 Cancela uma reserva
export async function fetchCancelarReserva(reservaId: number) {
    const cookieStore = await cookies();
    const token = await cookieStore.get("restaurant-token");

    if (!reservaId || !token) {
        return { erro: true, mensagem: 'Dados inválidos' };
    }

    try {
        const res = await fetch(`${ApiURL}/reservas/cancelar`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`
            },
            body: JSON.stringify({ reservaId })
        });

        const dataRes = await res.json();
        if (!dataRes.erro) revalidateTag('minhas_reservas');

        return { erro: dataRes.erro, mensagem: dataRes.mensagem };
    } catch (error) {
        console.error("Erro ao cancelar reserva:", error);
        return { erro: true, mensagem: 'Erro ao fazer requisição' };
    }
}

// 🔹 Busca todas as reservas por data (para admin)
export async function fetchTodasReservas(data: string): Promise<Reserva[]> {
  try {
      const cookieStore = await cookies(); // 🔹 AGORA ESTÁ SENDO AGUARDADO CORRETAMENTE
      const token = cookieStore.get("restaurant-token"); // 🔹 NÃO PRECISA DE `await` AQUI, APENAS PARA `cookies()`

      if (!token) {
          console.error("Nenhum token encontrado.");
          return [];
      }

      if (!data || data.trim() === "") {
          console.error("Data inválida para buscar reservas.");
          return [];
      }

      const res = await fetch(`${ApiURL}/reservas/list`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.value}`
          },
          body: JSON.stringify({ data }),
          next: {
              tags: ['todas_reservas']
          }
      });

      if (!res.ok) {
          console.error("Erro ao buscar todas as reservas:", res.status);
          return [];
      }

      const dataRes = await res.json();
      return dataRes.reservas || [];
  } catch (error) {
      console.log("Erro ao buscar todas as reservas:", error);
      return [];
  }
}