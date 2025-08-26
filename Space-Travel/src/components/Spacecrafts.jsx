import styles from './Spacecrafts.module.css';
import { useState, useEffect, useContext } from 'react';
import { loadSpacecrafts, loadPlanets } from '../utils/loadData';
import spacecraftsContext from '../context/spacecraftsContext';
import planetsContext from '../context/planetsContext';
import Spacecraft from './Spacecraft';
import LoadingDots from './LoadingDots';

const Spacecrafts = () => {
  const [loading, setLoading] = useState(true);
  const { spacecrafts, setSpacecrafts } = useContext(spacecraftsContext);
  const { setPlanets } = useContext(planetsContext);

  // Loads Mock DB data from utility functions in loadData file
  useEffect(() => {
    loadSpacecrafts(setSpacecrafts, setLoading);
    loadPlanets(setPlanets, setLoading);
  }, []);

  // Loading block while mock loading occurs
  if (loading) {
    return (
      <div id={styles['spacecrafts-container']}>
        <p>LOADING SPACECRAFT<LoadingDots/></p>
      </div>
    )
  };

  // Renders list of spacecraft, if any
  return (
    <div id={styles['spacecrafts-container']}>
      {spacecrafts.length === 0 ? (
        <p>No spacecrafts found.</p>
      ) : (
        spacecrafts.map(data => (
          <Spacecraft
            key={data.id}
            id={data.id}
            name={data.name}
            capacity={data.capacity}
            img={data.pictureUrl}
            currLocation={data.currentLocation}
          />
        ))
      )}
    </div>
  );
};

export default Spacecrafts