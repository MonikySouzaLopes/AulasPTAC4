import Mesa from "@/app/interfaces/mesa"
import ModalMap from "@/app/componentes/modalMap"

type ListMesasReservaProps = {
    mesas: Mesa []
}

export function ListMesasReserva({mesas}: ListMesasReservaProps){
    return(
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row p-4 rounded-lg overflow-hidden">
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Mapa Restaurante:</h2>
                <ModalMap/> 
            {
                mesas.map(mesa => {
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
    )

}