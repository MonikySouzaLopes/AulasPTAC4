'use server'

import{cookies} from "next/headers"
import { ApiURL } from "../config";
import Reserva from "../interfaces/reserva";
import { getDefaultResultOrder } from "dns";
import { revalidateTag } from "next/cache";


export async function fetchReserva(data: string): Promise<Reserva[] | {erro: boolean, mensagem: string}>{
    
    if(data){
        return {erro: true, mensagem: 'Data inválida'}
    }
    try {
      const cookieStore = await cookies(); 
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
      
      return dataRes.reservas || []; // Garante que sempre retorna um array
    } catch (error) {
      console.error("Erro na requisição getMesa:", error);
      return []; // Em caso de erro, retorna array vazio
    }
  }
  
export async function fetchNovaReserva(mesaId: number, n_pessoas: number, data: string): Promise<Reserva[] | {erro: boolean, mensagem: string}>{
  const cookieStore = await cookies(); 
  const token = cookieStore.get("restaurant-token");  
 
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
  
  export async function fetchMinhasReservas(): Promise<Reserva[] | null>{
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("restaurant-token");
      const res = await fetch(`${ApiURL}/reservas`, {
        method: "GET",
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}` 
          }, 
          next:{
            tags: ['minhas_reservas']
          }
      });
  
      const dataRes = await res.json();
      
      return dataRes.reservas
    } catch (error) {
      return null
    }
  }

  export async function fetchAtualizarReserva(state: any, formData: FormData){
    const cookieStore = await cookies(); 
    const token = cookieStore.get("restaurant-token"); 
    const n_pessoas = parseInt(formData.get('n_pessoas') as string)
    const reservaId = parseInt(formData.get('reservaId') as string)
    
      if(!reservaId || !n_pessoas || !token){
          return {erro: true, mensagem: 'Dados inválidos'}
      }
      try {
        const res = await fetch(`${ApiURL}/reservas/`, {
          method: "PATCH",
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token?.value}` },
          body: JSON.stringify({reservaId, n_pessoas})
        });
        
        console.log(res)
        const dataRes = await res.json();
        const {erro, mensagem} = dataRes
        if (!erro) revalidateTag('minhas_reservas')
        return {
          erro,
          mensagem
        }
      } catch (error) {
        console.log(error);
        return {erro: true, mensagem: 'Erro ao fazer requisição'}
      }
    }
  export async function fetchCancelarReserva(reservaId: number){
    const cookieStore = await cookies(); 
    const token = cookieStore.get("restaurant-token"); 
      if(!reservaId || !token){
          return {erro: true, mensagem: 'Dados inválidos'}
      }
      try {
        const res = await fetch(`${ApiURL}/reservas/cancelar`, {
          method: "PATCH",
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token?.value}` },
          body: JSON.stringify({reservaId})
        });
        
        console.log(res)
        const dataRes = await res.json();
        const {erro, mensagem} = dataRes
        if (!erro) revalidateTag('minhas_reservas')
        return {
          erro,
          mensagem
        }
      } catch (error) {
        console.log(error);
        return {erro: true, mensagem: 'Erro ao fazer requisição'}
      }
    }