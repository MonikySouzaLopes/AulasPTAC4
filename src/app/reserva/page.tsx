"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import NavBar from "../componentes/navbar";
import styles from "./reserva.module.css";
import Menu from "../componentes/menu";
import { getUser } from "../utils/serverActions"; // Importação corrigida

export default function Reservas() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const usuario = await getUser();
      if (!usuario) {
        window.location.href = "/"; // Redireciona se não estiver logado
      } else {
        setUser(usuario);
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
        <Menu user={user} />
      </div>
    </div>
  );
}
