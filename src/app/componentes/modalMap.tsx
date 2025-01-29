'use client'
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ModalMap() {
    const [isMapOpen, setIsMapOpen] = useState(false);

    return (
        <div className="w-full flex items-center justify-center m-4">
            <div 
                className="relative w-3/4 lg:w-1/4 aspect-video border-4 border-gray-400 rounded-lg shadow-md cursor-pointer"
                onClick={() => setIsMapOpen(true)}
            >
                <Image src={'/mapa.jpg'} fill alt="mapa restaurante" />

                {isMapOpen && (
                    <div 
                        className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50"
                        onClick={() => setIsMapOpen(false)} // Permite fechar ao clicar fora do modal
                    >
                        <div 
                            className="relative bg-white p-4 rounded-lg shadow-lg w-11/12 lg:w-2/3"
                            onClick={(e) => e.stopPropagation()} // Evita reabrir ao clicar dentro do modal
                        >
                            {/* Ajustando o botão para ficar acima da imagem */}
                            <button
                                className="absolute top-2 right-2 text-gray-700 hover:text-black z-50"
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita que o clique reabra o modal
                                    setIsMapOpen(false);
                                }}
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="relative w-full aspect-video">
                                <Image 
                                    src={'/mapa.jpg'} 
                                    alt="mapa restaurante" 
                                    className="w-full h-full rounded-md"
                                    layout="responsive" // Substituindo fill para evitar sobreposição
                                    width={16}
                                    height={9}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
