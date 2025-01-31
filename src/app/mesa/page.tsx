'use server'

import { redirect } from "next/navigation"
import { getUser } from "../utils/serverActions"
import Menu from "../componentes/menu"
import { ListMesas } from "./listMesas"
import { getMesa } from "../utils/mesas"
import NavBar from "../componentes/navbar"


export default async function Mesas() {
    const user = await getUser()
    const mesas = await getMesa()
    if(!user || user.tipo === "cliente" || !mesas) redirect('/')
    
        return(
            <div>
                <NavBar/>
            <div className="min-h-sreen bg-gray-100 flex flex-col lg:flex-row">
                <Menu user={user}/>
                <ListMesas mesas={mesas}/>
            </div>
            </div>
        )
}