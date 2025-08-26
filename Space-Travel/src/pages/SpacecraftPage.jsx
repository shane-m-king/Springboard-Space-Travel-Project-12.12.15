import styles from './SpacecraftPage.module.css';
import SpacecraftCard from '../components/SpacecraftCard';

const SpacecraftPage = () => {
  return (
    <div id={styles['spacecraft-page']}>
      <SpacecraftCard/>
    </div>
  );
}

export default SpacecraftPage