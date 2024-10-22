"use client"
import Image from "next/image";
import styles from "./screen.module.css";
import CustomerButton from "../button/CustomerButton";
import { useEffect, useState } from "react";
import { deleteScreen } from "@/databaseFunctions/screens/deleteScreen";
import { useRouter } from "next/navigation";
import TimedNotification from "../TimedNotification/TimedNotification";
import Modal from "../modal/Modal";

export default function Screen({id, num, cost, name}: {id: number, num: string, cost: number, name?: string}) {
    const router = useRouter();
    const [start, setStart] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const deleteModalBody = <div>
        <h2 className={styles.deleteConfirm}>هل تريد بالتأكيد حذف الشاشــة ذات الرقــم: {num}</h2>
    </div>
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
    const deleteClicked = () => {
        setVisible(true);
    }
    const deleteHandle = async () => {
        const callApi = await deleteScreen(String(id));
        if(callApi.error) {
            setError(callApi.error);
            setMessage("");
        }
        else if(callApi.message) {
            setVisible(false);
            setMessage(callApi.message);
            setError("");
            router.refresh();
        }

    }
    return(
        <>
                <div className={styles.screen}>
            <p className={styles.screenDetail}>{`${name && name !== null ? name : "شاشــــة رقــم"}(${num})`}</p>
            <div className={styles.screenImg}>
                <Image src="/images/control/screen.ico" alt="شاشة" width={300} height={300} />
                <div className={styles.timer}>
                    <span className={styles.time}>{formattedTime}</span>
                    <span className={styles.cost}>{`${calculateCost()} ل.س`}</span>
                </div>
                {
                error !== "" && <TimedNotification bg="rgba(0,0,0,0.3)" color="red" duration={5000} notification={error} />
            }
            {
                message !== "" && <TimedNotification bg="rgba(0,0,0,0.3)" color="green" duration={5000} notification={message} />
            }
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
                <div onClick={deleteClicked}>حـــذف</div>
            </div>
        </div>
        <Modal title="حــذف شاشـــة" visible={visible} closed={setVisible} modalBody={deleteModalBody} onOk={deleteHandle} headerBg="rgb(240, 146, 146)" />
        </>
    );
}