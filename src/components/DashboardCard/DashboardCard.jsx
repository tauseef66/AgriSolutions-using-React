// src/components/DashboardCard/DashboardCard.jsx
import styles from './DashboardCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function DashboardCard({ icon, title, description, link, btnText }) {
  return (
    <div className={styles.featureCard} onClick={() => window.location.href = link}>
      <div className={styles.cardIcon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} className={styles.btn}>
          {btnText}
        </Link>
      </div>
    </div>
  )
}