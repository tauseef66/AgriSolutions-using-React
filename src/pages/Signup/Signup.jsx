// src/pages/Signup/Signup.jsx

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Signup.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, 
  faLock, 
  faEnvelope, 
  faUserPlus,
  faIdCard
} from '@fortawesome/free-solid-svg-icons'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords don't match")
    }
    if (formData.password.length < 6) {
      return setError("Password should be at least 6 characters")
    }

    try {
      setError('')
      setLoading(true)
      // Replace with actual signup logic
      await signup(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to create account')
    }
    setLoading(false)
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <div className={styles.signupHeader}>
          <FontAwesomeIcon icon={faUserPlus} className={styles.signupIcon} />
          <h2>Create Account</h2>
          <p>Join AgriSolutions to get AI-powered farming recommendations</p>
        </div>

        {error && <div className={styles.alert}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Full Name</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min 6 chars)"
                minLength="6"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                id="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={styles.signupButton}
          >
            {loading ? 'Creating Account...' : (
              <>
                <FontAwesomeIcon icon={faIdCard} /> Sign Up
              </>
            )}
          </button>
        </form>

        <div className={styles.loginRedirect}>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  )
}