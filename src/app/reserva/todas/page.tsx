"use client";

import { useEffect, useState } from "react";
import NavBar from "../../componentes/navbar";
import Menu from "../../componentes/menu";
import { getUser } from "../../utils/serverActions";
import { redirect } from "next/navigation";
import ListAllReservas from "./listAllReservas";

export default function Reservas() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Busca usuário
      const usuario = await getUser();
      if (!usuario || usuario.tipo !== "adm") {
        redirect("/"); // Redireciona se não estiver logado ou não for administrador
        return;
      }
      setUser(usuario);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-bold mt-4">Carregando...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
        <Menu user={user} />
        <ListAllReservas />
      </div>
    </div>
  );
}
