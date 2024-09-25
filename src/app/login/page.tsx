'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./login.module.css";

export default function Login(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errologin, setErroLogin] = useState('')

    const login = () =>{
      
        if(email === 'estudanteIfms@gmail.com' && senha === 'ifms2024'){
            router.push('/');
        }else{
            setErroLogin('Email ou/e senha incorretos');
        }
    };

    return(
        <div>
           <center><h1>PÁGINA DE LOGIN</h1> 
           <br />
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
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <br />
      <br />
      <button onClick={login}>Login</button>
      {errologin && <p>{errologin}</p>}
      </center>
    </div>
        
    )

}