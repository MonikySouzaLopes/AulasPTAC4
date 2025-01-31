import { getUser } from "@/app/utils/serverActions"
import Menu from "@/app/componentes/menu"
import { redirect } from "next/navigation"
import { ListMesasReserva } from "./listaMesasReserva"
import { getMesa } from "@/app/utils/mesas"
import NavBar from "@/app/componentes/navbar"

export default async function NovaReserva() {
    const user = await getUser();
    const mesas = await getMesa();

    return (
        <div>
            <NavBar/>
        <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            <Menu user={user} />
            <ListMesasReserva mesas={mesas} />
        </div>
        </div>
    );
}
