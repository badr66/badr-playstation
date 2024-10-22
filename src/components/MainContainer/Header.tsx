import Image from "next/image";
import styles from "./mainContainer.module.css";

export default function Header() {
    return(
        <div className={styles.navbar}>
            <Image src="/images/header/logo.ico" alt="بلاي ستيشن" width={50} height={50} />
            <h2>بلاي ستيشن بدر</h2>
        </div>
    );
}