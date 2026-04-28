'use client'

import type { User } from '@supabase/supabase-js'
import AuthButton from './AuthButton'

interface ProblemStatementProps {
  user: User | null
}

export default function ProblemStatement({ user }: ProblemStatementProps) {
  return (
    <section className="prob-section" id="problem">
      <div className="wrap">
        <div className="eyebrow rv fade d1" style={{ marginBottom: 32 }}>Problem Statement</div>
        <h2 className="rv up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,3rem)', fontWeight: 300, letterSpacing: '-.025em', maxWidth: 600, marginBottom: 40, lineHeight: 1.1 }}>
          What you&apos;re actually <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>building.</em>
        </h2>

        {user ? (
          <div className="prob-unlocked rv up d3">
            <div className="prob-unlocked-card">
              <div className="prob-unlocked-eyebrow">
                <div className="prob-unlocked-dot" />
                <span className="prob-unlocked-label">Full Problem Statement — Unlocked</span>
              </div>

              {/* Title block */}
              <div className="ps-title-block">
                <div className="ps-main-title">Socket-based Web App Builder</div>
                <div className="ps-tagline">(Think Bolt.new / Lovable, but with real-time streaming via WebSockets + E2B sandboxes.)</div>
              </div>

              <div className="ps-divider" />

              {/* Problem Statement */}
              <div className="ps-section">
                <div className="ps-section-heading">
                  <span className="ps-section-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </span>
                  <span className="ps-section-title">Problem Statement</span>
                </div>
                <p className="ps-body">
                  Design and build a <strong>real-time web app builder</strong> that accepts a plain-text prompt from a user and streams the entire build process live — from file creation and dependency installs to server startup and a running preview — entirely over a persistent WebSocket connection.
                </p>
                <p className="ps-body">
                  Every build must execute inside an isolated <strong>E2B sandbox</strong>. No simulation, no mocking. Real code, real npm installs, real running servers. The user should see output the <em>instant</em> something happens — not after polling or a page refresh.
                </p>
                <p className="ps-body">
                  The closer your implementation is to a production-quality, fully functional Architect clone, the better your chances of winning — and the higher your likelihood of walking away with the Founding Product Engineer role.
                </p>
              </div>

              <div className="ps-divider" />

              {/* Core Directions */}
              <div className="ps-section">
                <div className="ps-section-heading">
                  <span className="ps-section-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M2 12h2M20 12h2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41"/></svg>
                  </span>
                  <span className="ps-section-title">Core Directions</span>
                </div>
                <ul className="ps-bullets">
                  <li>Build a <strong>WebSocket-based architecture</strong> (Socket.IO or native WS) — no long-polling or HTTP streaming substitutes.</li>
                  <li>Spin up an <strong>isolated E2B sandbox per session</strong>; stream its stdout/stderr output directly to the client in real time.</li>
                  <li>Show the full build pipeline visibly to the user: <strong>prompt → LLM plan → file creation → npm install → server start → live preview iframe</strong>.</li>
                  <li>The live preview iframe must load the <strong>actual running app</strong> served from inside the E2B sandbox.</li>
                  <li>Handle <strong>error states gracefully</strong> — sandbox timeouts, build failures, disconnects, and reconnections.</li>
                  <li>Use <strong>any LLM</strong> you like (Claude, GPT-4o, Gemini, local). We only mandate WebSockets + E2B.</li>
                  <li>Deploy to a <strong>public URL</strong> a judge can visit, prompt, and watch build live.</li>
                </ul>
              </div>

              <div className="ps-divider" />

              {/* Evaluation Criteria */}
              <div className="ps-section">
                <div className="ps-section-heading">
                  <span className="ps-section-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>
                  </span>
                  <span className="ps-section-title">Evaluation Criteria</span>
                </div>
                <div className="ps-table-wrap">
                  <table className="ps-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Real-Time Functionality</td>
                        <td>Does the WebSocket layer work? Are socket events well-structured, latency low, and reconnections handled?</td>
                        <td className="ps-weight">35%</td>
                      </tr>
                      <tr>
                        <td>E2B Integration Depth</td>
                        <td>Are sandboxes properly spawned and managed? Does the live preview stream real output from E2B?</td>
                        <td className="ps-weight">25%</td>
                      </tr>
                      <tr>
                        <td>Product UX & Polish</td>
                        <td>Would a non-technical user be delighted? Clean interface, good error states, coherent experience end-to-end.</td>
                        <td className="ps-weight">25%</td>
                      </tr>
                      <tr>
                        <td>Code Quality</td>
                        <td>Well-structured, readable, and extensible code. This is a product engineering role — maintainability matters.</td>
                        <td className="ps-weight">15%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(42,28,24,.08)', display: 'flex', gap: 12, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                <a href="/submit" className="btn primary">
                  Submit Your Project
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <span style={{ fontSize: 12, color: 'rgba(26,17,14,.4)', fontFamily: 'var(--font-body)' }}>
                  Deadline: Sat May 3, 6 PM IST
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="prob-locked rv up d3">
            <div className="prob-locked-bg">
              <div className="prob-locked-bg-text">BUILD</div>
            </div>
            <div className="prob-locked-inner">
              <div className="prob-locked-left">
                <div className="prob-locked-eyebrow">
                  <div className="prob-locked-eyebrow-dot" />
                  <span className="prob-locked-eyebrow-text">Registration required</span>
                </div>
                <h3 className="prob-locked-title">
                  Sign in to unlock<br />the <em>problem statement.</em>
                </h3>
                <p className="prob-locked-desc">
                  The full brief is only visible to registered participants. Sign in with Google — that&apos;s your registration. Takes 10 seconds.
                </p>
                <div className="prob-locked-perks">
                  {[
                    'Full problem statement unlocks instantly',
                    'Submit your project from this page',
                    'Solo builders in India only',
                  ].map(p => (
                    <div key={p} className="prob-locked-perk">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      {p}
                    </div>
                  ))}
                </div>
                <AuthButton user={null} variant="hero" />
                <p className="prob-lock-note">Free to participate · No credit card needed</p>
              </div>
              <div className="prob-locked-right">
                <div className="prob-locked-preview-wrap">
                  <p className="prob-locked-preview">
                    Build a real-time, socket-based web app builder powered by E2B. Your app must accept a plain-text prompt and — entirely over a persistent WebSocket — stream the entire build process back live: file creation, dependency installation, server startup, and a live preview iframe showing the running app inside an isolated E2B sandbox. Every build must run in a real environment. No simulation, no mocking. The user should see output the instant something happens.
                  </p>
                  <div className="prob-locked-preview-fade" />
                </div>
                <div className="prob-lock-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <div className="prob-lock-title">Locked until sign-in</div>
                <div className="prob-lock-sub">Sign in with Google to read the full statement and access the submission form.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
