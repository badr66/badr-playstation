"use client"
import Image from "next/image";
import styles from "./screen.module.css";
import CustomerButton from "../button/CustomerButton";
import { useEffect, useState } from "react";
import { deleteScreen } from "@/databaseFunctions/screens/deleteScreen";
import { useRouter } from "next/navigation";
import TimedNotification from "../TimedNotification/TimedNotification";
import Modal from "../modal/Modal";
import { ScreenType } from "@/types/ScreenType";
import UpdateScreen from "./UpdateScreen";
import { updateScreen } from "@/databaseFunctions/screens/updateScreen";
import { useUser } from "@/context/userContext";

export default function Screen({screen}: {screen: ScreenType}) {
    const router = useRouter();
    const {user} = useUser();
    const [start, setStart] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [action, setAction] = useState<string>("");
    const [number, setNumber] = useState<string>(screen.number);
    const [name, setName] = useState<string>(screen.name);
    const [cost, setCost] = useState<string>(String(screen.cost));
    const modalBody = action === "delete" ? <div>
        <h2 className={styles.deleteConfirm}>هل تريد بالتأكيد حذف الشاشــة ذات الرقــم: {screen.number}</h2>
    </div> : <UpdateScreen
    number={number}
    name={name}
    cost={cost} 
    setNumber={setNumber} 
    setName={setName} 
    setCost={setCost}/>
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
        return (hours * screen.cost).toFixed(2);
    };
    const deleteClicked = () => {
        setAction("delete");
        setVisible(true);
    }
    const updateClicked = () => {
        setAction("update");
        setVisible(true);
    }
    const deleteHandle = async () => {
        const callApi = await deleteScreen(String(screen.id));
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
    const updateHandle = async() => {
        const body = {
            number,
            name,
            cost: parseInt(cost),
        };
        if(!body.cost) {
            setError("الرجــاء إدخال قيمــة للتكلفــة");
        }
        else {
            const callApi = await updateScreen(body, String(screen.id));
            if(callApi.error) {
                setVisible(false);
                setMessage("");
                setError(callApi.error);
            }
            else if(callApi.message) {
                setVisible(false);
                setError("");
                setMessage(callApi.message);
                router.refresh();

            }
        }
    }
    const onOk = action === "delete" ? deleteHandle : updateHandle;
    return(
        <>
                <div className={styles.screen}>
            <p className={styles.screenDetail}>{`${screen.name && screen.name !== null ? screen.name : "شاشــــة رقــم"}(${screen.number})`}</p>
            <div className={styles.screenImg}>
                <Image src="/images/control/screen.ico" alt="شاشة" width={300} height={300} />
                <div className={styles.timer}>
                    <span className={styles.time}>{formattedTime}</span>
                    <span className={styles.cost}>{`${calculateCost()} ل.س`}</span>
                </div>
                {
                error !== "" && <TimedNotification bg="rgb(255,255,255)" color="red" duration={5000} notification={error} />
            }
            {
                message !== "" && <TimedNotification bg="rgb(255,255,255)" color="green" duration={5000} notification={message} />
            }
            </div>
            {
                user && 
                <div className={styles.buttons}>
                    <CustomerButton title={start?"إيقـاف مؤقـت":"بــدء"} bg={start?"gray":"green"} color="white" start={start} setStart={setStart}/>
                    {
                        seconds !== 0 && <CustomerButton title="إلغـــاء" bg="red" color="white" start={start} setStart={setStart} setSeconds={setSeconds}/>
                    }
               </div>
            }
            {
                user && 
                <div className={styles.screenCtrl} onClick={()=>{setShowOptions(!showOptions)}}>
                    <Image src="/images/control/screenCtrl.ico" alt="خيارات" width={30} height={30} />
                </div>
            }
            <div className={`${styles.options} ${showOptions ? styles.show : styles.hide}`}>
                <div onClick={updateClicked}>تحريـر</div>
                <div onClick={deleteClicked}>حـــذف</div>
            </div>
        </div>
        <Modal title={action === "delete" ? "حــذف شاشـــة" : "تعديل بيانات الشاشة"} 
        visible={visible} 
        closed={setVisible} 
        modalBody={modalBody} 
        onOk={onOk} 
        headerBg={action === "delete" ? "rgb(240, 146, 146)" : "cyan"} />
        </>
    );
}