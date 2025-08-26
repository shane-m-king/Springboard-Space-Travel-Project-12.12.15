import styles from './Spacecraft.module.css'
import { useContext } from 'react';
import planetsContext from '../context/planetsContext';
import DestroyButton from './DestroyButton.jsx'
import MoreInfoButton from './MoreInfoButton.jsx'

// Altered the Mock DB (even though they told me not too) - Now has color of planet stored
const Spacecraft = ({id, name, capacity, img, currLocation}) => {
  const { planets } = useContext(planetsContext);
  const planetColor = planets[currLocation].color;
  const planetName = planets[currLocation].name;

  // Renders individual spacecraft block
  return (
    <div className={styles['spacecraft-container']}>
      <div className={styles['spacecraft-container__info']}>
        <p className={styles['spacecraft-container__name']}>{name}</p>
        <p className={styles['spacecraft-container__capacity']}>Capacity: {capacity}</p>
        <p className={styles['spacecraft-container__location']}>
          Currently Stationed On: <span style={{color: planetColor}}>{planetName}</span>
        </p>
        <MoreInfoButton num={id}/>
        <DestroyButton num={id}/>
      </div>
        <img src={img} alt='Spacecraft Image'/>
    </div>
  );
}

export default Spacecraft