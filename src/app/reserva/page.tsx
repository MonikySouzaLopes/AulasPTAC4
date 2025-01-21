"use client";

import { useEffect, useState, FormEvent } from "react";
import { parseCookies } from "nookies";
import NavBar from "../componentes/navbar";
import styles from "./reserva.module.css"; // Importa o CSS local
import Mesa from "../interfaces/mesa";
import Reserva from "../interfaces/reserva";

export default function Home() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Verifica se o usuário é administrador
  const [dateTables, setDateTables] = useState(new Date().toISOString().split("T")[0]); // Data selecionada
  const [formReserva, setFormReserva] = useState({
    mesaId: 0,
    n_pessoas: 1,
    data: "",
  });

  async function fetchData() {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];

    try {
      setLoading(true);

      // Buscar mesas disponíveis para a data selecionada
      const mesasResponse = await fetch(`http://localhost:8000/mesa/disponibilidade?data=${dateTables}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (mesasResponse.ok) {
        const mesasData = await mesasResponse.json();
        setMesas(mesasData.mesas || []);
      }

      // Verificar se o usuário é administrador e buscar reservas
      const reservasResponse = await fetch(`http://localhost:8000/reservas`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (reservasResponse.ok) {
        const reservasData = await reservasResponse.json();
        setReservas(reservasData.reservas || []);

        // Define se o usuário é administrador
        setIsAdmin(reservasData.isAdmin || false);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  // Busca reservas por data (para administradores)
  async function fetchReservasPorData() {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];

    try {
      const response = await fetch(`http://localhost:8000/reservas/list?data=${dateTables}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setReservas(data.reservas || []);
      } else {
        console.error("Erro ao buscar reservas por data.");
      }
    } catch (error) {
      console.error("Erro ao buscar reservas por data:", error);
    }
  }

  async function handleNovaReserva(e: FormEvent) {
    e.preventDefault();
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];

    try {
      const response = await fetch(`http://localhost:8000/reservas/novo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formReserva),
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error("Erro ao criar reserva");
      }
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
    }
  }

  function handleChangeDate(e: React.ChangeEvent<HTMLInputElement>) {
    setDateTables(e.target.value);
  }

  useEffect(() => {
    fetchData();
  }, [dateTables]);

  if (loading) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.h1}>Reservas</h1>

        {/* Exibe o botão de buscar reservas por data apenas para administradores */}
        {isAdmin && (
          <>
            <h2 className={styles.titulo}>Buscar Reservas por Data</h2>
            <input
              type="date"
              value={dateTables}
              onChange={handleChangeDate}
              className={styles.input}
            />
            <button className={styles.button} onClick={fetchReservasPorData}>
              Buscar Reservas
            </button>
          </>
        )}

        {/* Lista de reservas */}
        <h2 className={styles.titulo}>{isAdmin ? "Todas as Reservas" : "Minhas Reservas"}</h2>
        <ul className={styles.reservasList}>
          {reservas.map((reserva) => (
            <li key={reserva.id} className={styles.reservaItem}>
              <p>Mesa: {reserva.mesa.codigo || reserva.mesaId}</p>
              <p>Data: {new Date(reserva.data).toLocaleDateString()}</p>
              <p>Pessoas: {reserva.n_pessoas}</p>
              {isAdmin && <p>Cliente: {reserva.usuario?.nome || "Não identificado"}</p>}
            </li>
          ))}
        </ul>

        {/* Mesas disponíveis */}
        <h2 className={styles.titulo}>Mesas Disponíveis</h2>
        <div className={styles.mesas}>
          {mesas.map((mesa) => (
            <button
              key={mesa.id}
              className={styles.mesa}
              onClick={() => setFormReserva({ ...formReserva, mesaId: mesa.id, data: dateTables })}
            >
              Mesa {mesa.codigo} - {mesa.n_lugares} lugares
            </button>
          ))}
        </div>

        {/* Formulário para criar nova reserva */}
        <form onSubmit={handleNovaReserva} className={styles.form}>
          <label className={styles.label}>Número de Pessoas:</label>
          <input
            type="number"
            className={styles.input}
            min={1}
            max={mesas.find((m) => m.id === formReserva.mesaId)?.n_lugares || 1}
            value={formReserva.n_pessoas}
            onChange={(e) => setFormReserva({ ...formReserva, n_pessoas: Number(e.target.value) })}
          />
          <button type="submit" className={styles.button}>
            Reservar
          </button>
        </form>
      </div>
    </div>
  );
}
