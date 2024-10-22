"use client"
import Image from "next/image";
import styles from "./screen.module.css";
import CustomerButton from "../button/CustomerButton";
import { useEffect, useState } from "react";

export default function Screen({num, cost, name}: {num: string, cost: number, name?: string}) {
    const [start, setStart] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    useEffect(() => {
        let interval = null;
        if(start){
            interval= setInterval(() => {
                setSeconds((sec:number) => sec+1);
            }, 1000);
        } else {
            if(interval)
            clearInterval(interval);
        }
        return () => {  
            if (interval) {  
            clearInterval(interval);  
            }  
        };
    }, [start, seconds]);
    const formattedTime = new Date(seconds *1000).toISOString().slice(11,19);
    const calculateCost = () => {
        const hours = seconds /3600;
        return (hours * cost).toFixed(2);
};
    return(
        <div className={styles.screen}>
            <p className={styles.screenDetail}>{`${name && name !== null ? name : "شاشــــة رقــم"}(${num})`}</p>
            <div className={styles.screenImg}>
                <Image src="/images/control/screen.ico" alt="شاشة" width={300} height={300} />
                <div className={styles.timer}>
                    <span className={styles.time}>{formattedTime}</span>
                    <span className={styles.cost}>{`${calculateCost()} ل.س`}</span>
                </div>
            </div>
            <div className={styles.buttons}>
                    <CustomerButton title={start?"إيقـاف مؤقـت":"بــدء"} bg={start?"gray":"green"} color="white" start={start} setStart={setStart}/>
                    {
                        seconds !== 0 && <CustomerButton title="إلغـــاء" bg="red" color="white" start={start} setStart={setStart} setSeconds={setSeconds}/>
                    }
            </div>
            <div className={styles.screenCtrl} onClick={()=>{setShowOptions(!showOptions)}}>
                <Image src="/images/control/screenCtrl.ico" alt="خيارات" width={40} height={40} />
            </div>
            <div className={`${styles.options} ${showOptions ? styles.show : styles.hide}`}>
                <div>تحريـر</div>
                <div>حـــذف</div>
            </div>
        </div>
    );
}