'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario2';
import styles from "./page.module.css"; 

export default function Cadastro() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    password: '',
    tipo: 'cliente',
  });

  const rota = () => {
    router.push('/');
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
    <div className={styles.container}>
      <h1 className={styles.center}>PÁGINA PARA CADASTRO</h1>
      <form>
        <label>Nome:</label>
        <input
          type="text"
          id="nome"
          placeholder="Digite seu nome"
          value={usuario.nome}
          onChange={(e) => alterarNome(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="Digite seu email"
          value={usuario.email}
          onChange={(e) => alterarEmail(e.target.value)}
        />
        <label htmlFor="senha">Senha:</label>
        <input
          type="text"
          id="password"
          placeholder="Digite sua senha"
          value={usuario.password}
          onChange={(e) => alterarSenha(e.target.value)}
        />
        <button type="button" onClick={rota}>
          Login
        </button>
      </form>
    </div>
  );
}
