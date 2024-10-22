"use client"
import { useRef } from "react";
import Header from "./Header";
import styles from "./mainContainer.module.css";
import Sidebar from "./Sidebar";

export default function MainContainer({children}: {children: React.ReactNode}) {
    const toggleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const toggleHandle = () => {
        toggleRef.current?.classList.toggle(styles.toggleClicked);
        contentRef.current?.classList.toggle(styles.toggleContent);
    }
    return(
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <div className={styles.toggle} ref={toggleRef} onClick={toggleHandle}><span></span></div>
                <Header />
            </div>
            <div className={styles.content} ref={contentRef}>
                <Sidebar />
                <div className={styles.mainContent}>{children}</div>
            </div>
        </div>
    );
}