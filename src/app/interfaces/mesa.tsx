interface Mesa{
    id: number;
    codigo: string;
    n_lugares: number;
}

const PerfilDaMesa: React.FC<{mesa: Mesa}> = ({mesa}) => {
    return (
        <div>
            <h1>Id: {mesa.id}</h1>
            <p>Código: {mesa.codigo}</p>
            <p>Número de lugares: {mesa.n_lugares}</p>
        </div>
    )
}
 export default PerfilDaMesa;
