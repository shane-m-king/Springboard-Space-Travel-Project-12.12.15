import styles from './Planets.module.css';
import { useState, useEffect, useContext } from 'react';
import { loadSpacecrafts, loadPlanets } from '../utils/loadData';
import spacecraftsContext from '../context/spacecraftsContext';
import planetsContext from '../context/planetsContext';
import Planet from './Planet';
import LoadingDots from './LoadingDots';
import SpaceTravelApi from '../services/SpaceTravelApi';


const Planets = () => {
  const [loading, setLoading] = useState(true);
  const { setSpacecrafts, selectedSpacecraft, setSelectedSpacecraft, setMovingSpacecraftId } = useContext(spacecraftsContext);
  const { planets, setPlanets } = useContext(planetsContext);

  // Loads Mock DB data from utility functions in loadData file
  useEffect(() => {
    loadSpacecrafts(setSpacecrafts, setLoading);
    loadPlanets(setPlanets, setLoading);
  }, []);

  // Deselects spacecraft if clicked elsewhere on page, outside of planet cards
  useEffect(() => {
    const handleClickOff = (e) => {
      if (!e.target.closest('.planet-container') && 
          !e.target.closest('.planet-spacecraft-container__item')) {
        setSelectedSpacecraft(null);
      }
    };
  
    document.addEventListener('click', handleClickOff);
    return () => document.removeEventListener('click', handleClickOff);
  }, [setSelectedSpacecraft]);

  // Loading block while mock loading occurs
  if (loading) {
    return (
      <div id={styles['planets-container-loading']}>
        <p>LOADING PLANETS<LoadingDots/></p>
      </div>
    )
  };
  
  // Move selected spaceship to valid planet
  const handlePlanetClick = async (planetId) => {
    if (!selectedSpacecraft) return;
    setMovingSpacecraftId(selectedSpacecraft.id);
    
    try {
      await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId: selectedSpacecraft.id,
        targetPlanetId: planetId
      });
      await loadSpacecrafts(setSpacecrafts);
      await loadPlanets(setPlanets);
    } catch (err) {
      console.error("Error moving spacecraft:", err);
    } finally {
      setMovingSpacecraftId(null);
      setSelectedSpacecraft(null);
    };
  };

  // Renders list of planets
  return (
    <div id={styles['planets-container']}>
      {planets.length === 0 ? (
        <p>No planets found.</p>
      ) : (
        planets.map(data => (
          <Planet
            key={data.id}
            id={data.id}
            name={data.name}
            currPop={data.currentPopulation}
            img={data.pictureUrl}
            color={data.color}
            onClick={() => handlePlanetClick(data.id)}
          />
        ))
      )}
    </div>
  );
};

export default Planets