import styles from "./textInput.module.css";

export default function TextInput({
    placeholder,
    type,
    value,
    setValue}: {
    placeholder: string,
    type: string,
    value?: string
    setValue: (value: string) => void}) {
    const changeHandle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return(
        <div className={styles.inputContainer}>
            <input type={type}
             placeholder=" " 
             value={value}
             className={styles.inputElement} 
             onChange={changeHandle} 
             />
            <label className={styles.labelElement}>{placeholder}</label>
        </div>
    );
}