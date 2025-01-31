'use server'
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function logOut() {
    
        const cookieStore = await cookies()
        cookieStore.delete('restaurant-token')
        redirect('/')
    
   
}