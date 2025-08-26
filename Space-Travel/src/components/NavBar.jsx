import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
        <div id={styles['nav-bar']}>
          <p className={styles['nav-bar__emoji']}>🚀</p>
          <NavLink 
            className={({ isActive }) => `${styles['nav-bar__link']} ${isActive ? styles['nav-bar__link--active'] : ''}`} to='/'>
              Home
          </NavLink>
          <NavLink 
            className={({ isActive }) => `${styles['nav-bar__link']} ${isActive ? styles['nav-bar__link--active'] : ''}`}  to='/spacecrafts'>
              Spacecraft
          </NavLink>
          <NavLink 
            className={({ isActive }) => `${styles['nav-bar__link']} ${isActive ? styles['nav-bar__link--active'] : ''}`}  to='/planets'>
              Planets
          </NavLink>
          <p className={styles['nav-bar__emoji']}>🪐</p>          
        </div>
      </nav>  
  );
}

export default NavBar