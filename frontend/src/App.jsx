import ChatBot from './components/ChatBot'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import JobSearch from './pages/JobSearch'
import Internships from './pages/Internships'
import ThreatScanner from './pages/ThreatScanner'
import ResumeBuilder from './pages/ResumeBuilder'
import Community from './pages/Community'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <ChatBot />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/threat-scanner" element={<ThreatScanner />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/community" element={<Community />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App