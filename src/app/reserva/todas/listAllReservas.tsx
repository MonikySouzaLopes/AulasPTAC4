"use client";

import { useEffect, useState } from "react";
import Reserva from "@/app/interfaces/reserva";
import { getUser } from "@/app/utils/serverActions";
import { fetchAtualizarReserva, fetchCancelarReserva, fetchTodasReservas } from "@/app/utils/reservas";

export default function ListAllReservas() {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<string>("");

    async function handleFetchData() {
        if (!data) return;
        const res = await fetchTodasReservas(data);
        setReservas(Array.isArray(res) ? res : []);
    }

    async function handleCancelReserva(id: number) {
        const res = await fetchCancelarReserva(id);
        if (!res.erro) handleFetchData();
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const usuario = await getUser();
            setUser(usuario);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Selecione uma data</h2>
            <div className="flex w-full gap-4">
                <input type="date" value={data} onChange={e => setData(e.target.value)} className="p-2 border rounded w-5/6" />
                <button type="button" onClick={handleFetchData} className="p-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">Buscar</button>
            </div>

            <div className="mt-4">
                {loading ? <p>Carregando...</p> : reservas.length === 0 ? <p>Nenhuma reserva encontrada.</p> : reservas.map(reserva => (
                    <div key={reserva.id} className="p-4 border rounded-lg shadow bg-white">
                        <p><strong>Mesa:</strong> {reserva.mesa?.codigo}</p>
                        <p><strong>Data:</strong> {reserva.data}</p>
                        <button onClick={() => handleCancelReserva(reserva.id)} className="bg-red-500 text-white p-2 rounded-lg">Cancelar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
