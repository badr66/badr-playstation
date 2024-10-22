"use client"
import { useEffect, useState } from "react";
import styles from "./timedNotification.module.css";

export default function TimedNotification({
    bg,
    color,
    notification,
    duration,
}: {
    bg: string;
    color: string;
    notification: string;
    duration: number;
}) {
    const [isVisible, setIsVisible] = useState(true);  

    useEffect(() => {  
        const timer = setTimeout(() => {  
            setIsVisible(false);  
        }, duration);  

        return () => clearTimeout(timer);  
    }, [duration]);
    return(
        <div className={`${styles.notification} ${isVisible ? styles.visible : styles.hidden}`} style={{backgroundColor: bg, color: color}}>
            {notification}
        </div>
    );
}