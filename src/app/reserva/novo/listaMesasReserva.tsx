'use client'

import Mesa from "@/app/interfaces/mesa"
import ModalMap from "@/app/componentes/modalMap"
import { useState } from "react"

type ListMesasReservaProps = {
    mesas: Mesa []
}

export function ListMesasReserva({mesas}: ListMesasReservaProps){
       const [data, setData] = useState('')
       const [reservas, setReservas] = useState<Reserva[] | null>(null)
       const [loadReservas, setLoadReservas] = useState(false)

       async function handleFecthData(){
        setLoadReservas(true)
        await new Promise(reseolve => setTimeout(reseolve, 3000))
        const res = await fetchReserva(data)
        setReservas(res)
        setLoadReservas(false)
       }


    return(
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row p-4 rounded-lg overflow-hidden">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Mapa Restaurante:</h2>
                <ModalMap/> 
                <h2 className="text-xl font-bold mb-4">Fazer reserva:</h2>
                <div className="flex w-full gap-4">
                    <input 
                        type="date"
                        value={data}
                        onChange={e => setData(e.target.value)}
                        className="p-2 border rounded w-5/6"
                    />
                   <button type="button"
                   onClick={handleFecthData}
                   className="p-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus: bg-indigo-700 w-1/6"
                   >
                      Buscar
                   </button>

                </div>
                {loadReservas && <p className="text-center mt-4">Carregando Mesas...</p>}
                <div className="grid grid cols-4 lg:grid-cols-12 gap-4 mt-4">

            {reservas && !loadReservas &&
                mesas.map(mesa => {
                    if(reservas.find(reserva => reserva.mesaId === mesa.id)) 
                    return (
                        <button
                        key={mesa.id}
                        className="p-4 text-white bg-indigo-500 rounded-lg"
                        >
                           <p>{mesa.codigo}</p>
                        </button>
                )
                    return (
                        <button
                        key={mesa.id}
                        className="p-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus: bg-indigo-700"
                        >
                           <p>{mesa.codigo}</p>
                        </button>
                    )
                })
            }
            </div>
         </div>
     </div>
   )

}