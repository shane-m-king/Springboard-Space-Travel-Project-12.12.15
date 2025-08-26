import styles from './DestroyButton.module.css'
import SpaceTravelApi from '../services/SpaceTravelApi';
import spacecraftsContext from '../context/spacecraftsContext';
import { useState, useContext } from 'react';

const DestroyButton = ({num}) => {
  const [loading, setLoading] = useState(false);
  const {setSpacecrafts} = useContext(spacecraftsContext);
    
  const handleClick = async () => {
    setLoading(true);
    try {
      await SpaceTravelApi.destroySpacecraftById({id: num});
      setSpacecrafts(prev => prev.filter(ship => ship.id !== num));
    } catch (err) {
      console.error('Could not destroy spaceship:', err);
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <button className={styles['destroy-button-loading']} type='button'>Loading...</button>
    );
  }

  return (
    <button className={styles['destroy-button']} type='button' onClick={handleClick}>DESTROY 💥</button>
  );
}

export default DestroyButton