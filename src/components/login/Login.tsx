"use client"
import { FormEvent, useState } from "react";
import TextInput from "../textInput/TextInput";
import styles from "./login.module.css";
import Image from "next/image";
import { checkUser } from "@/databaseFunctions/users/checkUser";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

export default function Login() {
    const router = useRouter();
    const {setUser} = useUser();
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(name === "" || password === "") {
            setError("الـرجاء إدخــال الاسـم و كلمــة المـرور");
        }
        else {
            setLoading(true);
            const callApi = await checkUser(name, password);
            if(callApi.error) {
                setLoading(false);
                setError(callApi.error);
            }
            else if(callApi.name) {
                setLoading(false);
                setUser({name: callApi.name});
                router.push("/");
            }
        }
    }
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
                <form className={styles.loginForm} onSubmit={submitHandle}>
                    <TextInput type="text" placeholder="الاســــم" setValue={setName} />
                    <TextInput type="password" placeholder="كلمــة المرور" setValue={setPassword} />
                    <button type="submit" className={styles.submit}>{loading ? "جــاري المعالجــة" : "الـدخــــول"}</button>
                    <p className={styles.error}>{error}</p>
                </form>
            </div>
        </div>
    );
}