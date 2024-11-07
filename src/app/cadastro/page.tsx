'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario2';
import styles from "./page.module.css"; 
import NavBar from '../componentes/navbar';

export default function Cadastro() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    password: '',
    tipo: 'cliente',
  });

  const rota = () => {
    router.push('/login');
  };

  const alterarNome = (novoNome: string) => {
    setUsuario((usuarioAnterior) => ({
      ...usuarioAnterior,
      nome: novoNome,
    }));
  };

  const alterarEmail = (novoEmail: string) => {
    setUsuario((usuarioAnterior) => ({
      ...usuarioAnterior,
      email: novoEmail,
    }));
  };

  const alterarSenha = (novaSenha: string) => {
    setUsuario((usuarioAnterior) => ({
      ...usuarioAnterior,
      password: novaSenha,
    }));
  };

  return (
    <div>
      <NavBar/>
    <div className={styles.container}>
      <h1 className={styles.h1}>PÁGINA PARA CADASTRO</h1>
      <form className={styles.form}>
        <label className={styles.label}>Nome:</label>
        <input
          className={styles.input}
          type="text"
          id="nome"
          placeholder="Digite seu nome"
          value={usuario.nome}
          onChange={(e) => alterarNome(e.target.value)}
        />
        <label className={styles.label} htmlFor="email">Email:</label>
        <input
          className={styles.input}
          type="text"
          id="email"
          placeholder="Digite seu email"
          value={usuario.email}
          onChange={(e) => alterarEmail(e.target.value)}
        />
        <label className={styles.label} htmlFor="senha">Senha:</label>
        <input
          className={styles.input}
          type="text"
          id="password"
          placeholder="Digite sua senha"
          value={usuario.password}
          onChange={(e) => alterarSenha(e.target.value)}
        />
        <button className={styles.button} type="button" onClick={rota}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
}
