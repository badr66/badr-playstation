"use client"
import styles from "./screen.module.css";
import TextInput from "../textInput/TextInput";
import { useState } from "react";
import Image from "next/image";
import Modal from "../modal/Modal";
import { addNewScreen } from "@/databaseFunctions/screens/addNewScreen";
import { useRouter } from "next/navigation";
import TimedNotification from "../TimedNotification/TimedNotification";

export default function AddScreen() {
    const [visible, setVisible] = useState<boolean>(false);
    const [number, setNumber] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();
    const modalBody = <div className={styles.modalBody}>
        <TextInput placeholder="رقــم الشاشـــة" setValue={setNumber} type="text" />
        <TextInput placeholder="اسم الشاشــة (اختيــاري)" setValue={setName} type="text" />
    </div>
    const onOk = async() => {
        const body = {
            number,
            name,
        };
        const callApi = await addNewScreen(body);
        if(callApi.error) {
            setMessage("");
            setError(callApi.error);
            setVisible(false);
        }
        else if(callApi.message) {
            setError("");
            setMessage(callApi.message);
            setVisible(false);
            router.refresh();

        }
    }
    return(
        <>  
            <div className={styles.addScreen} onClick={()=>{setVisible(true)}}>
                <p>إضافة شاشة جديدة</p>
                <Image src="/images/control/screen.ico" alt="إضافة شاشة" width={20} height={20} />
            </div>
            <Modal 
            closed={setVisible} 
            title="إضافة شاشة جديدة" 
            visible={visible} 
            modalBody={modalBody} 
            onOk={onOk}
            headerBg="cyan"/>
            {
                error !== "" && <TimedNotification bg="rgba(0,0,0,0.3)" color="red" duration={5000} notification={error} />
            }
            {
                message !== "" && <TimedNotification bg="rgba(0,0,0,0.3)" color="green" duration={5000} notification={message} />
            }
        </>

    );
}