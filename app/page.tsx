import { createClient } from '@/lib/supabase-server'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProblemStatement from '@/components/ProblemStatement'
import type { User } from '@supabase/supabase-js'

export default async function Home({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { view } = await searchParams
  const showFull = view === 'full'

  return (
    <>
      <Navbar user={user} showFull={showFull} />

      {user && !showFull ? (
        <>
          <ProblemStatement user={user} />
          <LoggedInSubmitSection />
          <FooterSection />
        </>
      ) : (
        <>
              <Hero user={user} />
          <TickerBar />
          {!user && <HowItWorksSection />}
          <BriefSection />
          <ProblemStatement user={user} />
          <CapabilitiesSection />
          <DeliverablesSection />
          <PrizesSection />
          <StatsSection />
          <TimelineSection />
          <JudgingSection />
          <QuoteBar />
          <FaqSection />
          <CtaSection user={user} />
          <FooterSection />
          <FloatingApply user={user} />
        </>
      )}
    </>
  )
}

function LoggedInSubmitSection() {
  return (
    <section id="submit-section" style={{ padding: '80px 0 120px', background: 'var(--bg)' }}>
      <div className="wrap" style={{ maxWidth: 760, textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Ready to submit?</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,3rem)', fontWeight: 300, letterSpacing: '-.025em', marginBottom: 16, lineHeight: 1.1 }}>
          Submit your <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>project.</em>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(26,17,14,.55)', lineHeight: 1.85, fontFamily: 'var(--font-body)', maxWidth: 520, margin: '0 auto 40px' }}>
          Deadline: <strong style={{ color: 'var(--fg)' }}>Saturday, May 3 · 6 PM IST.</strong> Submit your live demo, GitHub repo, 3-min video, and architecture write-up.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' as const }}>
          <a href="/submit" className="btn primary lg">
            Go to Submission Form
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, flexWrap: 'wrap' as const, marginTop: 36 }}>
          {['Live demo URL', 'GitHub repo', '3-min video', 'Architecture write-up'].map(d => (
            <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'rgba(26,17,14,.45)', fontFamily: 'var(--font-body)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13" style={{ color: 'var(--green)' }}><polyline points="20 6 9 17 4 12" /></svg>
              {d}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: 'Sign in to Register',
      desc: 'Click "Register to Build" and sign in with Google. That\'s it — you\'re registered. No forms, no emails.',
      note: 'Registration = Google sign-in',
    },
    {
      num: '02',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
      title: 'Unlock the Problem Statement',
      desc: 'Once signed in, the full problem statement unlocks right here on this page. Read it, understand the requirements, and start building.',
      note: 'Hidden until you sign in',
    },
    {
      num: '03',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
        </svg>
      ),
      title: 'Build & Submit Before May 3',
      desc: 'You have 48 hours from kick-off (May 1, 6 PM IST). Submit your live demo URL, GitHub repo, demo video, and a short write-up before the deadline.',
      note: 'Deadline: Sat May 3 · 6 PM IST',
    },
  ]

  return (
    <section className="hiw-section" id="how-it-works">
      <div className="wrap">
        <div className="eyebrow rv fade d1">How it works</div>
        <h2 className="rv up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,3rem)', fontWeight: 300, letterSpacing: '-.025em', maxWidth: 560, marginBottom: 14, lineHeight: 1.1 }}>
          Three steps to <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>compete.</em>
        </h2>
        <p className="rv up d3" style={{ fontSize: 14, color: 'rgba(26,17,14,.55)', lineHeight: 1.9, maxWidth: 480, fontFamily: 'var(--font-body)', marginBottom: 52 }}>
          No email chains, no Discord invites. Sign in → read the problem → build and submit.
        </p>
        <div className="hiw-grid">
          {steps.map((step, i) => (
            <div key={step.num} className={`hiw-card rv up d${i + 1}`}>
              <div className="hiw-num">{step.num}</div>
              <div className="hiw-icon">{step.icon}</div>
              <div className="hiw-title">{step.title}</div>
              <div className="hiw-desc">{step.desc}</div>
              <div className="hiw-note">{step.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TickerBar() {
  const items = [
    { icon: <path d="M8 9l3 3-3 3m5 0h3" />, text: 'WebSocket / Socket.IO' },
    { icon: <rect x="2" y="3" width="20" height="14" rx="2" />, text: 'E2B Sandboxes' },
    { icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />, text: 'Live streaming builds' },
    { icon: <path d="M12 2L2 7l10 5 10-5-10-5z" />, text: 'Natural language → app' },
    { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, text: '48-hour sprint' },
    { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, text: 'Founding role on the line' },
    { icon: <path d="M20 7L9 18l-5-5" />, text: 'Real builds, not slides' },
  ]

  const renderItems = () => items.map((item, i) => (
    <>
      <div key={`item-${i}`} className="t-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {item.icon}
        </svg>
        {item.text}
      </div>
      <span key={`sep-${i}`} className="t-sep" />
    </>
  ))

  return (
    <div className="ticker">
      <div className="ticker-track">
        {renderItems()}
        {renderItems()}
      </div>
    </div>
  )
}

function BriefSection() {
  return (
    <section className="statement" id="brief">
      <div className="stmt-wm">BUILD</div>
      <div className="wrap">
        <div className="stmt-layout">
          <div className="rv up d1">
            <div className="stmt-eyebrow">The challenge</div>
            <h2 className="stmt-headline">
              What you&apos;re<br />building this week.<br /><em>A real-time app builder.</em>
            </h2>
          </div>
          <div className="rv up d2">
            <div className="stmt-rule" />
            <p className="stmt-body">
              Architect turns prompts into full-stack apps. Extend it with <strong>real-time infrastructure</strong> — a socket-based builder that runs code on E2B sandboxes, not simulates it.
            </p>
            <p className="stmt-body" style={{ marginTop: 16 }}>
              Streams builds live: files, installs, server startup, preview iframe — the second a user hits enter.
            </p>
            <div className="stmt-lock-note rv up d3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" style={{ flexShrink: 0 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Full problem statement unlocks after sign-in — scroll down to register.
            </div>
          </div>
        </div>
        <div className="stmt-strip">
          <div className="ssc rv up d1">
            <div className="ssc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ssc-title">Socket-Based</div>
            <div className="ssc-desc">Bi-directional WebSocket communication. No polling, no refresh — live output as it happens.</div>
          </div>
          <div className="ssc rv up d2">
            <div className="ssc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <div className="ssc-title">E2B Execution</div>
            <div className="ssc-desc">Every session spins up an isolated E2B sandbox. Real code, real environments.</div>
          </div>
          <div className="ssc rv up d3">
            <div className="ssc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ssc-title">Prompt to App</div>
            <div className="ssc-desc">Plain-text in, streaming build out. Files, installs, server startup, live preview.</div>
          </div>
          <div className="ssc rv up d4">
            <div className="ssc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
              </svg>
            </div>
            <div className="ssc-title">Product Polish</div>
            <div className="ssc-desc">Error states, reconnection logic, session management — the full experience, not a demo.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CapabilitiesSection() {
  return (
    <section className="caps" id="capabilities">
      <div className="caps-header">
        <div className="wrap">
          <div className="eyebrow rv fade d1">The challenge, broken down</div>
          <h2 className="rv up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.2vw,3.2rem)', fontWeight: 300, letterSpacing: '-.03em', maxWidth: 620, lineHeight: 1.1, marginBottom: 14 }}>
            Four pillars of a <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>real-time app builder</em>
          </h2>
          <p className="rv up d3" style={{ fontSize: 14, color: 'rgba(26,17,14,.55)', lineHeight: 1.9, maxWidth: 500, fontFamily: 'var(--font-body)' }}>
            Your submission is judged across these four layers. Click to expand each.
          </p>
          <div className="stmt-lock-note rv fade d4" style={{ marginTop: 20 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" style={{ flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Sign in to unlock the full problem statement and detailed requirements.
          </div>
        </div>
      </div>
      <div style={{ marginTop: 48 }} id="caps-accordion">
        <CapItem
          num="01"
          title="Socket-Based Architecture"
          sub="Real-time bi-directional communication between client and server"
          detail="Users should see live output as their app is being generated — no polling, no refresh. Streaming shell output, live preview updates, and reconnection logic that survives a dropped wifi signal. Your socket event design is the most important API you'll ship this week."
          pills={['WebSocket', 'Socket.IO', 'Event-driven']}
          visTitle="Socket Layer · Live"
          visRows={[
            { color: 'var(--rose)', name: 'Event throughput', width: 95, score: '95%', scoreColor: 'var(--rose)' },
            { color: 'var(--green)', name: 'Reconnection', width: 88, score: '88%', scoreColor: 'hsl(140,50%,35%)' },
            { color: 'var(--amber-ac)', name: 'Latency (p95)', width: 100, score: '42ms', scoreColor: 'hsl(42,55%,40%)' },
          ]}
          defaultOpen
        />
        <CapItem
          num="02"
          title="E2B Sandbox Execution"
          sub="Isolated sandboxes spawned, managed, and streamed per session"
          detail="Every user session spins up an isolated E2B sandbox. The builder should spawn, manage, and stream output from E2B instances in real time — running generated code in a real environment, not simulated. Sandbox lifecycle (spin-up, warm pool, timeout, teardown) matters."
          pills={['E2B SDK', 'Process streaming', 'Lifecycle mgmt']}
          visTitle="Sandbox Pool"
          visRows={[
            { color: 'var(--rose)', name: 'Spin-up time', width: 82, score: '1.8s', scoreColor: 'var(--rose)' },
            { color: 'var(--amber-ac)', name: 'Concurrent builds', width: 91, score: '12', scoreColor: 'hsl(42,55%,40%)' },
            { color: 'var(--green)', name: 'Preview stream', width: 100, score: 'OK', scoreColor: 'hsl(140,50%,35%)' },
          ]}
        />
        <CapItem
          num="03"
          title="Natural Language → App"
          sub="Plain-text prompt in; streaming live build and preview out"
          detail="The interface accepts a plain-text prompt and streams the build process back to the user in real time — file creation, installs, server startup, and a live preview iframe. The UX should feel instant and magical. Use any LLM you like; we don't care if it's Claude, GPT-4o, or local."
          pills={['LLM-agnostic', 'Streaming tokens', 'Live iframe preview']}
          visTitle="Build Pipeline"
          visRows={[
            { color: 'var(--green)', name: 'Prompt → plan', width: 78, score: '78%', scoreColor: 'hsl(140,50%,35%)' },
            { color: 'var(--rose)', name: 'File streaming', width: 93, score: '93%', scoreColor: 'var(--rose)' },
            { color: 'var(--amber-ac)', name: 'Preview latency', width: 86, score: '1.2s', scoreColor: 'hsl(42,55%,40%)' },
          ]}
        />
        <CapItem
          num="04"
          title="Production-Quality UX"
          sub="Error states, reconnection, session management — the full experience"
          detail="This is a product challenge, not just an engineering one. Your submission is judged on the completeness of the experience — error states, reconnection logic, session persistence, empty states, and the intuitiveness of the interface. Would a non-technical user be delighted or confused?"
          pills={['Error states', 'Reconnection', 'Polish']}
          visTitle="UX Coverage"
          visRows={[
            { color: 'var(--rose)', name: 'Error handling', width: 94, score: '94%', scoreColor: 'var(--rose)' },
            { color: 'var(--green)', name: 'Reconnect flow', width: 87, score: '87%', scoreColor: 'hsl(140,50%,35%)' },
            { color: 'var(--amber-ac)', name: 'First-run polish', width: 72, score: '72%', scoreColor: 'hsl(42,55%,40%)' },
          ]}
        />
      </div>
    </section>
  )
}

type VisRow = { color: string; name: string; width: number; score: string; scoreColor: string }

function CapItem({
  num, title, sub, detail, pills, visTitle, visRows, defaultOpen
}: {
  num: string
  title: string
  sub: string
  detail: string
  pills: string[]
  visTitle: string
  visRows: VisRow[]
  defaultOpen?: boolean
}) {
  return (
    <div className={`cap-item rv fade${defaultOpen ? ' open' : ''}`} data-cap>
      <button className="cap-trigger" data-cap-trigger>
        <div className="cap-num">{num}</div>
        <div className="cap-trigger-text">
          <div className="cap-title">{title}</div>
          <div className="cap-sub">{sub}</div>
        </div>
        <div className="cap-toggle">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>
      <div className="cap-panel">
        <div className="cap-panel-inner">
          <div>
            <p className="cap-detail">{detail}</p>
            <div className="cap-pills">
              {pills.map((p) => <span key={p} className="cap-pill">{p}</span>)}
            </div>
          </div>
          <div className="cap-visual">
            <div className="cap-vis-head">
              <div className="cvh-dot" style={{ background: '#ef4444' }} />
              <div className="cvh-dot" style={{ background: '#f59e0b' }} />
              <div className="cvh-dot" style={{ background: '#22c55e' }} />
              <span className="cvh-title">{visTitle}</span>
            </div>
            <div className="cap-vis-body">
              {visRows.map((row) => (
                <div key={row.name} className="av-row">
                  <div className="av-dot" style={{ background: row.color }} />
                  <span className="av-name">{row.name}</span>
                  <div className="av-bar">
                    <div className="av-fill" style={{ width: `${row.width}%`, background: row.color }} />
                  </div>
                  <span className="av-score" style={{ color: row.scoreColor }}>{row.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DeliverablesSection() {
  const items = [
    { title: 'Live Deployed Demo', desc: 'A public URL where a judge can prompt your builder and see a real E2B app stream live.' },
    { title: 'Public GitHub Repo', desc: 'Source with a clear README. MIT or Apache 2.0 license.' },
    { title: '3-Minute Demo Video', desc: 'Loom or YouTube. Prompt to running preview. No slides.' },
    { title: 'Architecture Write-up', desc: 'One page on your socket protocol, sandbox lifecycle, and hardest tradeoff.' },
  ]
  return (
    <section className="deliv" id="deliverables">
      <div className="deliv-bg">SHIP</div>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="eyebrow rv fade d1">Deliverables</div>
        <h2 className="rv up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,3rem)', fontWeight: 300, letterSpacing: '-.025em', maxWidth: 540, marginBottom: 14, lineHeight: 1.1 }}>
          Four things to ship by <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Sat, May 3</em>
        </h2>
        <p className="rv up d3" style={{ fontSize: 14, color: 'rgba(26,17,14,.58)', lineHeight: 1.9, maxWidth: 540, fontFamily: 'var(--font-body)' }}>
          Incomplete submissions won&apos;t be reviewed.
        </p>
        <div className="deliv-grid">
          {items.map((item, i) => (
            <div key={item.title} className={`dc rv up d${i + 1}`}>
              <div className="dc-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <div className="dc-title">{item.title}</div>
                <div className="dc-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PrizesSection() {
  return (
    <section className="prizes" id="prizes">
      <div className="prizes-bg">WIN</div>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="eyebrow rv fade d1">Prizes</div>
        <h2 className="rv up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,3rem)', fontWeight: 300, letterSpacing: '-.025em', maxWidth: 520, marginBottom: 14, lineHeight: 1.1 }}>
          Win cash. <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Build your career.</em>
        </h2>
        <p className="rv up d3" style={{ fontSize: 14, color: 'rgba(26,17,14,.58)', lineHeight: 1.9, maxWidth: 520, fontFamily: 'var(--font-body)' }}>
          Top three win cash. The winner gets a fast-tracked interview for Founding Product Engineer.
        </p>
        <div className="prize-grid">
          <div className="pc rv up d1">
            <div className="pc-rank">2nd Place</div>
            <div className="pc-medal">🥈</div>
            <div className="pc-amount"><span className="pc-currency">₹</span>15,000</div>
            <div className="pc-label">Cash prize</div>
            <div className="pc-perks">
              {['Cash within 7 days', 'Fast-tracked Product Engineer interview', 'Lyzr swag kit'].map(p => (
                <div key={p} className="perk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div className="pc featured rv up d2">
            <div className="pc-rank">🏆 Grand Prize</div>
            <div className="pc-medal">🥇</div>
            <div className="pc-amount"><span className="pc-currency">₹</span>30,000</div>
            <div className="pc-label">+ Founding Role interview</div>
            <div className="pc-perks">
              {['Cash within 7 days', 'Fast-tracked Product Engineer interview'].map(p => (
                <div key={p} className="perk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div className="pc rv up d3">
            <div className="pc-rank">3rd Place</div>
            <div className="pc-medal">🥉</div>
            <div className="pc-amount"><span className="pc-currency">₹</span>5,000</div>
            <div className="pc-label">Cash prize</div>
            <div className="pc-perks">
              {['Cash within 7 days', 'Fast-tracked Product Engineer interview', 'Lyzr swag kit'].map(p => (
                <div key={p} className="perk">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grand-banner rv fade d4">
          <div>
            <div className="gb-title">The real prize: join the Architect team</div>
            <div className="gb-sub">Winner gets a fast-tracked interview for Founding Product Engineer — a seat where the product is being defined.</div>
          </div>
          <div className="gb-badge">
            <span className="gb-badge-lbl">Role</span>
            <div className="gb-badge-val">Founding<br />Product Eng.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="stats">
      <div className="stats-row">
        <div className="s-cell">
          <div className="s-num">48<sup>h</sup></div>
          <div className="s-lbl">Sprint window — May 1 (6 PM) to May 3 (6 PM).</div>
        </div>
        <div className="s-cell">
          <div className="s-num">₹50<sup>K</sup></div>
          <div className="s-lbl">Cash prize pool, paid within 7 days.</div>
        </div>
        <div className="s-cell">
          <div className="s-num">1<sup>role</sup></div>
          <div className="s-lbl">Founding Product Engineer — the real prize.</div>
        </div>
        <div className="s-cell">
          <div className="s-num">India<sup>·</sup></div>
          <div className="s-lbl">Open to solo builders in India.</div>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const events = [
    { date: 'Apr 28 – May 1', event: 'Registration Window', desc: 'Applications open. Register to receive the full brief and problem statement before kick-off.', active: true },
    { date: 'Thu · May 1 · 6 PM', event: 'Kick-off & Clock Starts', desc: 'The 48-hour clock begins. Build your best socket-based app on E2B — no hand-holding, just you and the problem.' },
    { date: 'Fri · May 2 · 6 PM', event: 'Halfway Mark', desc: 'You\'re 24 hours in. Keep building — the clock is ticking.' },
    { date: 'Sat · May 3 · 6 PM', event: 'Submissions Close', desc: 'Hard deadline. Submit your live URL, GitHub repo, demo video, and architecture write-up via the portal.' },
    { date: 'Sun · May 4', event: 'Winners Announced', desc: 'Results posted publicly on Twitter. Prize transfers initiated. Finalist interviews scheduled within 48 hours.' },
  ]
  return (
    <section className="timeline-sec" id="timeline">
      <div className="wrap">
        <div className="eyebrow rv fade d1">Timeline</div>
        <h2 className="rv up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,3rem)', fontWeight: 300, letterSpacing: '-.025em', maxWidth: 540, marginBottom: 14, lineHeight: 1.1 }}>
          48 hours. <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>All times IST.</em>
        </h2>
        <p className="rv up d3" style={{ fontSize: 14, color: 'rgba(26,17,14,.58)', lineHeight: 1.9, maxWidth: 520, fontFamily: 'var(--font-body)' }}>
          Tight sprint. Register, build, and submit — we&apos;ll review your submission at the end.
        </p>
        <div className="timeline rv fade d4">
          {events.map((e) => (
            <div key={e.event} className={`tl-item${e.active ? ' active' : ''}`}>
              <div className="tl-date">{e.date}</div>
              <div>
                <div className="tl-event">{e.event}</div>
                <div className="tl-desc">{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function JudgingSection() {
  const criteria = [
    { num: '01', name: 'Real-Time Functionality', weight: '35% of score', desc: 'Does the WebSocket layer actually work? Are socket events well-structured, latency low, and reconnections handled gracefully? We stress-test it.' },
    { num: '02', name: 'E2B Integration Depth', weight: '25% of score', desc: 'Are sandboxes properly spawned and managed? Does the live preview stream real output from E2B? Is the sandbox lifecycle clean?' },
    { num: '03', name: 'Product UX & Polish', weight: '25% of score', desc: 'Would a non-technical user be delighted or confused? We value clean interfaces, good error states, and a coherent experience end-to-end.' },
    { num: '04', name: 'Code Quality', weight: '15% of score', desc: 'Well-structured, readable, and extensible code. Maintainability matters — this is a product engineering role, not a hackathon trophy.' },
  ]
  return (
    <section className="judging" id="judging">
      <div className="wrap">
        <div className="eyebrow rv fade d1">Judging</div>
        <h2 className="rv up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,3rem)', fontWeight: 300, letterSpacing: '-.025em', maxWidth: 540, marginBottom: 14, lineHeight: 1.1 }}>
          How we <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>evaluate.</em>
        </h2>
        <p className="rv up d3" style={{ fontSize: 14, color: 'rgba(26,17,14,.58)', lineHeight: 1.9, maxWidth: 540, fontFamily: 'var(--font-body)' }}>
          Reviewed by the Architect product and engineering team. We care about working software, not slides. If it doesn&apos;t run, it doesn&apos;t place.
        </p>
        <div className="jud-grid">
          {criteria.map((c, i) => (
            <div key={c.num} className={`jc rv up d${i + 1}`}>
              <div className="jc-num">{c.num}</div>
              <div>
                <div className="jc-name">{c.name}</div>
                <span className="jc-weight">{c.weight}</span>
                <div className="jc-desc">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteBar() {
  return (
    <section className="quote-bar">
      <div className="qb-glow" />
      <div className="qb-inner">
        <div className="qb-mark rv fade d1">&ldquo;</div>
        <p className="qb-text rv up d2">We&apos;re not looking for perfect. We&apos;re looking for someone who ships a coherent product in 48 hours — and makes us want to work with them on Monday.</p>
        <div className="qb-attr rv up d3">— <strong>Siva Surendira</strong>, Co-founder, Lyzr AI</div>
      </div>
    </section>
  )
}

function FaqSection() {
  const faqs = [
    { q: 'Can I participate as a team?', a: 'No. This is a solo hackathon — since the prize is a single role, we want to evaluate individual builders. One person, one submission.' },
    { q: 'Do I need to use a specific LLM or framework?', a: 'No. Use whatever stack makes you fastest. Only two things are mandatory: real WebSocket-based communication, and E2B as the execution substrate.' },
    { q: 'Do I need to bring my own E2B account?', a: 'Yes. E2B offers a generous free tier that\'s more than enough for 48 hours. Sign up at e2b.dev and use your own API key.' },
    { q: 'Who can participate?', a: 'This hackathon is open to solo builders based in India only. Teams are not allowed.' },
    { q: 'Is the code I submit open-source?', a: 'You keep full ownership. Submissions must be in a public repo under MIT/Apache 2.0 so judging is transparent.' },
    { q: "What if I don't win but the team likes my build?", a: 'Strong non-winning submissions often lead to other conversations — contract work or adjacent roles at Lyzr.' },
  ]
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="eyebrow rv fade d1">Frequently Asked Questions</div>
        <h2 className="rv up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3vw,2.8rem)', fontWeight: 300, letterSpacing: '-.025em', maxWidth: 540, lineHeight: 1.1 }}>
          Questions, <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>answered.</em>
        </h2>
        <div className="faq-list rv up d3">
          {faqs.map((faq) => (
            <div key={faq.q} className="faq-row" data-faq>
              <button className="faq-q" data-faq-trigger>
                <span className="faq-q-text">{faq.q}</span>
                <div className="faq-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </button>
              <div className="faq-ans">
                <div className="faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection({ user }: { user: User | null }) {
  return (
    <section className="cta" id="register">
      <div className="cta-glow" />
      <div className="cta-rings">
        <div className="cta-ring" style={{ width: 500, height: 500 }} />
        <div className="cta-ring" style={{ width: 800, height: 800 }} />
        <div className="cta-ring" style={{ width: 1100, height: 1100 }} />
      </div>
      <div className="cta-in">
        <div className="cta-pill rv fade d1"><span className="cta-dot" />Applications Open · Kick-off Thu May 1</div>
        <h2 className="cta-h rv up d2">{user ? <>Ready to <em>submit?</em></> : <>Sign in to <em>register.</em></>}</h2>
        <p className="cta-sub rv up d3">
          {user
            ? 'You\'re registered. Submit your live demo, GitHub repo, video, and write-up before Sat May 3, 6 PM IST.'
            : 'Sign in with Google to register — it takes 10 seconds. The problem statement unlocks immediately after.'}
        </p>
        <div className="cta-btns rv up d4">
          {user ? (
            <a href="/submit" className="btn primary lg">
              Submit Your Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          ) : (
            <button className="btn primary lg" id="cta-login-btn">
              Register with Google
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          )}
          <a href="#problem" className="btn ghost lg">{user ? 'View Problem Statement' : 'Preview Problem Statement'}</a>
        </div>
        <div className="cta-perks rv fade d5">
          {(user
            ? ['Submission deadline: Sat May 3 · 6 PM IST', 'All 4 deliverables required', 'Results announced Sun May 4']
            : ['Sign in = registration, no forms needed', 'Problem statement unlocks on login', 'Solo builders in India only']
          ).map(p => (
            <div key={p} className="cta-perk">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              {p}
            </div>
          ))}
        </div>
        <p className="cta-note rv fade d5">Questions? Email <a href="mailto:suyash@lyzr.ai">suyash@lyzr.ai</a></p>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="footer">
      <div className="f-in">
        <div className="f-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://asset.lyzr.app/7f7jVuwo" className="f-logo" alt="Lyzr" />
          <span className="f-sep">·</span>
          <span className="f-prod">Architect Hackathon</span>
        </div>
        <div className="f-links">
          <a href="https://architect.new" target="_blank" rel="noopener noreferrer">architect.new</a>
          <a href="https://lyzr.ai" target="_blank" rel="noopener noreferrer">lyzr.ai</a>
          <a href="mailto:suyash@lyzr.ai">Contact</a>
        </div>
        <div className="f-copy">© 2026 Lyzr AI. All rights reserved.</div>
      </div>
    </footer>
  )
}

function FloatingApply({ user }: { user: User | null }) {
  return (
    <div id="floating-apply-wrapper">
      {user ? (
        <a href="/submit" className="floating-apply" id="floatingApply">
          Submit Project
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      ) : (
        <button className="floating-apply" id="floatingApply" style={{ cursor: 'pointer' }}>
          Apply Now
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      )}
    </div>
  )
}
