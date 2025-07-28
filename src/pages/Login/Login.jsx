import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Login.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { login, googleLogin } from '../../services/api'
import { auth, googleProvider } from '../../services/firebase'
import { signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)
  try {
    const { token } = await login(email, password)
    localStorage.setItem('token', token)
    toast.success('Login successful!')
    setLoading(false)
    window.location.href = '/dashboard'//force to dashboard 
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed')
    setLoading(false)
  }
}

const { setCurrentUser } = useAuth() 

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const idToken = await result.user.getIdToken()
    const { token } = await googleLogin(idToken)
    localStorage.setItem('token', token)
    setCurrentUser({ token }) 
    navigate('/dashboard')
  } catch (err) {
    toast.error('Google login failed')
  }
}

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2><FontAwesomeIcon icon={faSignInAlt} /> Login</h2>
        {error && <div className={styles.alert}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWithIcon}>
              <FontAwesomeIcon icon={faUser} />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.loginButton}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <button onClick={handleGoogleSignIn} className={styles.loginButton}>
          Login with Google
        </button>

        <div className={styles.links}>
          <Link to="/forgot-password">Forgot Password?</Link>
          <span>|</span>
          <Link to="/signup">Create New Account</Link>
        </div>
      </div>
    </div>
  )
}