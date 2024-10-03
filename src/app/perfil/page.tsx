
import { useState } from 'react';
import PerfilUsuario from '../interfaces/usuario';


const PaginaPerfil = () =>{
    const usuario = {
        nome: 'Maria Eduarda Bazilio',
        idade: 18,
        email: 'mariaeduarda@gmail.com',
    }
    return (
        <div>
            <h1>Página Perfil</h1>
            <PerfilUsuario usuario={usuario}/>
         
        </div>
    )
}

export default PaginaPerfil