import styles from "./PlanetsPage.module.css";
import Planets from "../components/Planets";

const PlanetsPage = () => {
  return (
    <>
      <h1 id={styles['planets-header']}>PLANET NAVIGATION</h1>
      <Planets/>
    </>
  );
}

export default PlanetsPage