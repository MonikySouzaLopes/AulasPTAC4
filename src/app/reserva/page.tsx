"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import NavBar from "../componentes/navbar";
import Mesa from "../interfaces/mesa";
import Reserva from "../interfaces/reserva";

export default function Home() {
  const [mesas, setMesas] = useState<Mesa[]>([]); // Inicializado como array vazio
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [formReserva, setFormReserva] = useState<Reserva>({
    id: 0,
    usuario_id: 0,
    mesa_id: 0,
    data: getDateNow(),
    n_pessoas: 0,
    status: true,
  });
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [dateTables, setDateTables] = useState(getDateNow());
  const [isAdmin, setIsAdmin] = useState(false); // Flag para verificar se é administrador
  const [loading, setLoading] = useState(true);

  function getDateNow() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  function alterFormReserva<K extends keyof Reserva>(key: K, value: Reserva[K]) {
    setFormReserva((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  }

  async function fetchData() {
    setLoading(true);
    try {
      const responseMesas = await fetch("http://localhost:8000/mesas");
      const responseReservas = await fetch("http://localhost:8000/reservas", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!responseMesas.ok || !responseReservas.ok) {
        throw new Error("Erro ao buscar dados.");
      }

      const mesasData = await responseMesas.json();
      const reservasData = await responseReservas.json();

      console.log("Mesas recebidas:", mesasData); // Debug
      console.log("Reservas recebidas:", reservasData); // Debug

      setMesas(mesasData.mesas || mesasData); // Garante que é um array
      setReservas(reservasData.reservas || []);
      setIsAdmin(reservasData.isAdmin || false); // Define se é admin
    } catch (error) {
      console.error("Erro ao buscar dados:", error.message);
      setMesas([]); // Garante que `mesas` seja um array em caso de erro
      setReservas([]);
    } finally {
      setLoading(false); // Finaliza o loading
    }
  }

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formReserva),
      });

      fetchData(); // Atualiza dados após a reserva
    } catch (error) {
      console.error("Erro ao criar reserva:", error.message);
    }
  }

  async function handleCancelReserva(id: number) {
    try {
      await fetch(`http://localhost:8000/reservas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      fetchData(); // Atualiza dados após cancelamento
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error.message);
    }
  }

  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setDateTables(e.target.value);
    alterFormReserva("data", e.target.value);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 text-white p-4 flex items-center">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 w-full max-w-sm">
            <img
              src="/usuario.jpeg"
              alt="Usuário"
              className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-500"
            />
            <h2 className="text-center text-lg font-bold mt-4">
              Nome do Usuário
            </h2>
            <p className="text-center text-gray-600">
              {isAdmin ? "Administrador" : "Cliente"}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white p-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Mesas Disponíveis</h2>
            <label className="flex flex-col">
              <input
                type="date"
                value={dateTables}
                min={dateTables}
                className="p-2 border rounded"
                onChange={handleChangeDate}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            {Array.isArray(mesas) &&
              mesas.map((table) => {
                const isReserved = reservas.some(
                  (reserva) =>
                    dateTables === reserva.data && reserva.mesa_id === table.id
                );

                return (
                  <button
                    key={table.id}
                    className={`p-4 text-white rounded-lg ${
                      isReserved
                        ? "bg-red-500 hover:bg-red-600 focus:bg-red-700"
                        : "bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700"
                    }`}
                    onClick={() => {
                      if (!isReserved) {
                        alterFormReserva("mesa_id", table.id);
                        setSelectedTable(table.nome);
                      }
                    }}
                    disabled={isReserved}
                  >
                    {table.nome}
                  </button>
                );
              })}
          </div>
        </div>

        <div className="w-full lg:w-1/4 bg-gray-100 p-4 border-t lg:border-t-0 lg:border-l">
          {selectedTable ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Reservar {selectedTable}</h2>
              <form className="flex flex-col space-y-4" onSubmit={handleSubmitForm}>
                <label className="flex flex-col">
                  User ID:
                  <input
                    type="number"
                    className="p-2 border rounded"
                    placeholder="ID"
                    onChange={(e) =>
                      alterFormReserva("usuario_id", parseInt(e.target.value))
                    }
                  />
                </label>
                <label className="flex flex-col">
                  Pessoas:
                  <input
                    type="number"
                    max={4}
                    min={1}
                    onChange={(e) =>
                      alterFormReserva("n_pessoas", parseInt(e.target.value))
                    }
                    className="p-2 border rounded"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"
                >
                  Confirmar Reserva
                </button>
              </form>
            </div>
          ) : (
            <p className="text-gray-700">Selecione uma mesa para reservar</p>
          )}

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">
              {isAdmin ? "Todas as Reservas" : "Minhas Reservas"}
            </h2>
            <ul>
              {reservas.map((reserva) => (
                <li
                  key={reserva.id}
                  className="flex justify-between items-center p-4 bg-white shadow mb-2 rounded"
                >
                  <div>
                    <p>
                      <strong>Mesa:</strong> {reserva.mesa_id}
                    </p>
                    <p>
                      <strong>Data:</strong>{" "}
                      {new Date(reserva.data).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Pessoas:</strong> {reserva.n_pessoas}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCancelReserva(reserva.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancelar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
