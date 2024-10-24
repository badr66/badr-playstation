"use client"
import Image from "next/image";
import styles from "./mainContainer.module.css";
import AddScreen from "../screen/AddScreen";
import Logout from "../logout/Logout";
import EditUser from "../editUser/EditUser";
import { useUser } from "@/context/userContext";
import { getUserInfo } from "@/databaseFunctions/users/getUserInfo";

export default async function Sidebar() {
    const {user} = useUser();
    let password;
    if(user) {
        const callApi = await getUserInfo(user.name);
        if(callApi.password) {
            password = callApi.password;
        }
    }
    return(
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <p>قـائمـــة التحكـــم</p>
                <Image src="/images/control/control.ico" alt="التحكم" width={30} height={30} />
            </div>
            {
                user && <>
                    <AddScreen />
                    <EditUser name = {user.name} password = {password}/>
                    <Logout />
                </>
            }
        </div>
    );
}