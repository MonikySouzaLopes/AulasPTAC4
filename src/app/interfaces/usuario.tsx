interface Usuario{
    nome: string;
    idade: number;
    email?: string;
}

const PerfilUsuario: React.FC<{usuario: Usuario}> = ({usuario}) => {
    return (
        <div>
            <h1>{usuario.nome}</h1>
            <p>{usuario.idade}</p>
            {usuario.email && <p>Email: {usuario.email}</p>}
        </div>
    )
}
 export default PerfilUsuario;
