import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <center>
      <h1>Página Home</h1>
      <br />
      <button>
        <Link  href={"/login/"}>
                <p>Fazer Login!</p>
            </Link>
        </button>
        </center>
      </div>
  );
}
