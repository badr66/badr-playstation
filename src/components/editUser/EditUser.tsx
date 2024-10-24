import styles from "./editUser.module.css";
import TextInput from "../textInput/TextInput";
import { useState } from "react";
import Image from "next/image";
import Modal from "../modal/Modal";
import { useRouter } from "next/navigation";
import TimedNotification from "../TimedNotification/TimedNotification";
import { useUser } from "@/context/userContext";
import { editUser } from "@/databaseFunctions/users/editUser";

export default function EditUser({name}: {name: string}) {
    const {setUser} = useUser();
    const [visible, setVisible] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(name);
    const [newPassword, setNewPassword] = useState<string>("");
    const [showPass, setShowPass] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const modalBody = <div className={styles.modalBody}>
        <TextInput placeholder=" الاســـم الجديد" setValue={setNewName} type="text" value={newName} />
        <div className={styles.controlPass}>
            <TextInput placeholder="كلمــة المـرور الجديـدة" setValue={setNewPassword} type={showPass ? "text" : "password"} value={newPassword} />
            <div className={styles.controlPassVisible} onClick={ () => setShowPass(!showPass) }>
                <Image src={showPass ? "/images/account/hide.ico" : "/images/account/show.ico"} alt="" width={25} height={25} />
            </div>
        </div>
    </div>
    const onOk = async() => {
            const body = {
                newName,
                newPassword,
                id: name,
            };
            if(newName === "" || newPassword === "") {
                setError("الرجــاء إدخال الاســم وكلمة المرور");
            }
            else {
                const callApi = await editUser(body);
                if(callApi.error) {
                    setVisible(false);
                    setError(callApi.error);
                }
                else if(callApi.name) {
                    setVisible(false);
                    setError("");
                    setUser({name: callApi.name});
                    router.refresh();
    
                }
            }
    }
    return(
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

    );
}