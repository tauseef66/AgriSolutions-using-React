import styles from './Dashboard.module.css'
import DashboardCard from '../../components/DashboardCard/DashboardCard'
import { faSeedling, faFlask, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
  const features = [
    {
      icon: faSeedling,
      title: "Crop Recommendation",
      description: "Get personalized crop suggestions based on your soil type and climate conditions.",
      link: "/crop-recommendation",
      btnText: "Get Started"
    },
    {
      icon: faFlask,
      title: "Fertilizer Advice",
      description: "Optimize your fertilizer usage with our AI-powered recommendations.",
      link: "/fertilizer-recommendation",
      btnText: "Get Advice"
    },
    {
      icon: faChartLine,
      title: "Yield Prediction",
      description: "Forecast your harvest yields with our advanced prediction models.",
      link: "/yield-prediction",
      btnText: "Predict Now"
    }
  ]

  return (
    <main className={styles.dashboard}>
      <section className={styles.welcomeSection}>
        <h2>Welcome to AgriSolutions</h2>
        <p>Empowering your farming decisions with AI-powered insights and recommendations.</p>
      </section>

      <section className={styles.quickStats}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>87%</div>
          <div className={styles.statLabel}>Accuracy Rate</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>5K+</div>
          <div className={styles.statLabel}>Farmers Served</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>24/7</div>
          <div className={styles.statLabel}>Support</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>15+</div>
          <div className={styles.statLabel}>Crop Varieties</div>
        </div>
      </section>

      <section className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <DashboardCard key={index} {...feature} />
        ))}
      </section>
    </main>
  )
}