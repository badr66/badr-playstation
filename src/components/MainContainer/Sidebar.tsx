import Image from "next/image";
import styles from "./mainContainer.module.css";
import AddScreen from "../screen/AddScreen";
import Logout from "../logout/Logout";
import EditUser from "../editUser/EditUser";

export default function Sidebar() {
    return(
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <p>قـائمـــة التحكـــم</p>
                <Image src="/images/control/control.ico" alt="التحكم" width={30} height={30} />
            </div>
            <AddScreen />
            <EditUser />
            <Logout />
        </div>
    );
}