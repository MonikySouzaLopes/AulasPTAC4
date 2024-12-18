"use client";

import NavBar from "./componentes/navbar";
import styles from "./home.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies } from "nookies";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies();

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
         <NavBar />
    <div className={styles.container}>
   
      <center>
        <Image src="/imagem.png" alt="Imagem 2" width={1400} height={800} />
      </center>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <Image
            src="/ratatouille.jpg"
            alt="Restaurante Gusteau"
            width={400}
            height={250}
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Restaurante Gusteau</h2>
            <p className={styles.cardDescription}>
              Viva uma experiência gastronômica única no coração de Paris! Desfrute das criações
              do Chef Remy, onde cada prato é uma obra-prima.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            src="/comida.jpeg"
            alt="Restaurante Gusteau"
            width={400}
            height={250}
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Prato da casa: Ratatouille</h2>
            <p className={styles.cardDescription}>
              Viva uma experiência gastronômica única provando o nosso prato da casa.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
