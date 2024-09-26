import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css"

export default function Home() {
  return (
    <div>
      <center>
      <h1 className={styles.center}>Página Home</h1>
      <br />
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
