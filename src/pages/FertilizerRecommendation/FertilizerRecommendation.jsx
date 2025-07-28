// import { useState } from 'react'
// import styles from './FertilizerRecommendation.module.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faTemperatureHigh,
//   faTint,
//   faCloudRain,
//   faVial,
//   faAtom,
//   faFire,
//   faBolt,
//   faIndustry,
//   faLayerGroup,
//   faTree,
//   faLeaf
// } from '@fortawesome/free-solid-svg-icons'

// export default function FertilizerRecommendation() {
//   const [formData, setFormData] = useState({
//     temperature: '',
//     moisture: '',
//     rainfall: '',
//     ph: '',
//     soilN: '',
//     soilP: '',
//     soilK: '',
//     carbon: '',
//     soilType: '',
//     cropName: ''
//   })
//   const [result, setResult] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e) => {
//     const { id, value } = e.target
//     setFormData(prev => ({ ...prev, [id]: value }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
    
//     // Simulate API call
//     setTimeout(() => {
//       const fertilizers = [
//         "Urea", "DAP", "NPK", "Potash", "Ammonium Sulfate",
//         "Calcium Nitrate", "Superphosphate", "Compost", "Manure"
//       ]
//       const randomFertilizer = fertilizers[Math.floor(Math.random() * fertilizers.length)]
      
//       setResult({
//         fertilizer: randomFertilizer,
//         message: `Based on your soil analysis, ${randomFertilizer} would be the most effective fertilizer for your ${formData.cropName || 'crop'}.`
//       })
//       setLoading(false)
      
//       document.getElementById('fertilizerResult').scrollIntoView({ behavior: 'smooth' })
//     }, 1500)
//   }

//   return (
//     <div className={styles.outerContainer}>
//       <div className={styles.pageHeader}>
//         <FontAwesomeIcon icon={faLeaf} className={styles.headerIcon} />
//         <h2>Fertilizer Recommendation</h2>
//         <p>Enter your soil nutrient levels to receive customized fertilizer recommendations for optimal crop growth.</p>
//       </div>

//       <form onSubmit={handleSubmit} className={styles.formContainer}>
//         {/* Temperature */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="temperature">Temperature (°C)</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faTemperatureHigh} />
//             <input
//               type="number"
//               id="temperature"
//               placeholder="Enter average temperature"
//               required
//               step="0.1"
//               min="-10"
//               max="50"
//               value={formData.temperature}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Moisture */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="moisture">Moisture</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faTint} />
//             <input
//               type="number"
//               id="moisture"
//               placeholder="Enter moisture level"
//               required
//               step="0.1"
//               min="0"
//               max="1"
//               value={formData.moisture}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Rainfall */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="rainfall">Rainfall (mm)</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faCloudRain} />
//             <input
//               type="number"
//               id="rainfall"
//               placeholder="Enter annual rainfall"
//               required
//               min="0"
//               max="5000"
//               value={formData.rainfall}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* pH */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="ph">Soil pH</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faVial} />
//             <input
//               type="number"
//               id="ph"
//               placeholder="Enter soil pH value"
//               required
//               step="0.1"
//               min="0"
//               max="14"
//               value={formData.ph}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Soil N */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="soilN">Soil Nitrogen (N)</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faAtom} />
//             <input
//               type="number"
//               id="soilN"
//               placeholder="Enter nitrogen level (ppm)"
//               required
//               min="0"
//               max="200"
//               step="0.1"
//               value={formData.soilN}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Soil P */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="soilP">Soil Phosphorus (P)</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faFire} />
//             <input
//               type="number"
//               id="soilP"
//               placeholder="Enter phosphorus level (ppm)"
//               required
//               min="0"
//               max="150"
//               step="0.1"
//               value={formData.soilP}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Soil K */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="soilK">Soil Potassium (K)</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faBolt} />
//             <input
//               type="number"
//               id="soilK"
//               placeholder="Enter potassium level (ppm)"
//               required
//               min="0"
//               max="300"
//               step="0.1"
//               value={formData.soilK}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Carbon */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="carbon">Carbon Level (C)</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faIndustry} />
//             <input
//               type="number"
//               id="carbon"
//               placeholder="Enter carbon level (ppm)"
//               required
//               min="0"
//               max="205"
//               value={formData.carbon}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Soil Type */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="soilType">Soil Type</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faLayerGroup} />
//             <input
//               type="text"
//               id="soilType"
//               placeholder="Enter soil type (e.g., Loamy)"
//               required
//               value={formData.soilType}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Crop Name */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="cropName">Crop Name</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faTree} />
//             <input
//               type="text"
//               id="cropName"
//               placeholder="Enter crop name"
//               required
//               value={formData.cropName}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Processing...' : 'Get Recommendation'}
//           {!loading && <FontAwesomeIcon icon={faLeaf} />}
//         </button>
//       </form>

//       {result && (
//         <div id="fertilizerResult" className={`${styles.result} ${styles.resultSuccess}`}>
//           <div className={styles.resultTitle}>Recommended Fertilizer:</div>
//           <div className={styles.resultFertilizer}>{result.fertilizer}</div>
//           <p>{result.message}</p>
//         </div>
//       )}
//     </div>
//   )
// }



































import { useState } from 'react'
import styles from './FertilizerRecommendation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTemperatureHigh,
  faTint,
  faCloudRain,
  faVial,
  faAtom,
  faFire,
  faBolt,
  faIndustry,
  faLayerGroup,
  faTree,
  faLeaf
} from '@fortawesome/free-solid-svg-icons'

export default function FertilizerRecommendation() {
  const [formData, setFormData] = useState({
    temperature: '',
    moisture: '',
    rainfall: '',
    ph: '',
    soilN: '',
    soilP: '',
    soilK: '',
    carbon: '',
    soilType: '',
    cropName: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { id, value } = e.target
    console.log(`[Form Update] Field: ${id}, Value: ${value}`)
    setFormData(prev => {
      const newFormData = { ...prev, [id]: value }
      console.log('[Form State] Updated form data:', newFormData)
      return newFormData
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('[Form Submit] Initiating API request with form data:', formData)
    setLoading(true)
    setError(null)

    const requestBody = {
      Temperature: parseFloat(formData.temperature),
      Moisture: parseFloat(formData.moisture),
      Rainfall: parseFloat(formData.rainfall),
      PH: parseFloat(formData.ph),
      Nitrogen: parseFloat(formData.soilN),
      Phosphorous: parseFloat(formData.soilP),
      Potassium: parseFloat(formData.soilK),
      Carbon: parseFloat(formData.carbon),
      Soil: formData.soilType,
      Crop: formData.cropName
    }

    console.log('[API Request] Sending to http://localhost:5000/api/fertilizer:', requestBody)

    try {
      const startTime = performance.now()
      const response = await fetch('http://localhost:5000/api/fertilizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      console.log(`[API Response] Status: ${response.status}, StatusText: ${response.statusText}`)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('[API Response] Received data:', data)
      console.log(`[API Performance] Request took ${(performance.now() - startTime).toFixed(2)}ms`)

      setResult(data.fertilizer)
      console.log('[Result State] Set result:', data.fertilizer)
      document.getElementById('fertilizerResult').scrollIntoView({ behavior: 'smooth' })
    } catch (err) {
      console.error('[API Error] Failed to fetch recommendation:', err.message)
      setError('An error occurred while fetching the recommendation. Please try again.')
    } finally {
      setLoading(false)
      console.log('[Loading State] Loading set to false')
    }
  }

  const handleClearResult = () => {
    console.log('[Action] Clearing result')
    setResult(null)
  }

  const handleRetry = () => {
    console.log('[Action] Retrying after error')
    setError(null)
  }

  console.log('[Render] Component rendering with state:', { formData, result, loading, error })

  return (
    <div className={styles.outerContainer}>
      <div className={styles.pageHeader}>
        <FontAwesomeIcon icon={faLeaf} className={styles.headerIcon} />
        <h2>Fertilizer Recommendation</h2>
        <p>Enter your soil nutrient levels to receive customized fertilizer recommendations for optimal crop growth.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* Temperature */}
        <div className={styles.inputGroup}>
          <label htmlFor="temperature">Temperature (°C)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faTemperatureHigh} />
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

        {/* Moisture */}
        <div className={styles.inputGroup}>
          <label htmlFor="moisture">Moisture</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faTint} />
            <input
              type="number"
              id="moisture"
              placeholder="Enter moisture level"
              required
              step="0.1"
              min="0"
              max="1"
              value={formData.moisture}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Rainfall */}
        <div className={styles.inputGroup}>
          <label htmlFor="rainfall">Rainfall (mm)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faCloudRain} />
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

        {/* pH */}
        <div className={styles.inputGroup}>
          <label htmlFor="ph">Soil pH</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faVial} />
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

        {/* Soil N */}
        <div className={styles.inputGroup}>
          <label htmlFor="soilN">Soil Nitrogen (N)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faAtom} />
            <input
              type="number"
              id="soilN"
              placeholder="Enter nitrogen level (ppm)"
              required
              min="0"
              max="200"
              step="0.1"
              value={formData.soilN}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Soil P */}
        <div className={styles.inputGroup}>
          <label htmlFor="soilP">Soil Phosphorus (P)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faFire} />
            <input
              type="number"
              id="soilP"
              placeholder="Enter phosphorus level (ppm)"
              required
              min="0"
              max="150"
              step="0.1"
              value={formData.soilP}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Soil K */}
        <div className={styles.inputGroup}>
          <label htmlFor="soilK">Soil Potassium (K)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faBolt} />
            <input
              type="number"
              id="soilK"
              placeholder="Enter potassium level (ppm)"
              required
              min="0"
              max="300"
              step="0.1"
              value={formData.soilK}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Carbon */}
        <div className={styles.inputGroup}>
          <label htmlFor="carbon">Carbon Level (C)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faIndustry} />
            <input
              type="number"
              id="carbon"
              placeholder="Enter carbon level (ppm)"
              required
              min="0"
              max="205"
              value={formData.carbon}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Soil Type */}
        <div className={styles.inputGroup}>
          <label htmlFor="soilType">Soil Type</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faLayerGroup} />
            <input
              type="text"
              id="soilType"
              placeholder="Enter soil type (e.g., Loamy)"
              required
              value={formData.soilType}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Crop Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="cropName">Crop Name</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faTree} />
            <input
              type="text"
              id="cropName"
              placeholder="Enter crop name"
              required
              value={formData.cropName}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Get Recommendation'}
          {!loading && <FontAwesomeIcon icon={faLeaf} />}
        </button>
      </form>

      {error && (
        <div id="fertilizerResult" className={`${styles.result} ${styles.resultError}`}>
          <div className={styles.resultTitle}>Error</div>
          <p>{error}</p>
          <button onClick={handleRetry} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      )}

      {result && !error && (
        <div id="fertilizerResult" className={`${styles.result} ${styles.resultSuccess}`}>
          <div className={styles.resultTitle}>Recommended Fertilizer:</div>
          <div className={styles.resultFertilizer}>{result.prediction}</div>
          <p className={styles.resultRemark}>{result.remark}</p>
          <p className={styles.resultConfidence}>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          <button 
            onClick={handleClearResult} 
            className={styles.clearButton}
          >
            Clear Result
          </button>
        </div>
      )}
    </div>
  )
}