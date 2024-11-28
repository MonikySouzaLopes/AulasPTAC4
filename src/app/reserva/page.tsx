"use client";

import { useState } from 'react';
import styles from './reserva.module.css';
import NavBar from '../componentes/navbar';

export default function Reserva() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [formData, setFormData] = useState({
    usuario: '',
    mesa: '',
    numeroPessoas: '',
    dataReserva: '',
  });

  const tables = ["Mesa 1", "Mesa 2"];

  const selecionarMesa = (mesaSelecionada) => {
    setSelectedTable(mesaSelecionada);
    setFormData((prevState) => ({
      ...prevState,
      mesa: mesaSelecionada,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Reserva realizada com sucesso para a ${formData.mesa}`);
    setSelectedTable(null);
    setFormData({
      usuario: '',
      mesa: '',
      numeroPessoas: '',
      dataReserva: '',
    });
  };

  return (
    <div>
        <NavBar/>
    <div className={styles.container}>
      <h1 className={styles.h1}>Página de Reserva</h1>

      <div className={styles.mesas}>
        {tables.map((mesa, index) => (
          <button
            key={index}
            className={styles.mesa}
            onClick={() => selecionarMesa(mesa)}
          >
            {mesa}
          </button>
        ))}
      </div>

      {selectedTable && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.titulo}>Reservar {selectedTable}</h2>

          <label className={styles.label}>Usuário:</label>
          <input
            className={styles.input}
            type="text"
            name="usuario"
            placeholder="Digite seu nome"
            value={formData.usuario}
            onChange={handleChange}
            required
          />

          <label className={styles.label}>Número de Pessoas:</label>
          <input
            className={styles.input}
            type="number"
            name="numeroPessoas"
            placeholder="Quantas pessoas?"
            value={formData.numeroPessoas}
            onChange={handleChange}
            required
          />

          <label className={styles.label}>Data de Reserva:</label>
          <input
            className={styles.input}
            type="date"
            name="dataReserva"
            value={formData.dataReserva}
            onChange={handleChange}
            required
          />

          <button className={styles.button} type="submit">
            Confirmar Reserva
          </button>
        </form>
      )}
    </div>
    </div>
  );
}
