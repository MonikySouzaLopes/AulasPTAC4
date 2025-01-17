"use client"
import Image from "next/image";
import { stringify } from "querystring";
import { ChangeEvent, useEffect, useState } from "react";
import NavBar from '../componentes/navbar';
import Mesa from "../interfaces/mesa";
export default function Home() {
const [mesas, setMesas] = useState<Mesa>();
  
useEffect(() => {

    async function fetchData(){
      const response = await fetch('http://localhost:8000/reservas')
      const data = await response.json()
      setMesas(data.mesas)
    }
 
  })

  function getDateNow (){
    const today = new Date()
    return today.toISOString().split("T")[0]
  }
  const [selectedTable, setSelectedTable] = useState(null);
  const [dateTables, setDateTables] = useState(getDateNow)
  const tables = [{id: 1, nome: "Mesa 1"}, {id: 2, nome: "Mesa 2"}, {id: 3, nome: "Mesa 3"}]
  const reservas = [{
    id : 1,
    mesa: 1,
    data: '2024-11-29'
  }, 
  {
    id : 1,
    mesa: 2,
    data: '2024-11-29'
  },
  {
    id : 1,
    mesa: 2,
    data: '2024-11-28'
  }]
  function handleChangeDate (e: ChangeEvent<HTMLInputElement>) {
    setDateTables(e.target.value)
  }
  return (
    <div>
      <NavBar/>
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      
      <div className="w-full lg:w-1/4 text-white p-4 flex items-center">
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 w-full max-w-sm">
          <img
            src="/usuario.jpeg"
            alt="Usuário"
            className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-500"
          />
          <h2 className="text-center text-lg font-bold mt-4">Moniky Souza Lopes</h2>
          <p className="text-center text-gray-600">Cliente</p>
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
          {tables.map((table) => {
          if (reservas.find(reserva => dateTables === reserva.data && reserva.mesa === table.id)){
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
          )}})}
        </div>
      </div>
      <div className="w-full lg:w-1/4 bg-gray-100 p-4 border-t lg:border-t-0 lg:border-l">
        {selectedTable ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Reservar {selectedTable}</h2>
            <form className="flex flex-col space-y-4">
              <label className="flex flex-col">
                Nome:
                <input
                  type="text"
                  className="p-2 border rounded"
                  placeholder="Seu nome"
                />
              </label>
              <label className="flex flex-col">
                Data:
                <input
                  type="date"
                  className="p-2 border rounded"
                />
              </label>
              <label className="flex flex-col">
                Pessoas:
                <input
                  type="number"
                  max={4}
                  min={1}
                
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
      </div>
    </div>
    </div>
  );
}