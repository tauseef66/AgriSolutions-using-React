// src/pages/CropRecommendation/CropRecommendation.jsx
import { useState } from 'react'
import styles from './CropRecommendation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFlask, 
  faTemperatureHigh, 
  faTint, 
  faVial, 
  faCloudRain,
  faSeedling
} from '@fortawesome/free-solid-svg-icons'

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  })
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const crops = [
        "Rice", "Wheat", "Maize", "Cotton", "Sugarcane",
        "Soybean", "Potato", "Tomato", "Coffee", "Apple"
      ]
      const randomCrop = crops[Math.floor(Math.random() * crops.length)]
      
      setResult({
        crop: randomCrop,
        message: `Based on your soil and climate conditions, ${randomCrop} would be the most suitable crop for cultivation.`
      })
      setIsLoading(false)
      
      // Scroll to result
      document.getElementById('result').scrollIntoView({ behavior: 'smooth' })
    }, 1500)
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.pageHeader}>
        <FontAwesomeIcon icon={faSeedling} className={styles.headerIcon} />
        <h2>Crop Recommendation</h2>
        <p>Enter your soil and climate details to receive AI-powered crop recommendations for optimal yield.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="N">Nitrogen Level (N)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faFlask} className={styles.inputIcon} />
            <input
              type="number"
              id="N"
              placeholder="Enter nitrogen level (ppm)"
              required
              min="0"
              max="140"
              value={formData.N}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="P">Phosphorus Level (P)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faFlask} className={styles.inputIcon} />
            <input
              type="number"
              id="P"
              placeholder="Enter phosphorus level (ppm)"
              required
              min="0"
              max="145"
              value={formData.P}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="K">Potassium Level (K)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faFlask} className={styles.inputIcon} />
            <input
              type="number"
              id="K"
              placeholder="Enter potassium level (ppm)"
              required
              min="0"
              max="205"
              value={formData.K}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="temperature">Temperature (°C)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faTemperatureHigh} className={styles.inputIcon} />
            <input
              type="number"
              id="temperature"
              placeholder="Enter average temperature"
              required
              step="0.1"
              min="-10"
              max="50"
              value={formData.temperature}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="humidity">Humidity (%)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faTint} className={styles.inputIcon} />
            <input
              type="number"
              id="humidity"
              placeholder="Enter relative humidity"
              required
              min="0"
              max="100"
              value={formData.humidity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="ph">Soil pH</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faVial} className={styles.inputIcon} />
            <input
              type="number"
              id="ph"
              placeholder="Enter soil pH value"
              required
              step="0.1"
              min="0"
              max="14"
              value={formData.ph}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="rainfall">Rainfall (mm)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faCloudRain} className={styles.inputIcon} />
            <input
              type="number"
              id="rainfall"
              placeholder="Enter annual rainfall"
              required
              min="0"
              max="5000"
              value={formData.rainfall}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Get Recommendation'}
          {!isLoading && <FontAwesomeIcon icon={faSeedling} />}
        </button>
      </form>

      {result && (
        <div id="result" className={`${styles.result} ${styles.resultSuccess}`}>
          <div className={styles.resultTitle}>Recommended Crop:</div>
          <div className={styles.resultCrop}>{result.crop}</div>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  )
}