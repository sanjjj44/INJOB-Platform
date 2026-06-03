import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

const Navbar = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u))
    return () => unsubscribe()
  }, [])

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/jobs', label: 'Job Search' },
    { path: '/internships', label: 'Internships' },
    { path: '/threat-scanner', label: 'Threat Scanner' },
    { path: '/resume-builder', label: 'Resume Builder' },
    { path: '/community', label: 'Community' },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 999,
      background: 'rgba(5,5,16,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,255,136,0.15)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00ff88, #00cc66)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0,255,136,0.4)'
          }}>
            <span style={{ color: '#000', fontWeight: 900, fontSize: '14px' }}>IJ</span>
          </div>
          <div>
            <p style={{ color: '#fff', fontWeight: 900, fontSize: '14px', lineHeight: 1 }}>INJOB</p>
            <p style={{ color: '#00ff88', fontSize: '9px', letterSpacing: '2px', lineHeight: 1, marginTop: '3px' }}>
              CAREER INTELLIGENCE
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '7px 13px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
                background: location.pathname === link.path
                  ? 'rgba(0,255,136,0.12)'
                  : 'transparent',
                border: location.pathname === link.path
                  ? '1px solid rgba(0,255,136,0.35)'
                  : '1px solid transparent',
                color: location.pathname === link.path ? '#00ff88' : '#777',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#555', fontSize: '18px', cursor: 'pointer' }}>🔔</span>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                padding: '6px 14px',
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.2)',
                borderRadius: '8px',
              }}>
                <span style={{ color: '#00ff88', fontSize: '12px', fontWeight: 600 }}>
                  👤 {user.email.split('@')[0]}
                </span>
              </div>
              <button
                onClick={() => signOut(auth)}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(255,68,68,0.1)',
                  border: '1px solid rgba(255,68,68,0.25)',
                  color: '#ff4444',
                  fontWeight: 700,
                  fontSize: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  letterSpacing: '1px'
                }}
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                padding: '8px 20px',
                background: 'linear-gradient(135deg, #00ff88, #00cc66)',
                color: '#000',
                fontWeight: 800,
                fontSize: '12px',
                borderRadius: '8px',
                textDecoration: 'none',
                letterSpacing: '1px',
                boxShadow: '0 0 15px rgba(0,255,136,0.3)'
              }}
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: '#050510',
          borderTop: '1px solid rgba(0,255,136,0.1)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                color: location.pathname === link.path ? '#00ff88' : '#777',
                background: location.pathname === link.path
                  ? 'rgba(0,255,136,0.08)'
                  : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => { signOut(auth); setMenuOpen(false) }}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                background: 'rgba(255,68,68,0.1)',
                border: '1px solid rgba(255,68,68,0.25)',
                color: '#ff4444',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              LOGOUT
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 800,
                textDecoration: 'none',
                color: '#000',
                background: 'linear-gradient(135deg, #00ff88, #00cc66)',
                textAlign: 'center',
                marginTop: '8px'
              }}
            >
              LOGIN
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar