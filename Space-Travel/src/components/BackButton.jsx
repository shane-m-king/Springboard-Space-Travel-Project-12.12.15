import styles from './BackButton.module.css'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();  
  const goBack = () => navigate(-1);

  return (
    <button id={styles['back-button']} type='button' onClick={goBack}>Back!</button>
  )
}

export default BackButton