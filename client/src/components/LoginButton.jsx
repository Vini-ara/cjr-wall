import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export default function LoginButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()
  const ref = useRef(null)

  const from = location.state?.from?.pathname || '/'

  useGoogleAuth(ref, (response) => {
    if(response.credential) {
      signIn(response.credential, () => {
        navigate(from, { replace: true })
      })
    }
  })

  return <div ref={ref} />
}