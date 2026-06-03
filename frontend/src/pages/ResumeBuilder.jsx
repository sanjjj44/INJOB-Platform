import { useState } from 'react'

const ResumeBuilder = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    linkedin: '', github: '', summary: '',
    skills: '', education: '', experience: '',
    projects: '', certifications: '',
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const steps = [
    { id: 1, label: 'Identity', icon: '👤' },
    { id: 2, label: 'Trajectory', icon: '🎓' },
    { id: 3, label: 'Neural DNA', icon: '🧬' },
  ]

  const handleDownload = () => {
    const content = `
${formData.fullName}
${formData.email} | ${formData.phone}
${formData.linkedin} | ${formData.github}

PROFESSIONAL SUMMARY
${formData.summary}

TECHNICAL SKILLS
${formData.skills}

EDUCATION
${formData.education}

WORK EXPERIENCE
${formData.experience}

PROJECTS
${formData.projects}

CERTIFICATIONS
${formData.certifications}
    `.trim()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.fullName || 'resume'}_INJOB.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputStyle = {
    width: '100%', background: '#0a0a0f',
    border: '1px solid rgba(0,255,136,0.2)',
    borderRadius: '12px', padding: '12px 16px',
    color: '#fff', fontSize: '13px',
    outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    color: '#888', fontSize: '11px',
    letterSpacing: '1px', display: 'block',
    marginBottom: '8px'
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

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
            NEURAL ASSET <span style={{ color: '#00ff88' }}>BUILDER</span>
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Professional resume synthesis for the next-gen workforce
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setStep(s.id)}
                style={{
                  padding: '10px 20px', borderRadius: '10px',
                  fontSize: '13px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: step === s.id ? 'rgba(0,255,136,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${step === s.id ? 'rgba(0,255,136,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  color: step === s.id ? '#00ff88' : '#555'
                }}
              >
                {s.icon} {s.label}
              </button>
              {i < steps.length - 1 && (
                <span style={{ color: '#333', fontSize: '18px' }}>→</span>
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div style={{
          background: 'rgba(17,17,24,0.95)',
          border: '1px solid rgba(0,255,136,0.2)',
          borderRadius: '24px', padding: '40px'
        }}>

          {/* Step 1 */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '18px' }}>👤 Personal Identity</h2>
              {[
                { label: 'FULL LEGAL NAME', field: 'fullName', placeholder: 'e.g. Alex Watson' },
                { label: 'EMAIL ADDRESS', field: 'email', placeholder: 'e.g. alex@neural.io' },
                { label: 'PHONE NUMBER', field: 'phone', placeholder: 'e.g. +91 9876543210' },
                { label: 'LINKEDIN URL', field: 'linkedin', placeholder: 'e.g. linkedin.com/in/alexwatson' },
                { label: 'GITHUB URL', field: 'github', placeholder: 'e.g. github.com/alexwatson' },
              ].map((item) => (
                <div key={item.field}>
                  <label style={labelStyle}>{item.label}</label>
                  <input
                    type="text"
                    value={formData[item.field]}
                    onChange={(e) => handleChange(item.field, e.target.value)}
                    placeholder={item.placeholder}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div>
                <label style={labelStyle}>PROFESSIONAL SUMMARY</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => handleChange('summary', e.target.value)}
                  placeholder="Write a brief professional summary..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
              <button onClick={() => setStep(2)} style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(135deg, #00ff88, #00cc66)',
                border: 'none', borderRadius: '12px',
                color: '#000', fontWeight: 900, fontSize: '14px',
                cursor: 'pointer', letterSpacing: '2px'
              }}>
                CONTINUE TRAJECTORY →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '18px' }}>🎓 Career Trajectory</h2>
              {[
                { label: 'EDUCATION', field: 'education', placeholder: 'B.E Computer Science, SRM Valliammai Engineering College, 2023-2027, CGPA: 8.81' },
                { label: 'WORK EXPERIENCE', field: 'experience', placeholder: 'Java Full Stack Intern, Retech Solutions, June 2024 - Aug 2024...' },
                { label: 'CERTIFICATIONS', field: 'certifications', placeholder: 'NPTEL DBMS, AWS Generative AI Foundations, HP LIFE Data Science...' },
              ].map((item) => (
                <div key={item.field}>
                  <label style={labelStyle}>{item.label}</label>
                  <textarea
                    value={formData[item.field]}
                    onChange={(e) => handleChange(item.field, e.target.value)}
                    placeholder={item.placeholder}
                    rows={4}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(1)} style={{
                  flex: 1, padding: '14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px', color: '#666',
                  fontWeight: 700, fontSize: '13px', cursor: 'pointer'
                }}>
                  ← BACK
                </button>
                <button onClick={() => setStep(3)} style={{
                  flex: 2, padding: '14px',
                  background: 'linear-gradient(135deg, #00ff88, #00cc66)',
                  border: 'none', borderRadius: '12px',
                  color: '#000', fontWeight: 900,
                  fontSize: '13px', cursor: 'pointer', letterSpacing: '1px'
                }}>
                  NEURAL DNA →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '18px' }}>🧬 Neural DNA — Skills & Projects</h2>
              {[
                { label: 'TECHNICAL SKILLS', field: 'skills', placeholder: 'Python, React, FastAPI, Machine Learning, TensorFlow, OpenCV...' },
                { label: 'PROJECTS', field: 'projects', placeholder: 'Gesture-Based Virtual Mouse — MobileNetV2 + LSTM, 98% accuracy...' },
              ].map((item) => (
                <div key={item.field}>
                  <label style={labelStyle}>{item.label}</label>
                  <textarea
                    value={formData[item.field]}
                    onChange={(e) => handleChange(item.field, e.target.value)}
                    placeholder={item.placeholder}
                    rows={5}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>
              ))}

              {/* Preview */}
              {formData.fullName && (
                <div style={{
                  background: 'rgba(0,255,136,0.04)',
                  border: '1px solid rgba(0,255,136,0.2)',
                  borderRadius: '14px', padding: '20px'
                }}>
                  <p style={{ color: '#555', fontSize: '11px', letterSpacing: '1px', marginBottom: '12px' }}>PREVIEW</p>
                  <p style={{ color: '#00ff88', fontWeight: 700, fontSize: '16px' }}>{formData.fullName}</p>
                  <p style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>{formData.email} | {formData.phone}</p>
                  {formData.skills && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                      {formData.skills.split(',').slice(0, 6).map((s, i) => (
                        <span key={i} style={{
                          padding: '4px 10px', borderRadius: '100px',
                          background: 'rgba(0,255,136,0.1)',
                          color: '#00ff88', fontSize: '11px'
                        }}>
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(2)} style={{
                  flex: 1, padding: '14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px', color: '#666',
                  fontWeight: 700, fontSize: '13px', cursor: 'pointer'
                }}>
                  ← BACK
                </button>
                <button onClick={handleDownload} style={{
                  flex: 2, padding: '14px',
                  background: 'linear-gradient(135deg, #00ff88, #00cc66)',
                  border: 'none', borderRadius: '12px',
                  color: '#000', fontWeight: 900,
                  fontSize: '13px', cursor: 'pointer', letterSpacing: '1px'
                }}>
                  ⬇️ DOWNLOAD RESUME
                </button>
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#333', fontSize: '12px', marginTop: '24px' }}>
          🔒 Assets compiled using restricted neural templates for high-fidelity compliance.
        </p>
      </div>
    </div>
  )
}

export default ResumeBuilder