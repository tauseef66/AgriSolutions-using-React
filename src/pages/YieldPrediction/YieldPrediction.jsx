import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './YieldPrediction.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCloudRain,
  faVial,
  faTemperatureHigh,
  faGlobe,
  faLeaf,
  faChartLine,
  faClipboardCheck,
  faLightbulb,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import Chart from 'chart.js/auto';

export default function YieldPrediction() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    rainfall: '',
    pesticides: '',
    temperature: '',
    area: '',
    crop: '',
    cropType: '',
    yield: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Form steps configuration
  const steps = [
    { id: 1, title: "Basic Information", icon: faLeaf },
    { id: 2, title: "Environmental Data", icon: faGlobe },
    { id: 3, title: "Crop Details", icon: faLeaf }
  ];

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('Please log in to use this feature');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Simulate API call with progress
      await new Promise(resolve => {
        const interval = setInterval(() => {
          setLoading(prev => ({
            ...prev,
            progress: prev.progress ? Math.min(prev.progress + 10, 90) : 10
          }));
        }, 200);
        
        setTimeout(() => {
          clearInterval(interval);
          resolve();
        }, 1500);
      });
      
      const predictedYield = (Math.random() * 10000).toFixed(2);
      const factors = {
        temperature: formData.temperature || '25.0',
        humidity: '65%',
        rainfall: formData.rainfall || '750',
        season: 'Kharif',
        soilQuality: 'Good'
      };
      
      setResult({
        yield: predictedYield,
        factors,
        recommendations: [
          "Adjust irrigation schedule based on predicted rainfall",
          "Consider planting dates for optimal temperature ranges",
          "Monitor soil moisture levels regularly",
          "Prepare storage and logistics based on expected yield"
        ],
        historicalData: Array.from({ length: 6 }, (_, i) => ({
          year: new Date().getFullYear() - i,
          yield: (Math.random() * 10000).toFixed(2)
        }))
      });

      // Scroll to result
      setTimeout(() => {
        document.getElementById('yieldResult')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      setError('Failed to predict yield. Please try again.');
      console.error("Yield prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initialize/destroy chart
  useEffect(() => {
    if (result && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: result.historicalData.map(data => data.year).reverse(),
          datasets: [{
            label: 'Historical Yield (hg/ha)',
            data: result.historicalData.map(data => data.yield).reverse(),
            backgroundColor: 'rgba(76, 175, 80, 0.7)',
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Yield (hg/ha)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Year'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y} hg/ha`
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [result]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles.outerContainer}>
      {/* Animated Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <FontAwesomeIcon icon={faChartLine} className={styles.headerIcon} />
          <h2>Yield Prediction</h2>
          <p>Get AI-powered yield forecasts based on your crop and environmental data</p>
        </div>
        <div className={styles.progressSteps}>
          {steps.map(step => (
            <div 
              key={step.id}
              className={`${styles.step} ${activeStep === step.id ? styles.active : ''}`}
              onClick={() => handleStepChange(step.id)}
            >
              <FontAwesomeIcon icon={step.icon} />
              <span>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {/* Multi-step Form */}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* Step 1: Basic Information */}
        <div className={`${styles.formStep} ${activeStep === 1 ? styles.active : ''}`}>
          <div className={styles.inputGroup}>
            <label htmlFor="year">Year</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faCalendar} />
              <input
                type="number"
                id="year"
                placeholder="Enter year"
                required
                min="1900"
                max="2100"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="area">Region/Country</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faGlobe} />
              <input
                type="text"
                id="area"
                placeholder="Enter your region or country"
                required
                value={formData.area}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Step 2: Environmental Data */}
        <div className={`${styles.formStep} ${activeStep === 2 ? styles.active : ''}`}>
          <div className={styles.inputGroup}>
            <label htmlFor="temperature">Average Temperature (°C)</label>
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

          <div className={styles.inputGroup}>
            <label htmlFor="rainfall">Rainfall (mm)</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faCloudRain} />
              <input
                type="number"
                id="rainfall"
                placeholder="Enter seasonal rainfall"
                required
                min="0"
                max="2000"
                value={formData.rainfall}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="pesticides">Pesticides Used (tonnes)</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faVial} />
              <input
                type="number"
                id="pesticides"
                placeholder="Enter amount used"
                required
                min="0"
                step="0.01"
                value={formData.pesticides}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Step 3: Crop Details */}
        <div className={`${styles.formStep} ${activeStep === 3 ? styles.active : ''}`}>
          <div className={styles.inputGroup}>
            <label htmlFor="crop">Crop Name</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faLeaf} />
              <input
                type="text"
                id="crop"
                placeholder="Enter crop name"
                required
                value={formData.crop}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={`${styles.inputGroup} ${styles.cropSelector}`}>
            <label htmlFor="cropType">Crop Type</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faLeaf} />
              <select
                id="cropType"
                required
                value={formData.cropType}
                onChange={handleChange}
              >
                <option value="" disabled>Select crop type</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="corn">Corn</option>
                <option value="soybean">Soybean</option>
                <option value="potato">Potato</option>
                <option value="cotton">Cotton</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="yield">Expected Yield (hg/ha)</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faChartLine} />
              <input
                type="number"
                id="yield"
                placeholder="Enter expected yield"
                required
                min="0"
                step="0.1"
                value={formData.yield}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Form Navigation */}
        <div className={styles.formNavigation}>
          {activeStep > 1 && (
            <button 
              type="button" 
              className={styles.secondaryButton}
              onClick={() => handleStepChange(activeStep - 1)}
            >
              Previous
            </button>
          )}
          
          {activeStep < steps.length ? (
            <button 
              type="button" 
              className={styles.primaryButton}
              onClick={() => handleStepChange(activeStep + 1)}
            >
              Next
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={loading} 
              className={styles.submitButton}
            >
              {loading ? (
                <>
                  <span className={styles.loadingText}>Analyzing Data</span>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${loading.progress || 0}%` }}
                    ></div>
                  </div>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faChartLine} /> Predict Yield
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Results Section */}
      {result && (
        <div id="yieldResult" className={styles.result}>
          {/* Main Result Card */}
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <FontAwesomeIcon icon={faClipboardCheck} className={styles.resultIcon} />
              <div className={styles.resultTitle}>Yield Prediction Results</div>
            </div>
            
            <div className={styles.yieldValue}>
              {result.yield} <span className={styles.unit}>hg/ha</span>
            </div>
            
            <div className={styles.yieldScale}>
              <div className={styles.scaleMeter}>
                <div 
                  className={styles.scaleIndicator} 
                  style={{ left: `${(parseFloat(result.yield) / 10000 * 100)}%` }}
                ></div>
              </div>
              <div className={styles.scaleLabels}>
                <span>Low</span>
                <span>Average</span>
                <span>High</span>
              </div>
            </div>
            
            <div className={styles.factorsGrid}>
              <div className={styles.factorCard}>
                <FontAwesomeIcon icon={faTemperatureHigh} className={styles.factorIcon} />
                <div className={styles.factorValue}>{result.factors.temperature}°C</div>
                <div className={styles.factorLabel}>Temperature</div>
              </div>
              <div className={styles.factorCard}>
                <FontAwesomeIcon icon={faCloudRain} className={styles.factorIcon} />
                <div className={styles.factorValue}>{result.factors.rainfall} mm</div>
                <div className={styles.factorLabel}>Rainfall</div>
              </div>
              <div className={styles.factorCard}>
                <FontAwesomeIcon icon={faLeaf} className={styles.factorIcon} />
                <div className={styles.factorValue}>{result.factors.soilQuality}</div>
                <div className={styles.factorLabel}>Soil Quality</div>
              </div>
              <div className={styles.factorCard}>
                <FontAwesomeIcon icon={faCalendar} className={styles.factorIcon} />
                <div className={styles.factorValue}>{result.factors.season}</div>
                <div className={styles.factorLabel}>Season</div>
              </div>
            </div>
          </div>
          
          {/* Historical Data Section */}
          <div 
            className={`${styles.resultSection} ${expandedSection === 'history' ? styles.expanded : ''}`}
            onClick={() => toggleSection('history')}
          >
            <div className={styles.sectionHeader}>
              <h3>Historical Yield Data</h3>
              <FontAwesomeIcon 
                icon={expandedSection === 'history' ? faChevronUp : faChevronDown} 
                className={styles.expandIcon}
              />
            </div>
            {expandedSection === 'history' && (
              <div className={styles.sectionContent}>
                <div className={styles.chartContainer}>
                  <canvas ref={chartRef}></canvas>
                </div>
                <div className={styles.historyTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Yield (hg/ha)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.historicalData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.year}</td>
                          <td>{data.yield}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          
          {/* Recommendations Section */}
          <div 
            className={`${styles.resultSection} ${expandedSection === 'recommendations' ? styles.expanded : ''}`}
            onClick={() => toggleSection('recommendations')}
          >
            <div className={styles.sectionHeader}>
              <h3>
                <FontAwesomeIcon icon={faLightbulb} className={styles.sectionIcon} />
                Recommendations
              </h3>
              <FontAwesomeIcon 
                icon={expandedSection === 'recommendations' ? faChevronUp : faChevronDown} 
                className={styles.expandIcon}
              />
            </div>
            {expandedSection === 'recommendations' && (
              <div className={styles.sectionContent}>
                <ul className={styles.recommendationsList}>
                  {result.recommendations.map((item, index) => (
                    <li key={index}>
                      <div className={styles.recommendationNumber}>{index + 1}</div>
                      <div className={styles.recommendationText}>{item}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}









// import { useState, useRef, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import styles from './YieldPrediction.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faCalendar,
//   faCloudRain,
//   faVial,
//   faTemperatureHigh,
//   faGlobe,
//   faLeaf,
//   faChartLine,
//   faClipboardCheck,
//   faLightbulb
// } from '@fortawesome/free-solid-svg-icons';
// import Chart from 'chart.js/auto';

// export default function YieldPrediction() {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     year: new Date().getFullYear(),
//     rainfall: '',
//     pesticides: '',
//     temperature: '',
//     area: '',
//     crop: '',
//     cropType: '',
//     yield: ''
//   });
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     // Redirect if not logged in
//     if (!currentUser) {
//       navigate('/login');
//     }
//   }, [currentUser, navigate]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!currentUser) {
//       setError('Please log in to use this feature');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const predictedYield = (Math.random() * 10000).toFixed(2);
//       const factors = {
//         temperature: formData.temperature || '25.0',
//         humidity: '65%',
//         rainfall: formData.rainfall || '750',
//         season: 'Kharif'
//       };
      
//       setResult({
//         yield: predictedYield,
//         factors,
//         recommendations: [
//           "Adjust irrigation schedule based on predicted rainfall",
//           "Consider planting dates for optimal temperature ranges",
//           "Monitor soil moisture levels regularly",
//           "Prepare storage and logistics based on expected yield"
//         ]
//       });

//       // Scroll to result
//       setTimeout(() => {
//         document.getElementById('yieldResult')?.scrollIntoView({ behavior: 'smooth' });
//       }, 100);

//     } catch (err) {
//       setError('Failed to predict yield. Please try again.');
//       console.error("Yield prediction error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize/destroy chart
//   useEffect(() => {
//     if (result && chartRef.current) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }

//       const ctx = chartRef.current.getContext('2d');
//       chartInstance.current = new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: ['Temperature', 'Rainfall', 'Humidity', 'Soil Quality'],
//           datasets: [{
//             label: 'Impact Factors',
//             data: [75, 85, 65, 90],
//             backgroundColor: [
//               'rgba(76, 175, 80, 0.7)',
//               'rgba(54, 162, 235, 0.7)',
//               'rgba(255, 206, 86, 0.7)',
//               'rgba(153, 102, 255, 0.7)'
//             ],
//             borderWidth: 1
//           }]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true,
//               max: 100
//             }
//           }
//         }
//       });
//     }

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [result]);

//   if (!currentUser) {
//     return null; // Or loading spinner while redirect happens
//   }

//   return (
//     <div className={styles.outerContainer}>
//       <div className={styles.pageHeader}>
//         <FontAwesomeIcon icon={faChartLine} className={styles.headerIcon} />
//         <h2>Yield Prediction</h2>
//         <p>Enter environmental conditions and crop information to receive an AI-powered yield prediction.</p>
//       </div>

//       {error && <div className={styles.errorAlert}>{error}</div>}

//       <form onSubmit={handleSubmit} className={styles.formContainer}>
//         {/* Year */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="year">Year</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faCalendar} />
//             <input
//               type="number"
//               id="year"
//               placeholder="Enter year"
//               required
//               min="1900"
//               max="2100"
//               value={formData.year}
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
//               placeholder="Enter seasonal rainfall"
//               required
//               min="0"
//               max="2000"
//               value={formData.rainfall}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Pesticides */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="pesticides">Pesticides (tonnes)</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faVial} />
//             <input
//               type="number"
//               id="pesticides"
//               placeholder="Enter amount in tonnes"
//               required
//               min="0"
//               step="0.01"
//               value={formData.pesticides}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

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

//         {/* Area */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="area">Area (Country)</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faGlobe} />
//             <input
//               type="text"
//               id="area"
//               placeholder="Enter country name"
//               required
//               value={formData.area}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Crop Name */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="crop">Crop Name</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faLeaf} />
//             <input
//               type="text"
//               id="crop"
//               placeholder="Enter crop name"
//               required
//               value={formData.crop}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Crop Type */}
//         <div className={`${styles.inputGroup} ${styles.cropSelector}`}>
//           <label htmlFor="cropType">Crop Type</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faLeaf} />
//             <select
//               id="cropType"
//               required
//               value={formData.cropType}
//               onChange={handleChange}
//             >
//               <option value="" disabled>Select a crop type</option>
//               <option value="wheat">Wheat</option>
//               <option value="rice">Rice</option>
//               <option value="corn">Corn</option>
//               <option value="soybean">Soybean</option>
//               <option value="potato">Potato</option>
//               <option value="cotton">Cotton</option>
//             </select>
//           </div>
//         </div>

//         {/* Yield */}
//         <div className={styles.inputGroup}>
//           <label htmlFor="yield">Yield (hg/ha)</label>
//           <div className={styles.inputWithIcon}>
//             <FontAwesomeIcon icon={faChartLine} />
//             <input
//               type="number"
//               id="yield"
//               placeholder="Enter yield"
//               required
//               min="0"
//               step="0.1"
//               value={formData.yield}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <button type="submit" disabled={loading} className={styles.submitButton}>
//           {loading ? (
//             <span className={styles.loadingText}>Predicting...</span>
//           ) : (
//             <>
//               <FontAwesomeIcon icon={faChartLine} /> Predict Yield
//             </>
//           )}
//         </button>
//       </form>

//       {result && (
//         <div id="yieldResult" className={styles.result}>
//           <div className={styles.resultCard}>
//             <div className={styles.resultHeader}>
//               <FontAwesomeIcon icon={faClipboardCheck} className={styles.resultIcon} />
//               <div className={styles.resultTitle}>Yield Prediction Results</div>
//             </div>
            
//             <div className={styles.yieldValue}>{result.yield} hg/ha</div>
            
//             <div className={styles.yieldScale}>
//               <div className={styles.scaleItem}>
//                 <div className={styles.scaleLabel}>Low</div>
//               </div>
//               <div className={styles.scaleItem}>
//                 <div className={styles.scaleLabel}>Average</div>
//               </div>
//               <div className={styles.scaleItem}>
//                 <div className={styles.scaleLabel}>High</div>
//               </div>
//             </div>
            
//             <div className={styles.chartContainer}>
//               <canvas ref={chartRef}></canvas>
//             </div>
            
//             <div className={styles.factorsList}>
//               <div className={styles.factorItem}>
//                 <FontAwesomeIcon icon={faTemperatureHigh} className={styles.factorIcon} />
//                 <div>
//                   <div>Temperature</div>
//                   <div className={styles.factorValue}>{result.factors.temperature}°C</div>
//                 </div>
//               </div>
//               <div className={styles.factorItem}>
//                 <FontAwesomeIcon icon={faCloudRain} className={styles.factorIcon} />
//                 <div>
//                   <div>Rainfall</div>
//                   <div className={styles.factorValue}>{result.factors.rainfall} mm</div>
//                 </div>
//               </div>
//               <div className={styles.factorItem}>
//                 <FontAwesomeIcon icon={faVial} className={styles.factorIcon} />
//                 <div>
//                   <div>Soil Quality</div>
//                   <div className={styles.factorValue}>Good</div>
//                 </div>
//               </div>
//               <div className={styles.factorItem}>
//                 <FontAwesomeIcon icon={faCalendar} className={styles.factorIcon} />
//                 <div>
//                   <div>Growing Season</div>
//                   <div className={styles.factorValue}>{result.factors.season}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className={styles.resultCard}>
//             <div className={styles.resultHeader}>
//               <FontAwesomeIcon icon={faLightbulb} className={styles.resultIcon} />
//               <div className={styles.resultTitle}>Recommendations</div>
//             </div>
            
//             <div className={styles.recommendations}>
//               <p>Based on the predicted yield and current conditions:</p>
//               <ul>
//                 {result.recommendations.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }