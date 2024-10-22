import Screen from "@/components/screen/Screen";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Screen num={1} />
      <Screen num={2} />
      <Screen num={3} />
    </div>
  );
}
