import styles from "./button.module.css";

export default function CustomerButton({
    title,
    bg,
    color,
    start,
    setStart,
    seconds,
    setSeconds,
}: {
    title: string;
    bg: string;
    color: string;
    start: boolean;
    setStart: (start: boolean) => void;
    seconds?: number;
    setSeconds?: (seconds: number) => void
}) {
    const clickHandle = () => {
        if(setSeconds) {
            setSeconds(0);
            setStart(false);
        }
        else setStart(!start);
    }
    return(
        <div className={styles.button} style={{backgroundColor: bg, color: color}} onClick={clickHandle}>{title}</div>
    )
}