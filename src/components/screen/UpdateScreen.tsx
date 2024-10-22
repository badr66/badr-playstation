"use client"
import styles from "./screen.module.css";
import TextInput from "../textInput/TextInput";

export default function UpdateScreen({
    number,
    name,
    cost,
    setNumber, 
    setName, 
    setCost
}: {
    number: string;
    name: string;
    cost: string;
    setNumber: (num: string) => void;
    setName: (name: string) => void;
    setCost: (cost: string) => void;
}) {
    return(
        <div className={styles.modalBody}>
            <TextInput placeholder="رقــم الشاشـــة" setValue={setNumber} type="text" value={number} />
            <TextInput placeholder="اسم الشاشــة (اختيــاري)" setValue={setName} type="text" value={name} />
            <TextInput placeholder="التكلفــة (بالســاعــة)" setValue={setCost} type="text" value={String(cost)} />
        </div>

    );
}