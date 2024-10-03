interface Reserva{
    id: number;
    usuario_id: number;
    mesa_id: number;
    data: string;
    n_pessoas: number;
    status: boolean;
}

const PerfilDaReserva: React.FC<{reserva: Reserva}> = ({reserva}) => {
    return (
        <div>
            <h1>Id: {reserva.id}</h1>
            <p>Id do usuário: {reserva.usuario_id}</p>
            <p>Id da mesa: {reserva.mesa_id}</p>
            <p>Data: {reserva.data}</p>
            <p>Número de pessoas: {reserva.n_pessoas}</p>
            <p>Status: {reserva.status}</p>

        </div>
    )
}
 export default PerfilDaReserva;
