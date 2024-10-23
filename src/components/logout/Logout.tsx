"use client"
import Image from "next/image";
import styles from "./logout.module.css";
import { useUser } from "@/context/userContext";
import { logout } from "@/databaseFunctions/users/logout";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
    const {user} = useUser();
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const logoutHandle = async () => {
        setLoading(true);
        const callApi = await logout();
        if(callApi.error) {
            setLoading(false);
            setError(callApi.error);
        }
        else {
            setLoading(false);
            router.push("/");
        }
    }
    return(
        <>
        {
            user && 
            <div className={styles.logout} onClick={logoutHandle}>
                <p>{loading ? "جــار الخــروج ..." : "تسـجيل الخــروج"}</p>
                <Image src="/images/logout/logout.ico" alt="" width={20} height={20} />
            </div>
        }

        </>
    );
}