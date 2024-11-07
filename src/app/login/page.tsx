'use client'
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {ApiURL} from '../config'
import styles from "./login.module.css";
import Link from "next/link";
import NavBar from '../componentes/navbar';

export default function Login(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errologin, setErroLogin] = useState('')

    const login = () =>{
      
        if(email === 'estudanteIfms@gmail.com' && password === 'ifms2024'){
            router.push('/');
        }else{
            setErroLogin('Email ou/e senha incorretos');
        }
    };

    try{
      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
  
        const response = await fetch(`${ApiURL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application.json'
          },
          body: JSON.stringify({email, password})
        });
        if(response){
          console.log(response)
        }
        
        console.log('Email:', email);
        console.log('Senha:', password);
      }
  
    }catch(error){
      console.error('Erro na requisicao', error)
    }
    
    return(
        <div>
          <NavBar/>
           <h1 className={styles.center}>PÁGINA PARA LOGIN</h1>
           <br />
           <center>
           <input
        className={styles.input}
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        className={styles.input}
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button className={styles.button} onClick={login}>Login</button>
      {errologin && <p className={styles.p}>{errologin}</p>}
        <br />
        <button className={styles.button}>
        <Link  href={"/cadastro/"}>
                <p>Fazer Cadastro!</p>
            </Link>
        </button>
      </center>
      
    </div>
        
    )

}