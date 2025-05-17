// src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute() {
  const { currentUser } = useAuth() // We'll create this context next

  return currentUser ? <Outlet /> : <Navigate to="/login" />
}