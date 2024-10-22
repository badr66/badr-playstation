import styles from "./modal.module.css";
export default function ModalButtons({
    title, bg, color, clicked
}: 
{
    title: string;
    bg: string;
    color: string;
    clicked: () => void;
}) {
    return(
        <div style={{backgroundColor: bg, color: color}} onClick={clicked} className={styles.buttons}>
            {title}
        </div>
    );
}