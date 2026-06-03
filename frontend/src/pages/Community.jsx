import { useState } from 'react'

const Community = () => {
  const [activeTab, setActiveTab] = useState('All Discussion')
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState([
    { id: 1, author: 'Sanjai S', time: '2 hours ago', content: 'Just got matched to a Data Science internship through INJOB! The neural matching is incredibly accurate 🚀', likes: 12, comments: 3, tag: 'Experience' },
    { id: 2, author: 'Priya R', time: '4 hours ago', content: 'Used the threat scanner to verify a suspicious job offer. It detected it as PHISHING immediately. Stay safe everyone!', likes: 24, comments: 7, tag: 'Resources' },
    { id: 3, author: 'Arjun K', time: '6 hours ago', content: 'Tips for getting a higher match score: Make sure your resume PDF has clear skill keywords. Got 94% match after updating!', likes: 31, comments: 11, tag: 'Questions' },
    { id: 4, author: 'Deepa M', time: '1 day ago', content: 'Looking for internship opportunities in Chennai in the AI/ML domain. Anyone have leads? 🙏', likes: 8, comments: 5, tag: 'Opportunities' },
  ])

  const tabs = ['All Discussion', 'Experience', 'Questions', 'Opportunities', 'Resources']
  const trending = ['#ai_matching', '#security_scan', '#internship2025', '#career_path', '#resume_tips']

  const handlePost = () => {
    if (!newPost.trim()) return
    setPosts([{
      id: posts.length + 1, author: 'You',
      time: 'Just now', content: newPost,
      likes: 0, comments: 0, tag: 'All Discussion'
    }, ...posts])
    setNewPost('')
  }

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  const filteredPosts = activeTab === 'All Discussion' ? posts : posts.filter(p => p.tag === activeTab)

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '6px' }}>
              COMMUNITY <span style={{ color: '#00ff88' }}>FEED</span>
            </h1>
            <p style={{ color: '#666', fontSize: '14px' }}>Secure collaboration and knowledge exchange hub</p>
          </div>
          <button
            onClick={() => document.getElementById('newPostArea').focus()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #00ff88, #00cc66)',
              border: 'none', borderRadius: '12px',
              color: '#000', fontWeight: 800,
              fontSize: '13px', cursor: 'pointer',
              letterSpacing: '1px'
            }}
          >
            + New Briefing
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>

          {/* Main Feed */}
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
              {tabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '8px 16px', borderRadius: '10px',
                  fontSize: '12px', fontWeight: 700,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  background: activeTab === tab ? 'rgba(0,255,136,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeTab === tab ? 'rgba(0,255,136,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  color: activeTab === tab ? '#00ff88' : '#666'
                }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* New Post */}
            <div style={{
              background: 'rgba(17,17,24,0.95)',
              border: '1px solid rgba(0,255,136,0.15)',
              borderRadius: '20px', padding: '24px',
              marginBottom: '20px'
            }}>
              <textarea
                id="newPostArea"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your career insights, job tips, or ask a question..."
                rows={3}
                style={{
                  width: '100%', background: 'transparent',
                  border: 'none', color: '#fff',
                  fontSize: '14px', outline: 'none',
                  resize: 'none', fontFamily: 'inherit',
                  lineHeight: 1.6, boxSizing: 'border-box'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button onClick={handlePost} style={{
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #00ff88, #00cc66)',
                  border: 'none', borderRadius: '10px',
                  color: '#000', fontWeight: 800,
                  fontSize: '12px', cursor: 'pointer',
                  letterSpacing: '1px'
                }}>
                  POST
                </button>
              </div>
            </div>

            {/* Posts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredPosts.map((post) => (
                <div key={post.id} style={{
                  background: 'rgba(17,17,24,0.95)',
                  border: '1px solid rgba(0,255,136,0.08)',
                  borderRadius: '20px', padding: '24px',
                  transition: 'border-color 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,255,136,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,255,136,0.08)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #00ff88, #00cc66)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#000', fontWeight: 900, fontSize: '14px'
                      }}>
                        {post.author[0]}
                      </div>
                      <div>
                        <p style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>{post.author}</p>
                        <p style={{ color: '#555', fontSize: '11px' }}>{post.time}</p>
                      </div>
                    </div>
                    <span style={{
                      padding: '4px 12px', borderRadius: '100px',
                      background: 'rgba(0,255,136,0.08)',
                      border: '1px solid rgba(0,255,136,0.2)',
                      color: '#00ff88', fontSize: '11px', fontWeight: 600
                    }}>
                      {post.tag}
                    </span>
                  </div>

                  <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
                    {post.content}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button onClick={() => handleLike(post.id)} style={{
                      background: 'none', border: 'none',
                      color: '#555', fontSize: '13px',
                      cursor: 'pointer', display: 'flex',
                      alignItems: 'center', gap: '6px'
                    }}>
                      ♡ {post.likes}
                    </button>
                    <button style={{
                      background: 'none', border: 'none',
                      color: '#555', fontSize: '13px',
                      cursor: 'pointer'
                    }}>
                      💬 {post.comments}
                    </button>
                    <button style={{
                      background: 'none', border: 'none',
                      color: '#555', fontSize: '13px',
                      cursor: 'pointer', marginLeft: 'auto'
                    }}>
                      ↗ Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Trending */}
            <div style={{
              background: 'rgba(17,17,24,0.95)',
              border: '1px solid rgba(0,255,136,0.15)',
              borderRadius: '20px', padding: '24px'
            }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '20px' }}>
                🔥 TRENDING INTEL
              </h3>
              {trending.map((tag, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ color: '#00ff88', fontSize: '13px', cursor: 'pointer' }}>{tag}</span>
                  <span style={{ color: '#444', fontSize: '11px' }}>{Math.floor(Math.random() * 100) + 10} posts</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{
              background: 'rgba(17,17,24,0.95)',
              border: '1px solid rgba(0,255,136,0.15)',
              borderRadius: '20px', padding: '24px'
            }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '14px', marginBottom: '20px' }}>
                📊 Community Stats
              </h3>
              {[
                { label: 'Active Members', value: '2,847' },
                { label: 'Jobs Shared', value: '1,203' },
                { label: 'Scams Reported', value: '89' },
                { label: 'Success Stories', value: '456' },
              ].map((stat, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ color: '#666', fontSize: '13px' }}>{stat.label}</span>
                  <span style={{ color: '#00ff88', fontWeight: 700, fontSize: '14px' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community