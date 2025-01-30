'use server'

import{cookies} from "next/headers"
import {ApiURL} from "./config"
import Reserva from "../interfaces/reserva";


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
  