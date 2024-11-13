'use client';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ApiURL } from '../config';
import Usuario from '../interfaces/usuario2';
import styles from "./page.module.css"; 
import NavBar from '../componentes/navbar';

interface ResponseCadastro {
  erro: boolean;
  mensagem: string;
}

export default function Cadastro() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    password: '',
    tipo: 'cliente',
  });
  const [erroCadastro, setErroCadastro] = useState<string>('');

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!usuario.nome || !usuario.email || !usuario.password) {
      setErroCadastro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(`${ApiURL}/auth/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      console.log(response)

      if (!response.ok) {
        throw new Error('Falha na requisição. Verifique o servidor.');
      }

      const data: ResponseCadastro = await response.json();
      const { erro, mensagem } = data;

      if (erro) {
        setErroCadastro(mensagem);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErroCadastro('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.h1}>PÁGINA PARA CADASTRO</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={usuario.password}
            onChange={(e) => alterarSenha(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Cadastrar
          </button>
          {erroCadastro && <p className={styles.erro}>{erroCadastro}</p>}
        </form>
      </div>
    </div>
  );
}
