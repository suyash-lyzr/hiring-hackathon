'use client'

import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { User } from '@supabase/supabase-js'

interface AuthButtonProps {
  user: User | null
  variant?: 'nav' | 'hero' | 'cta'
}

export default function AuthButton({ user, variant = 'nav' }: AuthButtonProps) {
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/auth/callback' },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (user) {
    const avatarUrl = user.user_metadata?.avatar_url
    const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User'
    const email = user.email || ''

    if (variant === 'nav') {
      return (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="/submit" className="btn primary" style={{ padding: '9px 22px', fontSize: 12 }}>
            Submit
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Profile dropdown */}
          <div ref={dropRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setOpen(o => !o)}
              className="nav-profile-btn"
              aria-label="Profile menu"
            >
              {avatarUrl
                ? <img src={avatarUrl} alt={name} className="nav-avatar" />
                : <div className="nav-avatar-fallback">{name[0].toUpperCase()}</div>
              }
              <span className="nav-user-name" style={{ color: 'inherit' }}>{name.split(' ')[0]}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="10" height="10" style={{ opacity: 0.5, transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {open && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-user">
                  <div className="nav-dropdown-name">{name}</div>
                  <div className="nav-dropdown-email">{email}</div>
                </div>
                <div className="nav-dropdown-divider" />
                <button className="nav-dropdown-item" onClick={handleLogout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <a href="/submit" className={`btn primary${variant === 'hero' ? ' lg' : ''}`}>
        Submit Your Project
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    )
  }

  if (variant === 'nav') {
    return (
      <button onClick={handleLogin} className="btn primary" style={{ padding: '9px 22px', fontSize: 12 }}>
        Apply Now
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    )
  }

  return (
    <button onClick={handleLogin} className={`btn primary${variant === 'hero' ? ' lg' : ''}`}>
      {variant === 'hero' ? 'Register to Build' : 'Start Registration'}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  )
}
