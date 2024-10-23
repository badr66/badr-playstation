"use client"
import { useState } from "react";
import TextInput from "../textInput/TextInput";
import styles from "./login.module.css";
import Image from "next/image";

export default function Login() {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return(
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.header}>
                    <p>تســـجيل الـدخــــول</p>
                    <Image src="/images/login/login.ico" 
                    alt="" 
                    width={75} 
                    height={75} 
                    />
                </div>
                <form className={styles.loginForm}>
                    <TextInput type="text" placeholder="الاســــم" setValue={setName} />
                    <TextInput type="password" placeholder="كلمــة المرور" setValue={setPassword} />
                    <button type="submit" className={styles.submit}>الـدخــــول</button>
                    <p>{name}</p>
                    <p>{password}</p>
                </form>
            </div>
        </div>
    );
}