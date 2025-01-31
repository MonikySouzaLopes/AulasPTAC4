'use client';
import ModalMap from "../componentes/modalMap";
import Mesa from "../interfaces/mesa";
import { useActionState, useState } from "react";
import { fetchAtualizarMesa } from "../utils/mesas";
import { Plus } from "lucide-react";
import { fetchCriarMesa } from "../utils/mesas";
type ListMesasProps = {
    mesas: Mesa[];
};

export function ListMesas({ mesas }: ListMesasProps) {
    const [mesa, setMesa] = useState<Mesa | null>(null);
    const [state, action, isPading] = useActionState(fetchAtualizarMesa, { erro: false, mensagem: "" });
    const [stateCriar, actionCriar, isPadingCriar] = useActionState(fetchCriarMesa, { erro: false, mensagem: "" });
    const [criarMesa, setCriarMesa] = useState(false)

    return (
        <div className="relative w-full lg:w-3/4 flex flex-col lg:flex-row p-4 rounded-lg overflow-hidden">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Mapa Restaurante:</h2>
                <ModalMap />
                <h2 className="text-xl font-bold mb-4">Mesas:</h2>
                <div className="grid grid-cols-4 lg:grid-cols-12 gap-4 mt-4">
                    {mesas.map((mesa) => {
                        return (
                            <button
                                onClick={() => setMesa(mesa)}
                                key={mesa.id}
                                className="p-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"
                            >
                                <p>{mesa.codigo}</p>
                            </button>
                        );
                    })}
                </div>
                <div className="absolute left-1/2 transform bottom-8 mt-8">
                <button
                type="button"
                onClick={() => setCriarMesa(true)}
                title="Adicionar nova mesa"
                className="rounded-full w-12 h-12 flex items-center justify-center bg-indigo-500 text-white hover: bg-indigo-600 
                focus: outline-none focus: outline-none focus: bg-indigo-700"
                >
               <Plus/>
                </button>

                </div>
            </div>

            {mesa && (
                <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-1/3">
                        <h3 className="text-xl font-bold mb-4">Alterar Mesa:</h3>
                        <form action={action} className="space-y-4 flex flex-col">
                            <label className="flex flex-col">
                                Id da Mesa:
                                <input
                                    type="text"
                                    defaultValue={mesa.id}
                                    readOnly
                                    className="p-2 border border-gray-100"
                                    name="id"
                                />
                            </label>
                            <label className="flex flex-col">
                                Código da Mesa:
                                <input
                                    type="text"
                                    defaultValue={mesa.codigo}
                                    className="p-2 border border-gray-100"
                                    name="codigo"
                                />
                            </label>
                            <label className="flex flex-col">
                                Número de Lugares:
                                <input
                                    type="number"
                                    defaultValue={mesa.n_lugares}
                                    className="p-2 border border-gray-100"
                                    name="n_lugares"
                                />
                            </label>
                            {state.erro && <p className="text-red-600 text-center">{state.mensagem}</p>}
                            <div className="flex justify-end p-4 space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                                    onClick={() => setMesa(null)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600">
                                    Confirmar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {criarMesa && (
                <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-1/3">
                        <h3 className="text-xl font-bold mb-4">Criar Mesa:</h3>
                        <form action={actionCriar} className="space-y-4 flex flex-col">
                            <label className="flex flex-col">
                                Código da Mesa:
                                <input
                                    type="text"
                                    defaultValue={0}
                                    className="p-2 border border-gray-100"
                                    name="codigo"
                                />
                            </label>
                            <label className="flex flex-col">
                                Número de Lugares:
                                <input
                                    type="number"
                                    defaultValue={0}
                                    className="p-2 border border-gray-100"
                                    name="n_lugares"
                                />
                            </label>
                            {stateCriar.erro && <p className="text-red-600 text-center">{stateCriar.mensagem}</p>}
                            <div className="flex justify-end p-4 space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                                    onClick={() => setMesa(null)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600">
                                    Confirmar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
