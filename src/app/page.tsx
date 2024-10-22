import Screen from "@/components/screen/Screen";
import styles from "./page.module.css";
import { getScreens } from "@/databaseFunctions/screens/getScreens";

export default async function Home() {
  const fetchScreens = await getScreens();
  return (
    <div className={styles.page}>
      {
        fetchScreens.map((screen) => {
          return(
            <Screen key={screen.id} num={screen.number} name={screen.name}/>
          );
        })
      }
    </div>
  );
}
