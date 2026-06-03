import { useState } from 'react'
import axios from 'axios'

const ThreatScanner = () => {
  const [content, setContent] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async () => {
    if (!content.trim()) return alert('Please enter a URL or message to scan!')
    setLoading(true)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append('content', content)
      const res = await axios.post('http://127.0.0.1:8000/scan', formData)
      setResult(res.data)
    } catch (err) {
      alert('Error scanning. Make sure backend is running!')
    }
    setLoading(false)
  }

  const getStatusColor = (status) => {
    if (status === 'SAFE') return '#00ff88'
    if (status === 'SUSPICIOUS') return '#ffaa00'
    return '#ff4444'
  }

  const getStatusIcon = (status) => {
    if (status === 'SAFE') return '✅'
    if (status === 'SUSPICIOUS') return '⚠️'
    return '🚨'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050510', paddingTop: '80px', paddingBottom: '60px' }}>

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.1,
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
            UNIVERSAL <span style={{ color: '#00ff88' }}>SCANNER</span>
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Detect phishing URLs, fake job offers, and suspicious recruitment messages
          </p>
        </div>

        {/* Scanner Input */}
        <div style={{
          background: 'rgba(17,17,24,0.95)',
          border: '1px solid rgba(0,255,136,0.2)',
          borderRadius: '24px', padding: '40px',
          marginBottom: '24px'
        }}>
          <label style={{ color: '#888', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>
            PASTE URL, JOB LINK, EMAIL, OR SMS MESSAGE
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="e.g. https://suspicious-job-offer.xyz/apply&#10;or paste a suspicious recruitment message here..."
            rows={5}
            style={{
              width: '100%', background: '#0a0a0f',
              border: '1px solid rgba(0,255,136,0.2)',
              borderRadius: '14px', padding: '16px',
              color: '#fff', fontSize: '14px',
              outline: 'none', resize: 'none',
              fontFamily: 'inherit', lineHeight: 1.6,
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={handleScan}
            disabled={loading}
            style={{
              width: '100%', marginTop: '16px', padding: '18px',
              background: loading ? 'rgba(0,255,136,0.4)' : 'linear-gradient(135deg, #00ff88, #00cc66)',
              border: 'none', borderRadius: '14px',
              color: '#000', fontWeight: 900, fontSize: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '2px',
              boxShadow: '0 0 40px rgba(0,255,136,0.3)'
            }}
          >
            {loading ? '🔍 ANALYZING...' : '🔍 ANALYZE SECURITY RISK'}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div style={{
            background: `${getStatusColor(result.status)}06`,
            border: `2px solid ${getStatusColor(result.status)}40`,
            borderRadius: '24px', padding: '40px',
            marginBottom: '24px',
            boxShadow: `0 0 60px ${getStatusColor(result.status)}12`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <span style={{ fontSize: '52px' }}>{getStatusIcon(result.status)}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ color: getStatusColor(result.status), fontSize: '2rem', fontWeight: 900, marginBottom: '6px' }}>
                  {result.status}
                </h2>
                <p style={{ color: '#888', fontSize: '14px' }}>{result.message}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: getStatusColor(result.status), fontSize: '2.5rem', fontWeight: 900 }}>
                  {result.risk_score}
                </p>
                <p style={{ color: '#555', fontSize: '11px', letterSpacing: '1px' }}>RISK SCORE</p>
              </div>
            </div>

            {/* Risk Bar */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#555', fontSize: '12px', letterSpacing: '1px' }}>RISK LEVEL</span>
                <span style={{ color: '#888', fontSize: '12px' }}>{result.risk_score}/100</span>
              </div>
              <div style={{ background: '#111', borderRadius: '100px', height: '8px' }}>
                <div style={{
                  height: '8px', borderRadius: '100px',
                  width: `${result.risk_score}%`,
                  background: getStatusColor(result.status),
                  transition: 'width 1s ease'
                }} />
              </div>
            </div>

            {/* Reasons */}
            <div>
              <p style={{ color: '#555', fontSize: '11px', letterSpacing: '1px', marginBottom: '12px' }}>ANALYSIS DETAILS</p>
              {result.reasons.map((reason, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: getStatusColor(result.status), fontSize: '14px', marginTop: '2px' }}>→</span>
                  <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.5 }}>{reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{
            background: 'rgba(17,17,24,0.95)',
            border: '1px solid rgba(0,255,136,0.15)',
            borderRadius: '20px', padding: '28px'
          }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '20px' }}>
              🛡️ How INJOB Protects You
            </h3>
            {[
              { icon: '🔍', text: 'Heuristic Link Analysis — identifies typo-squatting and hidden redirects.' },
              { icon: '🤖', text: 'AI Threat Detection — pattern matching using ML models.' },
              { icon: '📊', text: 'Risk Scoring — real-time threat scoring from 0 to 100.' },
              { icon: '⚡', text: 'Instant Results — analysis completed in under 2 seconds.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <p style={{ color: '#777', fontSize: '13px', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(17,17,24,0.95)',
            border: '1px solid rgba(255,170,0,0.15)',
            borderRadius: '20px', padding: '28px'
          }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '20px' }}>
              ⚠️ Safety Protocols
            </h3>
            {[
              { icon: '🔐', title: 'MFA First', desc: 'Enable Multi-Factor Authentication on all accounts.' },
              { icon: '🔗', title: 'Check URLs', desc: 'Hover over links to verify destination before clicking.' },
              { icon: '🏢', title: 'Verify Source', desc: 'Always verify company exists before sharing personal info.' },
              { icon: '💰', title: 'No Upfront Fees', desc: 'Legitimate companies never ask for money during hiring.' },
            ].map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '18px' }}>{tip.icon}</span>
                <div>
                  <p style={{ color: '#ffaa00', fontSize: '12px', fontWeight: 700, marginBottom: '2px' }}>{tip.title}</p>
                  <p style={{ color: '#777', fontSize: '12px', lineHeight: 1.5 }}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreatScanner