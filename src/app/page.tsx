import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css"

export default function Home() {
  return (
    <div>
      <center>
      <h1 className={styles.center}>GUSTEAU`S</h1>
      <h3>Cantina Italiana</h3>
      <br />
      <h2>Faça sua reserva!</h2>
      <button className={styles.button}>
        <Link  href={"/login/"}>
                <p>Fazer Login!</p>
            </Link>
        </button>
        <br />
        </center>
      </div>
  );
}
