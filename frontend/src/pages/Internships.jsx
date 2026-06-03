import { useState } from 'react'
import axios from 'axios'

const Internships = () => {
  const [file, setFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [skills, setSkills] = useState([])
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(false)
  const [matching, setMatching] = useState(false)
  const [location, setLocation] = useState('in')
  const [uploadDone, setUploadDone] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setUploadDone(false)
    setInternships([])
  }

  const handleUpload = async () => {
    if (!file) return alert('Please select a PDF resume first!')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('http://127.0.0.1:8000/upload-resume', formData)
      setResumeText(res.data.resume_text)
      setSkills(res.data.skills)
      setUploadDone(true)
    } catch (err) {
      alert('Error uploading resume. Make sure backend is running!')
    }
    setLoading(false)
  }

  const handleMatch = async () => {
    if (!resumeText) return alert('Please upload resume first!')
    setMatching(true)
    try {
      const formData = new FormData()
      formData.append('resume_text', resumeText)
      formData.append('skills', skills.join(','))
      formData.append('location', location)
      formData.append('mode', 'internship')
      const res = await axios.post('http://127.0.0.1:8000/api/live-match', formData)
      setInternships(res.data)
    } catch (err) {
      alert('Error fetching internships. Make sure backend is running!')
    }
    setMatching(false)
  }

  const getScoreColor = (score) => {
    if (score >= 70) return '#00ff88'
    if (score >= 40) return '#ffaa00'
    return '#ff4444'
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

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
            SMART <span style={{ color: '#00ff88' }}>INTERNSHIPS</span>
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Discover internship opportunities perfectly matched to your skills
          </p>
        </div>

        {/* Upload Card */}
        <div style={{
          background: 'rgba(17,17,24,0.95)',
          border: '1px solid rgba(0,255,136,0.2)',
          borderRadius: '24px',
          padding: '40px',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '18px', marginBottom: '28px' }}>
            ⚡ Initialize Internship Scan
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px', marginBottom: '24px' }}>
            <div>
              <label style={{ color: '#888', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>
                UPLOAD RESUME (PDF)
              </label>
              <div
                onClick={() => document.getElementById('internResume').click()}
                style={{
                  border: '2px dashed rgba(0,255,136,0.3)',
                  borderRadius: '16px',
                  padding: '40px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'rgba(0,255,136,0.02)'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,255,136,0.6)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)'}
              >
                <input id="internResume" type="file" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
                {file ? (
                  <div>
                    <p style={{ fontSize: '32px', marginBottom: '8px' }}>✅</p>
                    <p style={{ color: '#00ff88', fontSize: '14px', fontWeight: 700 }}>{file.name}</p>
                    <p style={{ color: '#555', fontSize: '11px', marginTop: '4px' }}>Click to change</p>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: '40px', marginBottom: '12px' }}>🎯</p>
                    <p style={{ color: '#aaa', fontSize: '14px' }}>Click to upload your resume</p>
                    <p style={{ color: '#555', fontSize: '11px', marginTop: '6px' }}>PDF format only</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ color: '#888', fontSize: '11px', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>
                  TARGET LOCATION
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: '100%', background: '#0a0a0f',
                    border: '1px solid rgba(0,255,136,0.25)',
                    borderRadius: '12px', padding: '12px 16px',
                    color: '#fff', fontSize: '13px', outline: 'none'
                  }}
                >
                  <option value="in">🇮🇳 India</option>
                  <option value="us">🇺🇸 USA</option>
                  <option value="gb">🇬🇧 UK</option>
                  <option value="au">🇦🇺 Australia</option>
                  <option value="ca">🇨🇦 Canada</option>
                </select>
              </div>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                style={{
                  width: '100%', padding: '14px',
                  background: 'rgba(0,255,136,0.12)',
                  border: '1px solid rgba(0,255,136,0.4)',
                  borderRadius: '12px', color: '#00ff88',
                  fontWeight: 800, fontSize: '13px',
                  cursor: file ? 'pointer' : 'not-allowed',
                  opacity: loading || !file ? 0.5 : 1,
                  letterSpacing: '1px'
                }}
              >
                {loading ? '⏳ EXTRACTING...' : '📤 UPLOAD RESUME'}
              </button>

              <div style={{
                background: 'rgba(0,255,136,0.04)',
                border: '1px solid rgba(0,255,136,0.1)',
                borderRadius: '12px', padding: '16px'
              }}>
                <p style={{ color: '#555', fontSize: '11px', marginBottom: '12px', letterSpacing: '1px' }}>INTERNSHIP STATS</p>
                {[
                  { label: 'Match Rate', value: '96%' },
                  { label: 'Live Listings', value: '500+' },
                  { label: 'Avg Match Time', value: '1.5s' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#666', fontSize: '12px' }}>{s.label}</span>
                    <span style={{ color: '#00ff88', fontSize: '11px', fontWeight: 700 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {skills.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: '#888', fontSize: '11px', letterSpacing: '1px', marginBottom: '12px' }}>
                ✓ EXTRACTED SKILLS ({skills.length} FOUND)
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill, i) => (
                  <span key={i} style={{
                    padding: '6px 14px', borderRadius: '100px',
                    background: 'rgba(0,255,136,0.08)',
                    border: '1px solid rgba(0,255,136,0.3)',
                    color: '#00ff88', fontSize: '12px', fontWeight: 600
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {uploadDone && (
            <button
              onClick={handleMatch}
              disabled={matching}
              style={{
                width: '100%', padding: '18px',
                background: matching ? 'rgba(0,255,136,0.4)' : 'linear-gradient(135deg, #00ff88, #00cc66)',
                border: 'none', borderRadius: '14px',
                color: '#000', fontWeight: 900, fontSize: '14px',
                cursor: matching ? 'not-allowed' : 'pointer',
                letterSpacing: '2px',
                boxShadow: '0 0 40px rgba(0,255,136,0.3)'
              }}
            >
              {matching ? '🔍 FINDING INTERNSHIPS...' : '⚡ FIND INTERNSHIPS'}
            </button>
          )}
        </div>

        {/* Results */}
        {internships.length > 0 && (
          <div>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '20px', marginBottom: '20px' }}>
              🎯 Internship Matches
              <span style={{ color: '#555', fontSize: '14px', fontWeight: 400, marginLeft: '12px' }}>
                {internships.length} opportunities
              </span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {internships.map((job, i) => (
                <div key={i} style={{
                  background: 'rgba(17,17,24,0.95)',
                  border: `1px solid ${getScoreColor(job.score)}35`,
                  borderRadius: '20px', padding: '24px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{job.title}</h3>
                      <p style={{ color: '#888', fontSize: '13px' }}>{job.company}</p>
                    </div>
                    <div style={{
                      padding: '6px 14px', borderRadius: '100px',
                      background: `${getScoreColor(job.score)}18`,
                      border: `1px solid ${getScoreColor(job.score)}45`,
                      color: getScoreColor(job.score),
                      fontSize: '12px', fontWeight: 800,
                      marginLeft: '12px', whiteSpace: 'nowrap'
                    }}>
                      {job.score}% Match
                    </div>
                  </div>
                  <p style={{ color: '#666', fontSize: '12px', marginBottom: '16px' }}>📍 {job.location}</p>
                  <div style={{ background: '#111', borderRadius: '100px', height: '4px', marginBottom: '16px' }}>
                    <div style={{
                      height: '4px', borderRadius: '100px',
                      width: `${job.score}%`, background: getScoreColor(job.score)
                    }} />
                  </div>
                  <a href={job.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'block', width: '100%', padding: '10px',
                    textAlign: 'center', borderRadius: '10px',
                    background: `${getScoreColor(job.score)}15`,
                    border: `1px solid ${getScoreColor(job.score)}40`,
                    color: getScoreColor(job.score),
                    fontSize: '12px', fontWeight: 800,
                    textDecoration: 'none', letterSpacing: '1px'
                  }}>
                    APPLY NOW →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {!uploadDone && (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: 'rgba(17,17,24,0.5)',
            border: '1px solid rgba(0,255,136,0.08)',
            borderRadius: '24px'
          }}>
            <p style={{ fontSize: '60px', marginBottom: '16px' }}>🎯</p>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>Intelligence Feed Empty</p>
            <p style={{ color: '#555', fontSize: '14px' }}>Upload your resume to discover matching internships</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Internships