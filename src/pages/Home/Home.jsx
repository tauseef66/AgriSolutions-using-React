import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, 
  faArrowRight, 
  faChartLine,
  faFlask,
  faSeedling,
  faCloudSun,
  faTractor,
  faHandHoldingWater
} from '@fortawesome/free-solid-svg-icons';
import styles from './Home.module.css';

export default function Home() {
  const { currentUser } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const features = [
    {
      icon: faSeedling,
      title: "Crop Recommendation",
      description: "Get AI-powered crop suggestions tailored to your soil and climate conditions.",
      image: "crop.jpg",
      color: "#4CAF50"
    },
    {
      icon: faFlask,
      title: "Fertilizer Advice",
      description: "Optimize your fertilizer use with precise nutrient recommendations.",
      image: "fertilizer.jpg",
      color: "#2196F3"
    },
    {
      icon: faChartLine,
      title: "Yield Prediction",
      description: "Forecast your harvest yields with our advanced prediction models.",
      image: "yield.jpg",
      color: "#FF9800"
    }
  ];

  const stats = [
    { value: "87%", label: "Accuracy Rate", icon: faChartLine },
    { value: "5K+", label: "Farmers Served", icon: faTractor },
    { value: "24/7", label: "Support", icon: faCloudSun },
    { value: "15+", label: "Crop Varieties", icon: faSeedling }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className={styles.homeContainer}>
      {/* Animated Hero Section */}
      <section 
        className={styles.hero} 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/soil.jpg)`,
          transform: `translateY(${scrollPosition * 0.3}px)`
        }}
      >
        <div className={styles.heroContent}>
          <h1>
            <FontAwesomeIcon icon={faLeaf} className={styles.heroIcon} />
            Empowering Farmers with AI Technology
          </h1>
          <p className={styles.heroText}>
            Get intelligent, data-driven recommendations to maximize your farm's potential
          </p>
          <div className={styles.heroButtons}>
            {currentUser ? (
              <Link to="/dashboard" className={styles.primaryButton}>
                Go to Dashboard <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            ) : (
              <>
                <Link to="/signup" className={styles.primaryButton}>
                  Get Started <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <Link to="/login" className={styles.secondaryButton}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Features Showcase */}
      <section className={styles.featuresShowcase}>
        <div className={styles.featureSelector}>
          {features.map((feature, index) => (
            <button
              key={index}
              className={`${styles.featureTab} ${activeFeature === index ? styles.active : ''}`}
              onClick={() => setActiveFeature(index)}
              style={{ backgroundColor: activeFeature === index ? feature.color : '#f5f5f5' }}
            >
              <FontAwesomeIcon icon={feature.icon} />
              <span>{feature.title}</span>
            </button>
          ))}
        </div>
        
        <div className={styles.featureDisplay}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${styles.featurePanel} ${activeFeature === index ? styles.active : ''}`}
              style={{ backgroundColor: feature.color }}
            >
              <div className={styles.featureImageContainer}>
                <img 
                  src={`/images/${feature.image}`} 
                  alt={feature.title} 
                  className={styles.featureImage}
                />
              </div>
              <div className={styles.featureContent}>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
                <Link 
                  to={feature.title === 'Crop Recommendation' ? '/crop-recommendation' : 
                      feature.title === 'Fertilizer Advice' ? '/fertilizer-recommendation' : '/yield-prediction'}
                  className={styles.featureButton}
                >
                  Learn More <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={styles.statCard}
              style={{ 
                transform: `translateY(${Math.sin(scrollPosition / 150 + index) * 10}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className={styles.statIcon}>
                <FontAwesomeIcon icon={stat.icon} />
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className={styles.testimonials}>
        <h2>What Farmers Say</h2>
        <div className={styles.testimonialCarousel}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              "AgriSolutions increased my yield by 30% with their precise recommendations. A game-changer!"
            </div>
            <div className={styles.testimonialAuthor}>
              <img src="/images/farmer1.jpg" alt="Rajesh Kumar" />
              <div>
                <strong>Rajesh Kumar</strong>
                <span>Wheat Farmer, Punjab</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your Farming?</h2>
          <p>Join thousands of farmers already benefiting from our AI-powered platform</p>
          {currentUser ? (
            <Link to="/dashboard" className={styles.ctaButton}>
              Go to Dashboard <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          ) : (
            <div className={styles.ctaButtons}>
              <Link to="/signup" className={styles.ctaButtonPrimary}>
                Sign Up Free
              </Link>
              <Link to="/login" className={styles.ctaButtonSecondary}>
                Learn More
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}







// // src/pages/Home/Home.jsx
// import styles from './Home.module.css'
// import FeatureCard from '../../components/FeatureCard/FeatureCard'
// import { faSeedling, faFlask, faChartLine } from '@fortawesome/free-solid-svg-icons'

// export default function Home() {
//   const features = [
//     {
//       icon: faSeedling,
//       title: "Crop Recommendation",
//       description: "Our AI analyzes soil composition, weather patterns, and market trends to recommend the most profitable crops for your land.",
//       image: "crop.jpg"
//     },
//     {
//       icon: faFlask,
//       title: "Fertilizer Recommendation",
//       description: "Receive customized fertilizer recommendations to optimize soil health and crop productivity while reducing costs.",
//       image: "fertilizer.jpg"
//     },
//     {
//       icon: faChartLine,
//       title: "Yield Prediction",
//       description: "Accurate forecasts of your harvest yields based on real-time data and historical trends for better planning.",
//       image: "yield.jpg"
//     }
//   ]

//   return (
//     <>
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
//           <h2>Empowering Farmers with AI Technology</h2>
//           <p>Get intelligent, data-driven recommendations for crops, fertilizers, and yield predictions to maximize your farm's potential</p>
//           <a href="/dashboard" className="btn">Get Started <i className="fa fa-arrow-right"></i></a>
//         </div>
//       </section>

//       <section className={styles.features}>
//         <h2>Why Choose AgriSolutions?</h2>
//         <div className={styles.featureContainer}>
//           {features.map((feature, index) => (
//             <FeatureCard 
//               key={index}
//               icon={feature.icon}
//               title={feature.title}
//               description={feature.description}
//               image={feature.image}
//             />
//           ))}
//         </div>
//       </section>
//     </>
//   )
// }