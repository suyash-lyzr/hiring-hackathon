'use client'

import { useEffect, useRef } from 'react'
import type { User } from '@supabase/supabase-js'
import AuthButton from './AuthButton'

interface HeroProps {
  user: User | null
}

const terminalLines = [
  { delay: 400, type: 'prompt', text: 'architect', cmd: 'build me a live chat app with rooms' },
  { delay: 1100, type: 'out', text: '⚡ spinning up E2B sandbox...' },
  { delay: 800, type: 'ok', text: '✓ sandbox ready · ws://e2b-7a2f.io connected' },
  { delay: 700, type: 'out', text: '📡 socket.io — streaming build' },
  { delay: 500, type: 'dim', text: '  creating server.js' },
  { delay: 300, type: 'dim', text: '  creating client/App.tsx' },
  { delay: 300, type: 'dim', text: '  installing socket.io express react' },
  { delay: 900, type: 'warn', text: '  ⧖ npm install (12s)' },
  { delay: 1200, type: 'ok', text: '✓ 214 packages installed' },
  { delay: 400, type: 'out', text: '▶ starting dev server on :3000' },
  { delay: 700, type: 'highlight', text: '● LIVE — preview ready at sandbox.e2b.dev' },
  { delay: 500, type: 'dim', text: '' },
  { delay: 0, type: 'cursor' },
]

export default function Hero({ user }: HeroProps) {
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const term = termRef.current
    if (!term) return

    let idx = 0
    let timeouts: ReturnType<typeof setTimeout>[] = []
    let stopped = false

    function renderLine(line: typeof terminalLines[0]) {
      if (!term || stopped) return
      const el = document.createElement('span')
      el.className = 'terminal-line'
      if (line.type === 'prompt') {
        el.innerHTML = `<span class="prompt">❯</span><span class="dim">${line.text}</span> <span class="cmd">${line.cmd}</span>`
      } else if (line.type === 'cursor') {
        el.innerHTML = `<span class="prompt">❯</span><span class="cursor"></span>`
      } else {
        el.innerHTML = `<span class="${line.type}">${line.text}</span>`
      }
      term.appendChild(el)
    }

    function runTerminal() {
      if (stopped) return
      if (idx >= terminalLines.length) {
        const t = setTimeout(() => {
          if (term && !stopped) { term.innerHTML = ''; idx = 0; runTerminal() }
        }, 4000)
        timeouts.push(t)
        return
      }
      const line = terminalLines[idx++]
      const t = setTimeout(() => {
        renderLine(line)
        runTerminal()
      }, line.delay)
      timeouts.push(t)
    }

    const startT = setTimeout(runTerminal, 600)
    timeouts.push(startT)

    return () => {
      stopped = true
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return (
    <section className="hero" id="top">
      <div className="h-orb a" />
      <div className="h-orb b" id="orb-b" />
      <div className="h-orb c" />
      <div className="h-noise" />
      <div className="h-ghost">Architect</div>

      <div className="h-inner">
        {/* LEFT */}
        <div className="h-left">
          <div className="h-eyebrow-row">
            <div className="h-eyebrow-dot" />
            <span className="h-eyebrow-text">Lyzr Hackathon</span>
            <span className="h-eyebrow-sep" />
            <span className="h-eyebrow-tag">48 hrs · May 1 – 3</span>
          </div>
          <h1 className="h-h1">
            Hunt for India&apos;s<br />most <em>cracked</em><br />engineers.
          </h1>
          <p className="h-sub">
            <strong>48 hours.</strong> <strong>₹50,000 in cash.</strong> A <strong>Founding Product Engineer</strong> seat at Lyzr Architect. Build the best real-time, socket-based app builder on E2B — and take the role.
          </p>
          <div className="h-btns">
            <AuthButton user={user} variant="hero" />
          </div>
          {!user && (
            <p className="h-auth-note">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" style={{ flexShrink: 0 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Sign in with Google to register — problem statement is hidden until you log in
            </p>
          )}
          <div className="h-metrics">
            <div className="h-metric">
              <span className="h-metric-val">₹50K</span>
              <span className="h-metric-lbl">Prize pool</span>
            </div>
            <div className="h-metric">
              <span className="h-metric-val">1</span>
              <span className="h-metric-lbl">Role offered</span>
            </div>
            <div className="h-metric">
              <span className="h-metric-val">48<sup>h</sup></span>
              <span className="h-metric-lbl">Sprint</span>
            </div>
            <div className="h-metric">
              <span className="h-metric-val">Solo</span>
              <span className="h-metric-lbl">Only</span>
            </div>
          </div>
        </div>

        {/* RIGHT — terminal stage */}
        <div className="h-right">
          <div className="h-stage">
            <div className="h-stage-glow" />
            <div className="terminal">
              <div className="terminal-header">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
                <span className="terminal-title">architect.socket — live</span>
              </div>
              <div className="terminal-body" ref={termRef} />
              <div className="h-sweep" />
            </div>
            <div className="h-fc fc1">
              <div className="fc-lbl">Sandbox uptime</div>
              <div className="fc-big"><span className="g">↑</span> 99.8%</div>
              <div className="fc-small">E2B · streaming</div>
            </div>
            <div className="h-fc fc2">
              <div className="fc-live">
                <div className="fc-live-dot" />
                Applications Open
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-scroll">
        <svg className="h-scroll-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
