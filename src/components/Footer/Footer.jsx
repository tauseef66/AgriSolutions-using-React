// src/components/Footer/Footer.jsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; 2025 AgriSolutions | AI for Smart Farming |{' '}
        <a href="/privacy" className={styles.privacyLink}>
          Privacy Policy
        </a>
      </p>
    </footer>
  )
}