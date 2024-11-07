
import NavBar from "./componentes/navbar";
import styles from "./home.module.css";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      <NavBar />
      <center>
      <Image src="/imagem.png" alt="Imagem 2" width={1400} height={1} />
      </center>
      
    </div>
  );
}
