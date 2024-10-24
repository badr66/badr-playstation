import Image from "next/image";
import styles from "./logout.module.css";
import { useUser } from "@/context/userContext";
import { logout } from "@/databaseFunctions/users/logout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TimedNotification from "../TimedNotification/TimedNotification";

export default function Logout() {
    const {setUser} = useUser();
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
            setUser(null);
            localStorage.removeItem("user");
            router.push("/login");
        }
    }
    return(
        <>
            <div className={styles.logout} onClick={logoutHandle}>
                <p>{loading ? "جــار الخــروج ..." : "تسـجيل الخــروج"}</p>
                <Image src="/images/logout/logout.ico" alt="" width={20} height={20} />
            </div>
        {
            error !== "" && <TimedNotification bg="rgba(0,0,0,0.3)" color="red" duration={5000} notification={error} />
        }
        </>
    );
}