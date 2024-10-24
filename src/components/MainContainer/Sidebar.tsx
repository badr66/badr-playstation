"use client"
import Image from "next/image";
import styles from "./mainContainer.module.css";
import AddScreen from "../screen/AddScreen";
import Logout from "../logout/Logout";
import EditUser from "../editUser/EditUser";
import { useUser } from "@/context/userContext";

export default function Sidebar() {
    const {user} = useUser();
    return(
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <p>قـائمـــة التحكـــم</p>
                <Image src="/images/control/control.ico" alt="التحكم" width={30} height={30} />
            </div>
            {
                user && <>
                    <AddScreen />
                    <EditUser name = {user.name}/>
                    <Logout />
                </>
            }
        </div>
    );
}