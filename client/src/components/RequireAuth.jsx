import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export function RequireAuth(children) {
  const { user } = useAuth()
  const location = useLocation()

  return user ? (
    <Navigate to="/" state={{ from: location}} replace/>
  ) : children
}