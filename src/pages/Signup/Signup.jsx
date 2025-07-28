import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Signup.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope, faUserPlus, faIdCard } from '@fortawesome/free-solid-svg-icons'
import { signup, googleLogin } from '../../services/api'
import { auth, googleProvider } from '../../services/firebase'
import { signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords don't match")
    }
    if (formData.password.length < 6) {
      return setError("Password should be at least 6 characters")
    }

    setError('')
    setLoading(true)
    try {
      const { token } = await signup(formData.name, formData.email, formData.password)
      localStorage.setItem('token', token)
      toast.success('Signup successful!')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
    setLoading(false)
  }

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const idToken = await result.user.getIdToken()
    const { token } = await googleLogin(idToken)
    localStorage.setItem('token', token)
    setCurrentUser({ token }) 
    toast.success('Google login successful!')
    navigate('/dashboard')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Google login failed')
  }
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

        <button onClick={handleGoogleSignIn} className={styles.signupButton}>
          Sign Up with Google
        </button>

        <div className={styles.loginRedirect}>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  )
}
