// src/pages/Dashboard/Dashboard.jsx
import styles from './Dashboard.module.css';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import { faSeedling, faFlask, faChartLine, faCloudSun, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Sample chart data - replace with real data from your backend
const yieldData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 59 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 81 },
  { name: 'May', value: 56 },
  { name: 'Jun', value: 55 },
  { name: 'Jul', value: 40 }
];

const cropDistribution = [
  { name: 'Wheat', value: 35 },
  { name: 'Rice', value: 25 },
  { name: 'Corn', value: 20 },
  { name: 'Soybean', value: 15 },
  { name: 'Other', value: 5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Dashboard() {
  const features = [
    {
      icon: faSeedling,
      title: "Crop Recommendation",
      description: "Get personalized crop suggestions based on your soil type and climate conditions.",
      link: "/crop-recommendation",
      btnText: "Get Started",
      accentColor: "#4CAF50"
    },
    {
      icon: faFlask,
      title: "Fertilizer Advice",
      description: "Optimize your fertilizer usage with our AI-powered recommendations.",
      link: "/fertilizer-recommendation",
      btnText: "Get Advice",
      accentColor: "#2196F3"
    },
    {
      icon: faChartLine,
      title: "Yield Prediction",
      description: "Forecast your harvest yields with our advanced prediction models.",
      link: "/yield-prediction",
      btnText: "Predict Now",
      accentColor: "#FF9800"
    },
    {
      icon: faCloudSun,
      title: "Weather Insights",
      description: "Get localized weather forecasts and farming recommendations.",
      link: "/weather",
      btnText: "View Forecast",
      accentColor: "#03A9F4"
    },
    {
      icon: faCalendarAlt,
      title: "Farming Calendar",
      description: "Plan your agricultural activities with optimal timing.",
      link: "/calendar",
      btnText: "Plan Now",
      accentColor: "#9C27B0"
    }
  ];

  return (
    <main className={styles.dashboard}>
      <section className={styles.welcomeSection}>
        <h1>Welcome to AgriSolutions</h1>
        <p className={styles.subtitle}>Empowering your farming decisions with AI-powered insights and recommendations.</p>
      </section>

      <section className={styles.quickStats}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>87%</div>
          <div className={styles.statLabel}>Accuracy Rate</div>
          <div className={styles.statTrend}>↑ 2% from last month</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>5K+</div>
          <div className={styles.statLabel}>Farmers Served</div>
          <div className={styles.statTrend}>↑ 12% growth</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>24/7</div>
          <div className={styles.statLabel}>Support</div>
          <div className={styles.statTrend}>98% satisfaction</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>15+</div>
          <div className={styles.statLabel}>Crop Varieties</div>
          <div className={styles.statTrend}>3 new this season</div>
        </div>
      </section>

      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Yield Prediction Trend</h3>
          <LineChart width={400} height={250} data={yieldData}>
            <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} />
          </LineChart>
        </div>
        
        <div className={styles.chartContainer}>
          <h3>Crop Distribution</h3>
          <PieChart width={400} height={250}>
            <Pie
              data={cropDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {cropDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>

      <section className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <DashboardCard key={index} {...feature} />
        ))}
      </section>
    </main>
  )
}