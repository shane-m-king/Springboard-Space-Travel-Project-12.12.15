import styles from './SpacecraftOnPlanet.module.css'
import { useState, useEffect, useContext } from 'react';
import { loadSpacecrafts } from '../utils/loadData';
import spacecraftsContext from '../context/spacecraftsContext';

const SpacecraftOnPlanet = ({planet}) => {
  
  const [, setLoading] = useState(true);
  const { spacecrafts, setSpacecrafts, selectedSpacecraft, setSelectedSpacecraft, movingSpacecraftId } = useContext(spacecraftsContext);

  // Get list of ships on this particular planet
  const currSpacecrafts = spacecrafts.filter((ship) => ship.currentLocation === planet)

  // Loads Mock DB data from utility functions in loadData file
  useEffect(() => {
    loadSpacecrafts(setSpacecrafts, setLoading);
  }, []);

  return (
    <div className={styles['planet-spacecraft-container']}>
      {currSpacecrafts.map(data => (
        <div key={data.id}
        className={`${styles['planet-spacecraft-container__item']}
          ${selectedSpacecraft?.id === data.id ? styles['planet-spacecraft-container__selected'] : ''}
          ${movingSpacecraftId === data.id ? styles['planet-spacecraft-container__moving'] : ''}`}
        onClick={(e) => {
            e.stopPropagation(); // Stops trigger planet click in addition to spacecraft
            setSelectedSpacecraft(data);
          }}
        >
          <img 
            className={styles['planet-spacecraft-container__img']}
            src={data.pictureUrl}
            alt='Spaceship Image'
          />
          <p className={styles['planet-spacecraft-container__cap']}>{data.capacity}</p>
        </div>  
      ))}
    </div>
  );
}

export default SpacecraftOnPlanet