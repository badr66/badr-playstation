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
    const [startTime, setStartTime] = useState<number>(0); 
    const [pause, setPause] = useState<boolean>(false);
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
        let interval: NodeJS.Timeout | null = null;  

        if (start) {  
            setStartTime(Date.now() - seconds * 1000); // لتحسين الوقت المنقضي  
            interval = setInterval(() => {  
                setSeconds(Math.floor((Date.now() - startTime) / 1000));  
            }, 1000);  
        } else {  
            if (interval) {  
                clearInterval(interval);  
            }  
        }  

        return () => {  
            if (interval) {  
                clearInterval(interval);  
            }  
        };  
    }, [start, startTime, seconds]);
    const formatTime = (totalSeconds:number) => {  
        const hours = Math.floor(totalSeconds / 3600);  
        const minutes = Math.floor((totalSeconds % 3600) / 60);  
        const seconds = totalSeconds % 60;  
        
        // إضافة الصفر البادئ  
        return [  
            String(hours).padStart(2, '0'),  
            String(minutes).padStart(2, '0'),  
            String(seconds).padStart(2, '0')  
        ].join(':');  
    }; 
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
                <Image src="/images/control/screen.ico" alt="شاشة" width={200} height={200} />
                <div className={styles.timer}>
                    <span className={styles.time}>{formatTime(seconds)}</span>
                    <span className={styles.cost}>{calculateCost()}</span>
                    <span className={styles.cost}>ل.س</span>
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
                    {
                        !start && !pause ? <CustomerButton title="بــدء" bg="green" color="white" start={start} setStart={setStart} pause={pause} setPause={setPause}/> : null
                    }
                                        {
                        start && pause ? <CustomerButton title="إيقـــاف" bg="rgb(11, 53, 53)" color="white" start={start} setStart={setStart} pause={pause} setPause={setPause}/> : null
                    }
                    {
                        seconds !== 0 && <CustomerButton title="إلغـــاء" bg="red" color="white" start={start} setStart={setStart} setSeconds={setSeconds} pause={pause} setPause={setPause}/>
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