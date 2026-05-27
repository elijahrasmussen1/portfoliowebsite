import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import menuVideo from './assets/Mainn.mp4'
import main1 from './assets/main1.mp4'
import main2 from './assets/main2.mp4'
import main3 from './assets/main3.mp4'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition, { ExitTransitionOverlay } from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import PoliciesPage from './PoliciesPage'
import './App.css'

function MenuScreen({ onNavigate }) {
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={onNavigate} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const navigate = useNavigate()
  const [exitVfx, setExitVfx] = useState(null) // src for tran1.mp4
  const [pendingNav, setPendingNav] = useState(null)

  // Preload tran1.mp4 src on mount
  const [tran1Src, setTran1Src] = useState(null)
  useEffect(() => {
    import('./assets/tran1.mp4')
      .then((mod) => setTran1Src(mod.default))
      .catch(() => {})
  }, [])

  const handleNavigate = useCallback((page) => {
    if (page === 'about' && tran1Src) {
      // Play tran1 exit VFX on main page, delay navigation until it ends
      setExitVfx(tran1Src)
      setPendingNav('/about')
    } else {
      navigate(`/${page}`)
    }
  }, [navigate, tran1Src])

  const handleExitComplete = useCallback(() => {
    setExitVfx(null)
    if (pendingNav) {
      navigate(pendingNav)
      setPendingNav(null)
    }
  }, [navigate, pendingNav])

  return (
    <>
      {/* Exit VFX overlay (tran1.mp4) plays with audio on top of main page */}
      {exitVfx && (
        <ExitTransitionOverlay videoSrc={exitVfx} onComplete={handleExitComplete} />
      )}
      <AnimatePresence mode="sync">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition><MenuScreen onNavigate={handleNavigate} /></PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition variant="about"><AboutMe /></PageTransition>
          } />
          <Route path="/resume" element={
            <PageTransition><ResumePage src={main2} /></PageTransition>
          } />
          <Route path="/socials" element={
            <PageTransition variant="socials"><Socials /></PageTransition>
          } />
          <Route path="/policies" element={
            <PageTransition variant="policies"><PoliciesPage /></PageTransition>
          } />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
