// src/components/Header/Header.jsx
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css'; // Add this import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf,
  faSeedling,
  faFlask,
  faChartLine,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <h1><FontAwesomeIcon icon={faLeaf} /> AgriSolutions</h1>
        </div>
        <nav>
          <ul>
            {currentUser ? (
              <>
                <li><NavLink to="/crop-recommendation" className={({isActive}) => isActive ? styles.active : ''}><FontAwesomeIcon icon={faSeedling} /> Crop Rec</NavLink></li>
                <li><NavLink to="/fertilizer-recommendation" className={({isActive}) => isActive ? styles.active : ''}><FontAwesomeIcon icon={faFlask} /> Fertilizer</NavLink></li>
                <li><NavLink to="/yield-prediction" className={({isActive}) => isActive ? styles.active : ''}><FontAwesomeIcon icon={faChartLine} /> Yield</NavLink></li>
                <li><button onClick={logout} className={styles.logoutBtn}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</button></li>
              </>
            ) : (
              <>
                <li><NavLink to="/" className={({isActive}) => isActive ? styles.active : ''}>Home</NavLink></li>
                <li><NavLink to="/login" className={({isActive}) => isActive ? styles.active : ''}>Login</NavLink></li>
                <li><NavLink to="/signup" className={({isActive}) => isActive ? styles.active : ''}>Signup</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}