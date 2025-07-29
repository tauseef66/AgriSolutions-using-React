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
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import Chart from 'chart.js/auto';

export default function YieldPrediction() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    rainfall: '',
    pesticides: '',
    temperature: '',
    area: '',
    crop: '',
    cropType: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('Please log in to use this feature');
      return;
    }

    // Validate form inputs
    const { year, rainfall, pesticides, temperature, area, crop, cropType } = formData;
    if (!year || !rainfall || !pesticides || !temperature || !area || (!crop && !cropType)) {
      setError('Please fill in all required fields');
      return;
    }
    if (year < 1900 || year > 2100) {
      setError('Year must be between 1900 and 2100');
      return;
    }
    if (rainfall < 0 || rainfall > 2000) {
      setError('Rainfall must be between 0 and 2000 mm');
      return;
    }
    if (pesticides < 0) {
      setError('Pesticides cannot be negative');
      return;
    }
    if (temperature < -10 || temperature > 50) {
      setError('Temperature must be between -10 and 50°C');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Prepare API request body
      const requestBody = {
        Year: parseInt(year),
        average_rain_fall_mm_per_year: parseFloat(rainfall),
        pesticides_tonnes: parseFloat(pesticides),
        avg_temp: parseFloat(temperature),
        Area: area,
        Item: crop || cropType
      };

      // Make API call
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
                    // 'Authorization': `Bearer ${currentUser.token}` 
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODhjNmMwNTMxOGRjNjg1NjViNmUxNyIsImlhdCI6MTc1MzgxMzU0OSwiZXhwIjoxNzUzODE3MTQ5fQ.0V8IPd_mDKV3rMS6_cUshwxToPLu0fJSNfHdvNa8YXs`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Validate API response
      if (!data || typeof data.yield !== 'number') {
        throw new Error('Invalid response format from server');
      }

      const predictedYield = data.yield.toFixed(2);

      // Prepare factors for display (using form data and mocked values)
      const factors = {
        temperature: temperature || '25.0',
        humidity: '65%', // Mocked as API doesn't provide
        rainfall: rainfall || '750',
        season: 'Kharif' // Mocked as API doesn't provide
      };

      setResult({
        yield: predictedYield,
        factors,
        recommendations: [
          "Adjust irrigation schedule based on predicted rainfall",
          "Consider planting dates for optimal temperature ranges",
          "Monitor soil moisture levels regularly",
          "Prepare storage and logistics based on expected yield"
        ]
      });

      // Scroll to result
      setTimeout(() => {
        document.getElementById('yieldResult')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        setError('Failed to connect to the server. Please check if the server is running or CORS is enabled.');
      } else if (err.message.includes('Invalid response')) {
        setError('Received invalid data from the server. Please try again.');
      } else {
        setError(`Server error: ${err.message}. Please try again later.`);
      }
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
          labels: ['Temperature', 'Rainfall', 'Humidity', 'Soil Quality'],
          datasets: [{
            label: 'Impact Factors',
            data: [
              Math.min((parseFloat(formData.temperature || 25) / 50) * 100, 100), // Normalize temperature (-10 to 50 -> 0 to 100%)
              Math.min((parseFloat(formData.rainfall || 750) / 2000) * 100, 100), // Normalize rainfall (0 to 2000 -> 0 to 100%)
              65, // Mocked humidity
              90 // Mocked soil quality
            ],
            backgroundColor: [
              'rgba(76, 175, 80, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(153, 102, 255, 0.7)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Impact (%)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Environmental Factors'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Environmental Impact on Yield'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
                }
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
  }, [result, formData.temperature, formData.rainfall]);

  if (!currentUser) {
    return null; // Or loading spinner while redirect happens
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.pageHeader}>
        <FontAwesomeIcon icon={faChartLine} className={styles.headerIcon} />
        <h2>Yield Prediction</h2>
        <p>Enter environmental conditions and crop information to receive an AI-powered yield prediction.</p>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* Year */}
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

        {/* Rainfall */}
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
              step="0.1"
              value={formData.rainfall}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Pesticides */}
        <div className={styles.inputGroup}>
          <label htmlFor="pesticides">Pesticides (tonnes)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faVial} />
            <input
              type="number"
              id="pesticides"
              placeholder="Enter amount in tonnes"
              required
              min="0"
              step="0.01"
              value={formData.pesticides}
              onChange={handleChange}
            />
          </div>
        </div>

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
              step="0.001"
              min="-10"
              max="50"
              value={formData.temperature}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Area */}
        <div className={styles.inputGroup}>
          <label htmlFor="area">Area (Country)</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faGlobe} />
            <input
              type="text"
              id="area"
              placeholder="Enter country name"
              required
              value={formData.area}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Crop Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="crop">Crop Name</label>
          <div className={styles.inputWithIcon}>
            <FontAwesomeIcon icon={faLeaf} />
            <input
              type="text"
              id="crop"
              placeholder="Enter crop name"
              value={formData.crop}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Crop Type */}
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
              <option value="" disabled>Select a crop type</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="soybean">Soybean</option>
              <option value="potato">Potato</option>
              <option value="cotton">Cotton</option>
              <option value="cassava">Cassava</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? (
            <span className={styles.loadingText}>Predicting...</span>
          ) : (
            <>
              <FontAwesomeIcon icon={faChartLine} /> Predict Yield
            </>
          )}
        </button>
      </form>

      {result && (
        <div id="yieldResult" className={styles.result}>
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <FontAwesomeIcon icon={faClipboardCheck} className={styles.resultIcon} />
              <div className={styles.resultTitle}>Yield Prediction Results</div>
            </div>
            
            <div className={styles.yieldValue}>{result.yield} hg/ha</div>
            
            <div className={styles.yieldScale}>
              <div className={styles.scaleItem}>
                <div className={styles.scaleLabel}>Low</div>
              </div>
              <div className={styles.scaleItem}>
                <div className={styles.scaleLabel}>Average</div>
              </div>
              <div className={styles.scaleItem}>
                <div className={styles.scaleLabel}>High</div>
              </div>
            </div>
            
            <div className={styles.chartContainer}>
              <canvas ref={chartRef}></canvas>
            </div>
            
            <div className={styles.factorsList}>
              <div className={styles.factorItem}>
                <FontAwesomeIcon icon={faTemperatureHigh} className={styles.factorIcon} />
                <div>
                  <div>Temperature</div>
                  <div className={styles.factorValue}>{result.factors.temperature}°C</div>
                </div>
              </div>
              <div className={styles.factorItem}>
                <FontAwesomeIcon icon={faCloudRain} className={styles.factorIcon} />
                <div>
                  <div>Rainfall</div>
                  <div className={styles.factorValue}>{result.factors.rainfall} mm</div>
                </div>
              </div>
              <div className={styles.factorItem}>
                <FontAwesomeIcon icon={faVial} className={styles.factorIcon} />
                <div>
                  <div>Soil Quality</div>
                  <div className={styles.factorValue}>Good</div>
                </div>
              </div>
              <div className={styles.factorItem}>
                <FontAwesomeIcon icon={faCalendar} className={styles.factorIcon} />
                <div>
                  <div>Growing Season</div>
                  <div className={styles.factorValue}>{result.factors.season}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <FontAwesomeIcon icon={faLightbulb} className={styles.resultIcon} />
              <div className={styles.resultTitle}>Recommendations</div>
            </div>
            
            <div className={styles.recommendations}>
              <p>Based on the predicted yield and current conditions:</p>
              <ul>
                {result.recommendations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}