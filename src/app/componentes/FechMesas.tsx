export function FetchMesas() {
    const response = await fetch('http://localhost:3333/reservas')
    return (

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            {tables.map((table) => {
                if (reservas.find(reserva => dateTables === reserva.data && reserva.mesa === table.id)) {
                    return (
                        <button
                            key={table.id}
                            className="p-4 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-700"
                            onClick={() => setSelectedTable(table.nome)}
                        >
                            {table.nome}
                        </button>
                    )
                } else {
                    return (
                        <button
                            key={table.id}
                            className="p-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"
                            onClick={() => setSelectedTable(table.nome)}
                        >
                            {table.nome}
                        </button>
                    )
                }
            })}
        </div>
            )

}