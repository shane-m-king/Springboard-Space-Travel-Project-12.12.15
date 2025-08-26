import styles from './SpacecraftCard.module.css'
import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadSpacecrafts, loadPlanets } from '../utils/loadData';
import spacecraftsContext from "../context/spacecraftsContext";
import LoadingDots from "../components/LoadingDots";
import planetsContext from '../context/planetsContext';
import BackButton from '../components/BackButton';


const SpacecraftCard = () => {
  
  const navigate = useNavigate();
  const {spacecraftId} = useParams();
  const [loading, setLoading] = useState(true);
  const {spacecrafts, setSpacecrafts} = useContext(spacecraftsContext);
  const {planets, setPlanets} = useContext(planetsContext);

  // Loads Mock DB data from utility functions in loadData file
  useEffect(() => {
    loadSpacecrafts(setSpacecrafts, setLoading);
    loadPlanets(setPlanets, setLoading)
  }, []);

  // Loading block while mock loading occurs  
  if (loading) {
    return <h1 id={styles['spacecraft-card-loading']}>LOADING SPACECRAFT<LoadingDots/></h1>
  }

  // Find the correct spacecraft
  const currSpacecraft = spacecrafts.find(ship => ship.id === spacecraftId);

  // Navigate to Home Page if ship not found
  if (!currSpacecraft) navigate('/');

  const currPlanetName = planets[currSpacecraft.currentLocation].name;
  const currPlanetColor = planets[currSpacecraft.currentLocation].color;

  return (
    <div className={styles['spacecraft-card-container']}>
        <h1 className={styles['spacecraft-card-container__header']}>{currSpacecraft.name}</h1>
        <div className={styles['spacecraft-card-container__data']}>
            <img src={currSpacecraft.pictureUrl} alt='Spacecraft image not found'/>
            <p>Spacecraft Name: {currSpacecraft.name}</p>
            <p>Spacecraft Capacity: {currSpacecraft.capacity}</p>
            <p>Currently Stationed On: <span style={{color: currPlanetColor}}>{currPlanetName}</span></p>
            <p className={styles['spacecraft-card-container__desc-header']}>Description:</p>
            <p className={styles['spacecraft-card-container__desc']}>{currSpacecraft.description}</p>
        </div>
        <BackButton/>
    </div>
  );
}

export default SpacecraftCard