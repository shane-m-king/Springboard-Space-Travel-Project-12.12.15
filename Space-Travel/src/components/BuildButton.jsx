import styles from './BuildButton.module.css'
import { useNavigate } from 'react-router-dom';

const BuildButton = () => {
  const navigate =useNavigate();

  const handleClick = () => navigate('/new-spacecraft')
  return (
    <button className={styles['build-button']} type='button' onClick={handleClick}>Build a Spacecraft 🚀</button>
  );
}

export default BuildButton