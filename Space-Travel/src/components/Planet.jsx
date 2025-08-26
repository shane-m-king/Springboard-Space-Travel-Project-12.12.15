import styles from './Planet.module.css';
import SpacecraftOnPlanet from './SpacecraftOnPlanet';


const Planet = ({ id, name, currPop, img, color, onClick }) => {
  return (
    <div className={styles['planet-container']} style={{border: `2px solid ${color}`}} onClick={onClick}>
      <img src={img} style={{border: `1px solid ${color}`}} alt={name}/>
      <div className={styles['planet-container__info']}>
        <p className={styles['planet-container__name']} style={{textShadow: `1px 1px ${color}`}}>{name}</p>
        <p className={styles['planet-container__currPop']}>Population: {currPop}</p>
      </div>
      <SpacecraftOnPlanet 
        planet={id}
      />
    </div>
  );
}

export default Planet