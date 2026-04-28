'use client'

import { useEffect, useRef } from 'react'
import type { User } from '@supabase/supabase-js'
import AuthButton from './AuthButton'

interface NavbarProps {
  user: User | null
  showFull?: boolean
}

export default function Navbar({ user, showFull }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const floatingRef = useRef<HTMLElement | null>(null)
  // logged-in default view (no hero) → on-light; full brief view has hero → on-hero
  const initialClass = (user && !showFull) ? 'nav on-light' : 'nav on-hero'

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const heroEl = document.querySelector('.hero') as HTMLElement | null

    // If no hero (logged-in default view), just track scroll for light/dark sections
    if (!heroEl && !showFull) {
      const updateNavNoHero = () => {
        if (!nav) return
        const el = document.elementFromPoint(window.innerWidth / 2, 80)
        const isDark = el?.closest('.stats,.quote-bar,.cta,.ticker')
        nav.className = isDark ? 'nav on-dark' : 'nav on-light'
      }
      window.addEventListener('scroll', updateNavNoHero, { passive: true })
      updateNavNoHero()
      return () => window.removeEventListener('scroll', updateNavNoHero)
    }

    function updateNav() {
      if (!nav) return
      const y = window.scrollY
      const hH = heroEl?.offsetHeight || 700
      const floating = document.getElementById('floatingApply')

      if (y < 40) {
        nav.className = 'nav on-hero'
        if (floating) floating.classList.remove('visible')
        return
      }

      if (y > hH * 0.7 && floating) floating.classList.add('visible')
      else if (floating) floating.classList.remove('visible')

      if (y < hH * 0.9) {
        nav.className = 'nav on-dark'
        return
      }

      const el = document.elementFromPoint(window.innerWidth / 2, 80)
      const isDark = el?.closest('.stats,.quote-bar,.cta,.ticker,.hero')
      nav.className = isDark ? 'nav on-dark' : 'nav on-light'
    }

    window.addEventListener('scroll', updateNav, { passive: true })
    updateNav()
    return () => window.removeEventListener('scroll', updateNav)
  }, [])

  useEffect(() => {
    // hero orb cursor follow
    const heroEl = document.querySelector('.hero') as HTMLElement | null
    if (!heroEl) return

    const handleMouseMove = (e: MouseEvent) => {
      const r = heroEl.getBoundingClientRect()
      const orbB = document.getElementById('orb-b')
      if (orbB) {
        orbB.style.transform = `translate(${(e.clientX - r.left) * 0.04}px, ${(e.clientY - r.top) * 0.04}px)`
      }
    }
    heroEl.addEventListener('mousemove', handleMouseMove)
    return () => heroEl.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Scroll reveal
    const rvObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add('on')
            rvObs.unobserve(x.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    )
    document.querySelectorAll('.rv').forEach((el) => rvObs.observe(el))
    return () => rvObs.disconnect()
  }, [])

  useEffect(() => {
    // Capabilities accordion
    function handleCapClick(e: Event) {
      const trigger = (e.target as Element).closest('[data-cap-trigger]')
      if (!trigger) return
      const item = trigger.closest('[data-cap]') as HTMLElement | null
      if (!item) return
      const wasOpen = item.classList.contains('open')
      document.querySelectorAll('[data-cap].open').forEach((i) => i.classList.remove('open'))
      if (!wasOpen) item.classList.add('open')
    }
    document.addEventListener('click', handleCapClick)
    return () => document.removeEventListener('click', handleCapClick)
  }, [])

  useEffect(() => {
    // FAQ accordion
    function handleFaqClick(e: Event) {
      const trigger = (e.target as Element).closest('[data-faq-trigger]')
      if (!trigger) return
      const row = trigger.closest('[data-faq]') as HTMLElement | null
      if (!row) return
      const wasOpen = row.classList.contains('open')
      document.querySelectorAll('[data-faq].open').forEach((r) => r.classList.remove('open'))
      if (!wasOpen) row.classList.add('open')
    }
    document.addEventListener('click', handleFaqClick)
    return () => document.removeEventListener('click', handleFaqClick)
  }, [])

  useEffect(() => {
    // CTA login button (for non-logged-in users)
    const ctaBtn = document.getElementById('cta-login-btn')
    if (!ctaBtn) return
    const handleCtaLogin = () => {
      import('@/lib/supabase-client').then(({ createClient }) => {
        const supabase = createClient()
        supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: window.location.origin + '/auth/callback' },
        })
      })
    }
    ctaBtn.addEventListener('click', handleCtaLogin)
    return () => ctaBtn.removeEventListener('click', handleCtaLogin)
  }, [])

  useEffect(() => {
    // Floating apply button for non-logged-in
    const floatingBtn = document.getElementById('floatingApply')
    if (!floatingBtn || floatingBtn.tagName === 'A') return
    const handleFloatingLogin = () => {
      import('@/lib/supabase-client').then(({ createClient }) => {
        const supabase = createClient()
        supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: window.location.origin + '/auth/callback' },
        })
      })
    }
    floatingBtn.addEventListener('click', handleFloatingLogin)
    return () => floatingBtn.removeEventListener('click', handleFloatingLogin)
  }, [])

  return (
    <nav className={initialClass} id="nav" ref={navRef}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://asset.lyzr.app/IBiyLyfR" className="nav-lb nav-lb-light" alt="Lyzr" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://asset.lyzr.app/gQMxw189" className="nav-lb nav-lb-dark" alt="Lyzr" />
          <span className="nav-brand">lyzr</span>
          <span className="nav-vr" />
          <span className="nav-product">Architect Hackathon</span>
          <span className="nav-live" />
        </a>
        {user ? (
          <nav className="nav-links">
            {showFull ? (
              <>
                <a href="/" className="nav-back-pill">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Problem Statement
                </a>
                <a href="#brief">Brief</a>
                <a href="#prizes">Prizes</a>
                <a href="#timeline">Timeline</a>
              </>
            ) : (
              <>
                <a href="#problem">Problem Statement</a>
                <a href="#submit-section">How to Submit</a>
                <a href="/?view=full">View Full Brief</a>
              </>
            )}
          </nav>
        ) : (
          <nav className="nav-links">
            <a href="#brief">Brief</a>
            <a href="#capabilities">Challenge</a>
            <a href="#deliverables">Deliverables</a>
            <a href="#prizes">Prizes</a>
            <a href="#timeline">Timeline</a>
            <a href="#faq">FAQ</a>
          </nav>
        )}
        <AuthButton user={user} variant="nav" />
      </div>
    </nav>
  )
}
