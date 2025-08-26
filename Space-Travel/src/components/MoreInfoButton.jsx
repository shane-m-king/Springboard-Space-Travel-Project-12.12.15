import styles from './MoreInfoButton.module.css'
import { useNavigate } from 'react-router-dom';

const MoreInfoButton = ({num}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${num}`);
  }
  return (
    <button className={styles['more-info-button']} type='button' onClick={handleClick}>More Info 🔎</button>
  );
}

export default MoreInfoButton