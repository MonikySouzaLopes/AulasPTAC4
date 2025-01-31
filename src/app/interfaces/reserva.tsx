import Mesa from "./mesa";

interface Reserva{
    id: number;
    usuario_id: number;
    mesaId: number;
    data: string;
    n_pessoas: number;
    status: boolean;
    mesa?: Mesa
}

 export default Reserva;
