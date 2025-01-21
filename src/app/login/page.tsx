'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ApiURL } from '../config';
import styles from './login.module.css';
import Link from 'next/link';
import NavBar from '../componentes/navbar';
import { setCookie } from 'nookies';

interface ResponseSignin {
  erro: boolean;
  mensagem: string;
  token?: string;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errologin, setErroLogin] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setErroLogin('Por favor, insira um email válido.');
      return;
    }

    if (password.length < 6) {
      setErroLogin('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Falha na requisição. Verifique o servidor.');
      }

      const data: ResponseSignin = await response.json();
      const { erro, mensagem, token = '' } = data;

      if (erro) {
        setErroLogin(mensagem);
      } else {
        // Salva o token no cookie
        setCookie(undefined, 'restaurant-token', token, {
          maxAge: 60 * 60 * 1, // 1 hora
          path: '/', // Acessível em todas as rotas
        });

        // Redireciona para a página principal
        router.push('/');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErroLogin('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <NavBar />
      <h1 className={styles.center}>PÁGINA PARA LOGIN</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <center>
          <input
            className={styles.input}
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErroLogin('');
            }}
          />
          <br /><br />
          <input
            className={styles.input}
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErroLogin('');
            }}
          />
          <br /><br />
          <button type="submit" className={styles.button}>Entrar</button>
          {errologin && <p className={styles.p}>{errologin}</p>}
          <br />
          <Link href="/cadastro">
            <button className={styles.button}>Fazer Cadastro!</button>
          </Link>
        </center>
      </form>
    </div>
  );
}
