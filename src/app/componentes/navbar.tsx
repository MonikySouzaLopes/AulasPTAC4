
import Link from "next/link";
import styles from "./navbar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span>GUSTEAU`S</span>
      </div>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/menu" className={styles.link}>Cardápio</Link>
        <Link href="/reservas" className={styles.link}>Reservas</Link>
        <Link href="/contato" className={styles.link}>Contato</Link>
      </div>
      <button className={styles.button}>
        <Link  href={"/login/"}>
                <p>Fazer Login!</p>
            </Link>
        </button>
    </nav>
  );
}
