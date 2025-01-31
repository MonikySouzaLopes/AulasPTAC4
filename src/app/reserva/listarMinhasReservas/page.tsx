"use client";

import { useEffect, useState } from "react";
import Reserva from "@/app/interfaces/reserva";
import Menu from "@/app/componentes/menu";
import { getUser } from "@/app/utils/serverActions";
import { fetchAtualizarReserva, fetchCancelarReserva, fetchMinhasReservas } from "@/app/utils/reservas";
import NavBar from "@/app/componentes/navbar";

export default function ListMinhasReservas() {
    // Estados para armazenar as reservas e o usuário
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [altReserva, setAltReserva] = useState<Reserva | null>(null);
    const [cancReserva, setCancReserva] = useState<Reserva | null>(null);
    const [response, setResponse] = useState({ erro: false, mensagem: "" });

    // Função para abrir o modal corretamente
    function openModal(reserva: Reserva) {
        setAltReserva(reserva);
    }

    async function handleCancelReserva() {
        if (!cancReserva) return;
        const res = await fetchCancelarReserva(cancReserva.id);
        console.log(res);

        // Atualiza a lista de reservas após cancelar
        const reservasAtualizadas = await fetchMinhasReservas();
        setReservas(Array.isArray(reservasAtualizadas) ? reservasAtualizadas : []);
        setCancReserva(null);
    }

    async function handleUpdateReserva(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!altReserva) return;

        const formData = new FormData(event.currentTarget);
        const n_pessoas = parseInt(formData.get("n_pessoas") as string);

        const res = await fetchAtualizarReserva(altReserva.id, n_pessoas);
        console.log(res);

        if (!res.erro) {
            // Atualiza a lista de reservas após alteração
            const reservasAtualizadas = await fetchMinhasReservas();
            setReservas(Array.isArray(reservasAtualizadas) ? reservasAtualizadas : []);
            setAltReserva(null);
        } else {
            setResponse(res);
        }
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            // Buscar usuário
            const usuario = await getUser();
            setUser(usuario);

            // Buscar reservas
            const reservasData = await fetchMinhasReservas();
            setReservas(Array.isArray(reservasData) ? reservasData : []);

            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="w-full lg:w-3/4 flex flex-col lg:flex-row p-4 rounded-lg overflow-hidden">
                <Menu user={user} />

                <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Suas Reservas:</h2>

                    {loading ? (
                        <p className="text-center">Carregando suas reservas...</p>
                    ) : reservas.length === 0 ? (
                        <p className="text-center">Você ainda não tem reservas</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {reservas.map(reserva => (
                                <div 
                                    key={reserva.id} 
                                    className={`p-4 border rounded-lg shadow ${reserva.status ? "bg-white" : "bg-gray-300 opacity-50 cursor-not-allowed"}`}
                                >
                                    <p className="font-bold">Mesa: {reserva.mesa?.codigo || "N/A"}</p>
                                    <p>Data: {reserva.data}</p>
                                    <p>Pessoas: {reserva.n_pessoas}</p>

                                    {reserva.status && (
                                        <div className="flex space-x-2 mt-4">
                                            <button
                                                className="bg-indigo-500 p-2 text-white rounded-lg hover:bg-indigo-600"
                                                onClick={() => openModal(reserva)}
                                            >
                                                Alterar
                                            </button>
                                            <button
                                                className="bg-red-500 p-2 text-white rounded-lg hover:bg-red-600"
                                                onClick={() => setCancReserva(reserva)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Alteração */}
            {altReserva && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h3 className="text-xl font-bold mb-4">Alterar Reserva:</h3>
                        <form className="flex flex-col space-y-4" onSubmit={handleUpdateReserva}>
                            <label className="flex flex-col space-y-1">
                                Data:
                                <input 
                                    type="date"
                                    value={altReserva.data}
                                    readOnly
                                    className="p-2 border rounded"
                                    name="data"
                                />
                            </label>
                            <input 
                                type="hidden"
                                value={altReserva.id}
                                name="reservaId"
                            />
                            <label className="flex flex-row">
                                Mesa Selecionada:
                                <input 
                                    type="text"
                                    value={altReserva.mesa?.codigo}
                                    className="p-2 border rounded"
                                    name="codigo"
                                    readOnly
                                />
                            </label>
                            <label className="flex flex-row">
                                Número de pessoas:
                                <input 
                                    type="number"
                                    max={altReserva.mesa?.n_lugares}
                                    defaultValue={altReserva.n_pessoas}
                                    min={1}
                                    className="p-2 border rounded"
                                    name="n_pessoas"
                                />
                            </label>
                            {response.erro && <p className="mb-4 text-sm text-red-500">{response.mensagem}</p>}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                                    onClick={() => setAltReserva(null)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Cancelamento */}
            {cancReserva && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 flex flex-col justify-between">
                        <h3 className="text-xl font-bold mb-4">Confirmar Cancelamento:</h3>
                        <p className="mb-4 text-sm text-red-500"> Realmente deseja cancelar esta reserva?</p>
                        <div className="justify-end space-x-4 mt-6 w-full grid grid-cols-2">
                            <button
                                type="button"
                                className="bg-gray-500 border border-gray-100 text-white p-2 rounded-lg hover:bg-gray-600"
                                onClick={() => setCancReserva(null)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelReserva}
                                className="bg-red-500 border border-gray-100 text-white p-2 rounded-lg hover:bg-red-600"
                            >
                                Confirmar Cancelamento
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
