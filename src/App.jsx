import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import CropRecommendation from './pages/CropRecommendation/CropRecommendation'
import FertilizerRecommendation from './pages/FertilizerRecommendation/FertilizerRecommendation'
import YieldPrediction from './pages/YieldPrediction/YieldPrediction'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crop-recommendation" element={<CropRecommendation />} />
            <Route path="/fertilizer-recommendation" element={<FertilizerRecommendation />} />
            <Route path="/yield-prediction" element={<YieldPrediction />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}