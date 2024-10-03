
import PerfilDaMesa from '../interfaces/mesa';


const PaginaMesa = () =>{
    const mesa = {
        id: 1,
        codigo: '098',
        n_lugares: 6,

    }
    return (
        <div>
            <h1>Página Mesa</h1>
            <PerfilDaMesa mesa={mesa}/>
         
        </div>
    )
}

export default PaginaMesa