import Image from "next/image";
import Usuario from "../interfaces/usuario";

type MenuProps = {
    user?: Usuario | null; // Permite que user seja opcional ou nulo
};

export default function Menu({ user }: MenuProps) {
    return (
        <div className="w-full lg:w-1/4 text-white p-4 flex items-center flex-col">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 w-full max-w-sm">
                <Image
                    src="/usuario.jpeg"
                    alt="Imagem do usuário"
                    className="w-24 h-24 mx-auto rounded-full border-2 border-indigo-500"
                    width={80}
                    height={80}
                />

                {/* Verifica se user existe antes de acessar suas propriedades */}
                <h2 className="text-center text-lg font-bold mt-4 uppercase">
                    {user ? user.nome : "Usuário Desconhecido"}
                </h2>
            </div>
        </div>
    );
}
