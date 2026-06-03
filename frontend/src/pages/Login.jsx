import { useState } from 'react'
import { auth } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        console.log("EMAIL:", email)
console.log("PASSWORD:", password)
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      navigate('/')
    } catch (err) {
  alert(err.code)
  console.log(err)
  setError(err.message)
}
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    background: '#0a0a0f',
    border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: '12px',
    padding: '14px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    color: '#888',
    fontSize: '11px',
    letterSpacing: '1px',
    display: 'block',
    marginBottom: '8px'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050510',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.1,
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)'
        }} />
      </div>

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #00ff88, #00cc66)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 40px rgba(0,255,136,0.4)'
          }}>
            <span style={{ color: '#000', fontWeight: 900, fontSize: '22px' }}>IJ</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '2rem', marginBottom: '4px' }}>INJOB</h1>
          <p style={{ color: '#00ff88', fontSize: '11px', letterSpacing: '3px' }}>
            AI-POWERED CAREER INTELLIGENCE
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(17,17,24,0.95)',
          border: '1px solid rgba(0,255,136,0.2)',
          borderRadius: '24px',
          padding: '40px'
        }}>

          {/* Toggle */}
          <div style={{
            display: 'flex',
            background: '#0a0a0f',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '32px'
          }}>
            {['Login', 'Sign Up'].map((btn, i) => (
              <button
                key={btn}
                onClick={() => { setIsLogin(i === 0); setError('') }}
                style={{
                  flex: 1, padding: '10px',
                  borderRadius: '10px',
                  fontSize: '13px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                  border: 'none',
                  background: (isLogin && i === 0) || (!isLogin && i === 1)
                    ? 'linear-gradient(135deg, #00ff88, #00cc66)'
                    : 'transparent',
                  color: (isLogin && i === 0) || (!isLogin && i === 1) ? '#000' : '#555'
                }}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(255,68,68,0.1)',
              border: '1px solid rgba(255,68,68,0.3)',
              borderRadius: '10px', padding: '12px 16px',
              marginBottom: '20px'
            }}>
              <p style={{ color: '#ff4444', fontSize: '13px' }}>⚠️ {error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {!isLogin && (
              <div>
                <label style={labelStyle}>FULL NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  style={inputStyle}
                />
              </div>
            )}

            <div>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={inputStyle}
              />
            </div>

            {isLogin && (
              <p style={{ color: '#555', fontSize: '12px', textAlign: 'right', marginTop: '-10px' }}>
                <span style={{ color: '#00ff88', cursor: 'pointer' }}>Forgot password?</span>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '16px',
                background: loading
                  ? 'rgba(0,255,136,0.4)'
                  : 'linear-gradient(135deg, #00ff88, #00cc66)',
                border: 'none', borderRadius: '12px',
                color: '#000', fontWeight: 900,
                fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '2px',
                boxShadow: '0 0 30px rgba(0,255,136,0.3)',
                marginTop: '8px'
              }}
            >
              {loading ? '⏳ PROCESSING...' : isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '12px', margin: '24px 0'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            <span style={{ color: '#444', fontSize: '12px' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Social Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {['🔵 Google', '⚫ GitHub'].map((btn, i) => (
              <button key={i} style={{
                flex: 1, padding: '12px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px', color: '#888',
                fontSize: '13px', fontWeight: 600,
                cursor: 'pointer'
              }}>
                {btn}
              </button>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#333', fontSize: '12px', marginTop: '24px' }}>
          © 2025 INJOB — Secure Career Intelligence Platform
        </p>
      </div>
    </div>
  )
}

export default Login