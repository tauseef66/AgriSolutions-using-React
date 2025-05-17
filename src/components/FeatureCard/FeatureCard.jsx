// src/components/FeatureCard/FeatureCard.jsx
import styles from './FeatureCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FeatureCard({ icon, title, description, image }) {
  return (
    <div className={styles.feature}>
      <img 
        src={`/images/${image}`} 
        alt={title} 
        className={styles.featureImage}
      />
      <div className={styles.featureContent}>
        <FontAwesomeIcon icon={icon} className={styles.featureIcon} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}