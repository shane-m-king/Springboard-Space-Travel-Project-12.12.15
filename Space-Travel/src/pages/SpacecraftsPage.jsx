import styles from "./SpacecraftsPage.module.css";
import BuildButton from "../components/BuildButton";
import Spacecrafts from "../components/Spacecrafts";

const SpacecraftsPage = () => {
  
  
  return (
    <>
      <h1 id={styles['spacecrafts-header']}>ALL ACTIVE SPACECRAFT</h1>
      <BuildButton/>
      <Spacecrafts/>
    </>  
  );
}

export default SpacecraftsPage