"use client"
import Image from "next/image";
import styles from "./mainContainer.module.css";
import { useUser } from "@/context/userContext";

export default function Header() {
    const {user} = useUser();
    return(
        <div className={styles.navbar}>
            <Image src="/images/header/logo.ico" alt="بلاي ستيشن" width={50} height={50} />
            <h2>بلاي ستيشن بدر</h2>
            {user && <p className={styles.name}>{`مـرحبــاً ${user.name}`}</p>}
        </div>
    );
}