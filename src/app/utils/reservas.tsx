'use server'

import{cookies} from "next/headers"
import { ApiURL } from "../config";
import Reserva from "../interfaces/reserva";
import { getDefaultResultOrder } from "dns";


export async function fetchReserva(data: string): Promise<Reserva[] | {erro: boolean, mensagem: string}>{
    console.log(data)
    if(data){
        return {erro: true, mensagem: 'Data inválida'}
    }
    try {
      const cookieStore = cookies(); // Sem await, pois não é assíncrono
      const token = cookieStore.get("restaurant-token");
      const res = await fetch(`${ApiURL}/reservas/date`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}` },
        body: JSON.stringify({data})
      });
  
      if (!res.ok) {
        console.error("Erro ao buscar mesas:", res.status);
        return []; // Retorna um array vazio em caso de erro
      }
  
      const dataRes = await res.json();
      console.log(dataRes)
      return dataRes.reservas || []; // Garante que sempre retorna um array
    } catch (error) {
      console.error("Erro na requisição getMesa:", error);
      return []; // Em caso de erro, retorna array vazio
    }
  }
  
export async function fetchNovaReserva(mesaId: number, n_pessoas: number, data: string): Promise<Reserva[] | {erro: boolean, mensagem: string}>{
  const cookieStore = await cookies(); 
  const token = cookieStore.get("restaurant-token");  
  console.log(data)
    if(!data || !n_pessoas || !mesaId || !token){
        return {erro: true, mensagem: 'Dados inválidos'}
    }
    try {
      const res = await fetch(`${ApiURL}/reservas/novo`, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}` },
        body: JSON.stringify({data, mesaId, n_pessoas})
      });
  
      const dataRes = await res.json();
      const {erro, mensagem} = dataRes
      return {
        erro,
        mensagem
      }
    } catch (error) {
      console.log(error);
      return {erro: true, mensagem: 'Erro ao fazer requisição'}
    }
  }
  