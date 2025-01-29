"use client";

import { useEffect, useState, FormEvent } from "react";
import { parseCookies } from "nookies";
import NavBar from "../componentes/navbar";
import styles from "./reserva.module.css";
import Mesa from "../interfaces/mesa";
import Reserva from "../interfaces/reserva";
import Menu from "../componentes/menu";
import { getUser } from "../utils/serverActions"; // Importando a função criada

export default function Reservas() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dateTables, setDateTables] = useState(new Date().toISOString().split("T")[0]);
  const [formReserva, setFormReserva] = useState({
    mesaId: 0,
    n_pessoas: 1,
    data: "",
  });
  const [user, setUser] = useState<any>(null);

  async function fetchData() {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];

    try {
      setLoading(true);

      const mesasResponse = await fetch(`http://localhost:8000/mesa/disponibilidade?data=${dateTables}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (mesasResponse.ok) {
        const mesasData = await mesasResponse.json();
        setMesas(mesasData.mesas || []);
      }

      const reservasResponse = await fetch(`http://localhost:8000/reservas`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (reservasResponse.ok) {
        const reservasData = await reservasResponse.json();
        setReservas(reservasData.reservas || []);
        setIsAdmin(reservasData.isAdmin || false);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();

    async function fetchUser() {
      const usuario = await getUser();
      if (!usuario) {
        window.location.href = "/"; // Redireciona se não estiver logado
      } else {
        setUser(usuario);
      }
    }

    fetchUser();
  }, [dateTables]);

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

  async function handleCancelarReserva(reservaId: number) {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];

    if (window.confirm("Tem certeza de que deseja cancelar esta reserva?")) {
      try {
        const response = await fetch(`http://localhost:8000/reservas`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reservaId }),
        });

        if (response.ok) {
          alert("Reserva cancelada com sucesso!");
          fetchData();
        } else {
          const errorData = await response.json();
          alert(errorData.mensagem || "Erro ao cancelar a reserva.");
        }
      } catch (error) {
        console.error("Erro ao cancelar reserva:", error);
        alert("Erro ao cancelar a reserva. Tente novamente.");
      }
    }
  }

  if (loading) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
        <Menu user={user} />
        <div className={styles.container}>
          <h1 className={styles.h1}>Reservas</h1>

          {isAdmin && (
            <>
              <h2 className={styles.titulo}>Buscar Reservas por Data</h2>
              <input
                type="date"
                value={dateTables}
                onChange={(e) => setDateTables(e.target.value)}
                className={styles.input}
              />
              <button className={styles.button} onClick={fetchData}>
                Buscar Reservas
              </button>
            </>
          )}

          <h2 className={styles.titulo}>{isAdmin ? "Todas as Reservas" : "Minhas Reservas"}</h2>
          <ul className={styles.reservasList}>
            {reservas.map((reserva) => (
              <li key={reserva.id} className={styles.reservaItem}>
                <p>Mesa: {reserva.mesa.codigo || reserva.mesaId}</p>
                <p>Data: {new Date(reserva.data).toLocaleDateString()}</p>
                <p>Pessoas: {reserva.n_pessoas}</p>
                {isAdmin && <p>Cliente: {reserva.usuario?.nome || "Não identificado"}</p>}

                <button className={styles.cancelButton} onClick={() => handleCancelarReserva(reserva.id)}>
                  Cancelar
                </button>
              </li>
            ))}
          </ul>

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
    </div>
  );
}
