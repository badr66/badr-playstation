"use client"
import styles from "./editUser.module.css";
import TextInput from "../textInput/TextInput";
import { useState } from "react";
import Image from "next/image";
import Modal from "../modal/Modal";
import { useRouter } from "next/navigation";
import TimedNotification from "../TimedNotification/TimedNotification";
import { useUser } from "@/context/userContext";
import { editUser } from "@/databaseFunctions/users/editUser";

export default function EditUser() {
    const {user, setUser} = useUser();
    const [visible, setVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>(user ? user.name : "");
    const [password, setPassword] = useState<string>(user ? user.password : "");
    const [showPass, setShowPass] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const modalBody = <div className={styles.modalBody}>
        <TextInput placeholder="الاســــم" setValue={setName} type="text" value={name} />
        <div className={styles.controlPass}>
            <TextInput placeholder="كلمـــة الـمرور" setValue={setPassword} type={showPass ? "text" : "password"} value={password} />
            <div className={styles.controlPassVisible} onClick={ () => setShowPass(!showPass) }>
                <Image src={showPass ? "/images/account/hide.ico" : "/images/account/show.ico"} alt="" width={25} height={25} />
            </div>
        </div>
    </div>
    const onOk = async() => {
        if(user) {
            const body = {
                name,
                password,
                id: user.id,
            };
            if(name === "" || password === "") {
                setError("الرجــاء إدخال الاســم وكلمة المرور");
            }
            else {
                const callApi = await editUser(body);
                if(callApi.error) {
                    setVisible(false);
                    setError(callApi.error);
                }
                else {
                    setVisible(false);
                    setError("");
                    setUser({id:  callApi.id, name: callApi.name, password: callApi.password});
                    router.refresh();
    
                }
            }
        }
    }
    return(
        <>  
        {
            user && (
                <>
                    <div className={styles.editUser} onClick={()=>{setVisible(true)}}>
                        <p> تعديل الحســاب</p>
                        <Image src="/images/account/edit.ico" alt="" width={20} height={20} />
                    </div>
                    <Modal 
                    closed={setVisible} 
                    title="تعديل بيـانـات الحســاب" 
                    visible={visible} 
                    modalBody={modalBody} 
                    onOk={onOk}
                    headerBg="cyan"/>
                    {
                        error !== "" && <TimedNotification bg="rgba(0,0,0,0.3)" color="red" duration={5000} notification={error} />
                    }
                </>
            )
        }
        </>

    );
}