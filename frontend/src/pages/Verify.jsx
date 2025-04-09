// src/pages/Verify.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const Verify = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleVerification = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) {
        navigate('/dashboard')
      } else {
        navigate('/login')  // fallback if session fails
      }
    }
    handleVerification()
  }, [])

  return <div>Verifying... Please wait.</div>
}

export default Verify
