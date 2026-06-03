import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Dashboard = () => {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const words = [
    'BRIDGING THE HUMAN-OPPORTUNITY GAP',
    'AI-POWERED RESUME MATCHING',
    'PHISHING THREAT DETECTION',
    'SECURE CAREER INTELLIGENCE',
  ]

  useEffect(() => {
    const current = words[wordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 40 : 80)
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex])

  const features = [
    { icon: '✦', title: 'Neural Matchmaking', desc: 'Advanced TF-IDF and Cosine Similarity algorithms that map your unique skill DNA to the global job market.', link: '/jobs', linkText: 'INITIALIZE SCAN', color: '#00ff88' },
    { icon: '⊙', title: 'Universal Scanner', desc: 'Stay safe from phishing and scams with our heuristic threat detection engine that scans links, emails, and SMS.', link: '/threat-scanner', linkText: 'SCAN NOW', color: '#0088ff' },
    { icon: '🤖', title: 'AI Career Assistant', desc: 'Get real-time career guidance, resume tips, and intelligent answers powered by Gemini AI.', link: '/', linkText: 'COMING SOON', color: '#8800ff' },
    { icon: '📄', title: 'Resume Builder', desc: 'Build a professional AI-powered resume tailored to your target role and industry.', link: '/resume-builder', linkText: 'BUILD NOW', color: '#ff8800' },
    { icon: '🎯', title: 'Smart Internships', desc: 'Discover internship opportunities perfectly matched to your skills and career goals.', link: '/internships', linkText: 'VIEW INTERNSHIPS', color: '#00ff88' },
    { icon: '👥', title: 'Community Feed', desc: 'Connect with fellow job seekers, share experiences, and grow your professional network.', link: '/community', linkText: 'JOIN NOW', color: '#ff4488' },
  ]

  const stats = [
    { value: '96%', label: 'Resume Match Accuracy' },
    { value: '94%', label: 'Skill Extraction' },
    { value: '95%', label: 'Phishing Detection' },
    { value: '1.5s', label: 'Avg Response Time' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#050510', paddingTop: '64px', overflowX: 'hidden' }}>

      {/* Animated Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.15,
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px', height: '800px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)'
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,100,255,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }} />
      </div>

      {/* Hero */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '90vh', padding: '40px 24px',
        textAlign: 'center'
      }}>

        {/* Badge */}
        <div style={{
          padding: '8px 24px', borderRadius: '100px', marginBottom: '32px',
          background: 'rgba(0,255,136,0.08)',
          border: '1px solid rgba(0,255,136,0.35)',
          color: '#00ff88', fontSize: '11px',
          fontWeight: 700, letterSpacing: '3px'
        }}>
          ⚡ NEXT-GEN INTELLIGENCE SUITE
        </div>

        {/* Typewriter */}
        <div style={{ maxWidth: '900px', marginBottom: '24px', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #ffffff 0%, #00ff88 60%, #0088ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {text}
            <span style={{ WebkitTextFillColor: '#00ff88' }}>|</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p style={{
          color: '#888', maxWidth: '600px', margin: '0 auto 40px',
          lineHeight: 1.8, fontSize: '15px'
        }}>
          INJOB was created to solve the inefficiency of traditional recruitment.
          By utilizing neural vector matchmaking, we ensure that every skill
          finds its rightful scale, and every professional finds their true purpose.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '80px' }}>
          <Link to="/jobs" style={{
            padding: '14px 36px',
            background: 'linear-gradient(135deg, #00ff88, #00cc66)',
            color: '#000', fontWeight: 900, fontSize: '13px',
            borderRadius: '12px', textDecoration: 'none',
            letterSpacing: '2px',
            boxShadow: '0 0 30px rgba(0,255,136,0.4)',
            transition: 'transform 0.2s'
          }}>
            🚀 START MATCHING
          </Link>
          <Link to="/threat-scanner" style={{
            padding: '14px 36px',
            background: 'rgba(0,255,136,0.06)',
            border: '2px solid rgba(0,255,136,0.4)',
            color: '#00ff88', fontWeight: 900, fontSize: '13px',
            borderRadius: '12px', textDecoration: 'none',
            letterSpacing: '2px'
          }}>
            🛡️ SCAN THREATS
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px', width: '100%', maxWidth: '800px', marginBottom: '80px'
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(0,255,136,0.05)',
              border: '1px solid rgba(0,255,136,0.15)',
              borderRadius: '16px', padding: '20px 12px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#00ff88', fontSize: '2rem', fontWeight: 900 }}>{stat.value}</p>
              <p style={{ color: '#555', fontSize: '11px', marginTop: '4px' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div style={{ width: '100%', maxWidth: '1100px' }}>
          <h2 style={{
            color: '#fff', fontSize: '2rem', fontWeight: 900,
            marginBottom: '12px', textAlign: 'center'
          }}>
            PLATFORM <span style={{ color: '#00ff88' }}>CAPABILITIES</span>
          </h2>
          <p style={{ color: '#555', fontSize: '13px', marginBottom: '40px', textAlign: 'center' }}>
            Everything you need to accelerate your career journey — powered by AI
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px'
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(17,17,24,0.9)',
                border: `1px solid ${f.color}25`,
                borderRadius: '20px',
                padding: '28px 24px',
                textAlign: 'left',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
                onMouseEnter={e => e.currentTarget.style.border = `1px solid ${f.color}60`}
                onMouseLeave={e => e.currentTarget.style.border = `1px solid ${f.color}25`}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', marginBottom: '16px'
                }}>
                  {f.icon}
                </div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '10px' }}>
                  {f.title}
                </h3>
                <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
                  {f.desc}
                </p>
                <Link to={f.link} style={{
                  color: f.color, fontSize: '11px',
                  fontWeight: 700, letterSpacing: '1px',
                  textDecoration: 'none'
                }}>
                  {f.linkText} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(0,255,136,0.08)',
        padding: '32px 24px', textAlign: 'center'
      }}>
        <p style={{ color: '#333', fontSize: '12px' }}>
          © 2025 INJOB — AI-Powered Secure Career Intelligence Platform
        </p>
        <p style={{ color: '#222', fontSize: '11px', marginTop: '4px' }}>
          SRM Valliammai Engineering College | Built with React + FastAPI + Firebase
        </p>
      </div>
    </div>
  )
}

export default Dashboard