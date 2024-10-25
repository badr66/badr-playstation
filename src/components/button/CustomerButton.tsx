import styles from "./button.module.css";

export default function CustomerButton({
    title,
    bg,
    color,
    start,
    setStart,
    pause,
    setPause,
    setSeconds,
}: {
    title: string;
    bg: string;
    color: string;
    start: boolean;
    setStart: (start: boolean) => void;
    pause: boolean;
    setPause: (start: boolean) => void;
    setSeconds?: (seconds: number) => void
}) {
    const clickHandle = () => {
        if(setSeconds) {
            setSeconds(0);
            setStart(false);
            setPause(false);
        }
        else {
            setStart(!start);
            setPause(!pause);
        }
    }
    return(
        <div className={styles.button} style={{backgroundColor: bg, color: color}} onClick={clickHandle}>{title}</div>
    )
}