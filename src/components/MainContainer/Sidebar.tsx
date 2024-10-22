import Image from "next/image";
import styles from "./mainContainer.module.css";

export default function Sidebar() {
    return(
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <p>قـائمـــة التحكـــم</p>
                <Image src="/images/control/control.ico" alt="التحكم" width={30} height={30} />
            </div>
        </div>
    );
}