'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { User } from '@supabase/supabase-js'

interface Props { user: User }

const LANGS = ['JavaScript / TypeScript', 'Python', 'Rust', 'Go', 'C++', 'C', 'Java', 'Ruby', 'Other']
const SKILLS = ['Frontend Development', 'Backend Development', 'DevOps / SRE', 'AI / ML', 'Data Analytics', 'Blockchain', 'Computer Vision', 'Full-stack', 'Other']

export default function SubmitPageClient({ user }: Props) {
  const supabase = createClient()
  const prefillName = user.user_metadata?.full_name || user.user_metadata?.name || ''
  const prefillEmail = user.email || ''

  const [form, setForm] = useState({
    name: prefillName,
    email: prefillEmail,
    phone: '',
    github_profile_url: '',
    linkedin_url: '',
    years_of_experience: '',
    interesting_problem: '',
    personal_website: '',
    earliest_joining_date: '',
    current_company: '',
    worked_in_startup: '' as '' | 'yes' | 'no',
    programming_languages: [] as string[],
    core_skillsets: [] as string[],
    demo_url: '',
    project_github_url: '',
    video_url: '',
    write_up: '',
    why_lyzr: '',
    what_lyzr_does: '',
    built_products: '',
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const toggleArr = (field: 'programming_languages' | 'core_skillsets', val: string) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(val)
        ? prev[field].filter(v => v !== val)
        : [...prev[field], val],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.demo_url || !form.project_github_url || !form.video_url || !form.write_up) {
      setError('Please fill in all required fields (marked with *).')
      return
    }

    setLoading(true)
    try {
      let resume_url = ''
      if (resumeFile) {
        const ext = resumeFile.name.split('.').pop()
        const path = `${user.id}/resume.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(path, resumeFile, { upsert: true })
        if (uploadError) {
          setError('Resume upload failed: ' + uploadError.message)
          setLoading(false)
          return
        }
        const { data } = supabase.storage.from('resumes').getPublicUrl(path)
        resume_url = data.publicUrl
      }

      const { error: dbError } = await supabase.from('submissions').insert({
        user_id: user.id,
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        resume_url: resume_url || null,
        github_profile_url: form.github_profile_url || null,
        linkedin_url: form.linkedin_url || null,
        years_of_experience: form.years_of_experience || null,
        interesting_problem: form.interesting_problem || null,
        personal_website: form.personal_website || null,
        earliest_joining_date: form.earliest_joining_date || null,
        current_company: form.current_company || null,
        worked_in_startup: form.worked_in_startup === 'yes' ? true : form.worked_in_startup === 'no' ? false : null,
        programming_languages: form.programming_languages.length ? form.programming_languages : null,
        core_skillsets: form.core_skillsets.length ? form.core_skillsets : null,
        demo_url: form.demo_url,
        project_github_url: form.project_github_url,
        video_url: form.video_url,
        write_up: form.write_up,
        why_lyzr: form.why_lyzr || null,
        what_lyzr_does: form.what_lyzr_does || null,
        built_products: form.built_products || null,
      })

      if (dbError) {
        setError(dbError.code === '23505'
          ? 'You have already submitted. Only one submission per person is allowed.'
          : dbError.message || 'Submission failed. Please try again.')
        setLoading(false)
        return
      }
      setSuccess(true)
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const avatarUrl = user.user_metadata?.avatar_url
  const displayName = prefillName || prefillEmail

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 80 }}>
      <nav className="nav on-light" style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://asset.lyzr.app/7f7jVuwo" className="nav-lb nav-lb-light" alt="Lyzr" style={{ display: 'block' }} />
            <span className="nav-brand">lyzr</span>
            <span className="nav-vr" />
            <span className="nav-product">Architect Hackathon</span>
          </a>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="nav-user">
              {avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt={displayName} className="nav-avatar" style={{ borderColor: 'rgba(42,28,24,.18)' }} />
              )}
              <span className="nav-user-name" style={{ color: 'var(--fg)' }}>{displayName.split(' ')[0]}</span>
            </div>
            <a href="/" className="btn outline" style={{ padding: '9px 16px', fontSize: 12 }}>← Back</a>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 100px' }}>
        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Architect Build Challenge</div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--fg)', lineHeight: 1.1, letterSpacing: '-.025em', marginBottom: 12 }}>
            Submit your <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>project.</em>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(26,17,14,.55)', lineHeight: 1.85, fontFamily: 'var(--font-body)' }}>
            Deadline: <strong style={{ color: 'var(--fg)' }}>Saturday, May 3 · 6 PM IST</strong>. Fill in all required fields or your submission won&apos;t be reviewed.
          </p>
        </div>

        <div style={{ background: 'var(--parch)', border: '1px solid rgba(42,28,24,.1)', borderRadius: 'var(--rXL)', padding: '44px 44px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,var(--primary),var(--rose))' }} />

          {success ? (
            <div className="form-success">
              <div className="form-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div className="form-success-title">Submission received!</div>
              <p className="form-success-sub">Thanks for submitting. The Lyzr Architect team will review your project after May 3rd. Winners announced Sunday, May 4th.</p>
              <div style={{ marginTop: 28 }}>
                <a href="/" className="btn primary">← Back to hackathon page</a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="form-error-msg">{error}</div>}

              {/* ── SECTION 1: PERSONAL INFO ── */}
              <div className="sf-section">
                <div className="sf-section-title">Section 1 — Personal Information</div>

                <div className="sf-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" required />
                  </div>
                </div>

                <div className="sf-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="years_of_experience">Total Years of Experience</label>
                    <input id="years_of_experience" name="years_of_experience" type="text" className="form-input" value={form.years_of_experience} onChange={e => set('years_of_experience', e.target.value)} placeholder="e.g. 3 years" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="resume">Resume</label>
                  <div className="sf-file-wrap">
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sf-file-input"
                      onChange={e => setResumeFile(e.target.files?.[0] || null)}
                    />
                    <div className="sf-file-ui">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <span>{resumeFile ? resumeFile.name : 'Click to upload PDF, DOC, or DOCX'}</span>
                    </div>
                  </div>
                  <div className="form-hint">Accepted: PDF, DOC, DOCX · Max 5 MB</div>
                </div>

                <div className="sf-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="github_profile_url">GitHub Profile</label>
                    <input id="github_profile_url" name="github_profile_url" type="url" className="form-input" value={form.github_profile_url} onChange={e => set('github_profile_url', e.target.value)} placeholder="https://github.com/username" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="linkedin_url">LinkedIn Profile</label>
                    <input id="linkedin_url" name="linkedin_url" type="url" className="form-input" value={form.linkedin_url} onChange={e => set('linkedin_url', e.target.value)} placeholder="https://linkedin.com/in/username" />
                  </div>
                </div>

                <div className="sf-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="personal_website">Personal Website</label>
                    <input id="personal_website" name="personal_website" type="url" className="form-input" value={form.personal_website} onChange={e => set('personal_website', e.target.value)} placeholder="https://yoursite.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="earliest_joining_date">Earliest Joining Date</label>
                    <input id="earliest_joining_date" name="earliest_joining_date" type="date" className="form-input" value={form.earliest_joining_date} onChange={e => set('earliest_joining_date', e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="current_company">Current / Previous Company</label>
                  <input id="current_company" name="current_company" type="text" className="form-input" value={form.current_company} onChange={e => set('current_company', e.target.value)} placeholder="Company name" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="interesting_problem">What is the most interesting problem you have ever solved? *</label>
                  <textarea id="interesting_problem" name="interesting_problem" className="form-input" value={form.interesting_problem} onChange={e => set('interesting_problem', e.target.value)} placeholder="Describe the problem, your approach, and what made it interesting..." rows={4} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Have you worked in a startup or non-profit startup before?</label>
                  <div className="sf-radio-group" style={{ marginTop: 10 }}>
                    {(['yes', 'no'] as const).map(v => (
                      <label key={v} className={`sf-radio${form.worked_in_startup === v ? ' checked' : ''}`}>
                        <input type="radio" name="worked_in_startup" value={v} checked={form.worked_in_startup === v} onChange={() => set('worked_in_startup', v)} />
                        {v === 'yes' ? 'Yes' : 'No'}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── SECTION 2: SKILLS ── */}
              <div className="sf-section">
                <div className="sf-section-title">Section 2 — Skills & Background</div>

                <div className="form-group">
                  <label className="form-label">Programming Languages You Know</label>
                  <div className="sf-check-grid">
                    {LANGS.map(lang => (
                      <label key={lang} className={`sf-check${form.programming_languages.includes(lang) ? ' checked' : ''}`}>
                        <input type="checkbox" checked={form.programming_languages.includes(lang)} onChange={() => toggleArr('programming_languages', lang)} />
                        {lang}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Core Skillsets</label>
                  <div className="sf-check-grid">
                    {SKILLS.map(skill => (
                      <label key={skill} className={`sf-check${form.core_skillsets.includes(skill) ? ' checked' : ''}`}>
                        <input type="checkbox" checked={form.core_skillsets.includes(skill)} onChange={() => toggleArr('core_skillsets', skill)} />
                        {skill}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── SECTION 3: PROJECT SUBMISSION ── */}
              <div className="sf-section">
                <div className="sf-section-title">Section 3 — Project Submission</div>
                <p style={{ fontSize: 13, color: 'rgba(26,17,14,.5)', fontFamily: 'var(--font-body)', marginBottom: 28, lineHeight: 1.7 }}>
                  All four fields are required. Incomplete submissions won&apos;t be reviewed.
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="demo_url">Deployed App URL *</label>
                  <input id="demo_url" name="demo_url" type="url" className="form-input" value={form.demo_url} onChange={e => set('demo_url', e.target.value)} placeholder="https://your-app.vercel.app" required />
                  <div className="form-hint">The public URL where your app is deployed. A judge should be able to open it, type a prompt, and watch the E2B build stream live.</div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="project_github_url">Project GitHub Repo *</label>
                  <input id="project_github_url" name="project_github_url" type="url" className="form-input" value={form.project_github_url} onChange={e => set('project_github_url', e.target.value)} placeholder="https://github.com/username/hackathon-repo" required />
                  <div className="form-hint">Must be public with a clear README. MIT or Apache 2.0 license. Ensure repo has a README file.</div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="video_url">Demo Video URL *</label>
                  <input id="video_url" name="video_url" type="url" className="form-input" value={form.video_url} onChange={e => set('video_url', e.target.value)} placeholder="https://loom.com/share/..." required />
                  <div className="form-hint">Loom or YouTube. 3 minutes max. Show prompt → live running preview. No slides.</div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="write_up">Architecture Write-up *</label>
                  <textarea id="write_up" name="write_up" className="form-input" value={form.write_up} onChange={e => set('write_up', e.target.value)} placeholder="Describe your socket protocol design, E2B sandbox lifecycle, key architectural decisions, and the hardest tradeoff you made..." required rows={7} />
                  <div className="form-hint">Cover: socket protocol, sandbox lifecycle, hardest engineering tradeoff. One page is enough.</div>
                </div>
              </div>

              {/* ── SECTION 4: CULTURE ── */}
              <div className="sf-section">
                <div className="sf-section-title">Section 4 — Culture</div>

                <div className="form-group">
                  <label className="form-label" htmlFor="why_lyzr">Why do you want to join Lyzr?</label>
                  <textarea id="why_lyzr" name="why_lyzr" className="form-input" value={form.why_lyzr} onChange={e => set('why_lyzr', e.target.value)} placeholder="What excites you about Lyzr and the Architect product specifically..." rows={4} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="what_lyzr_does">What do you think Lyzr does?</label>
                  <textarea id="what_lyzr_does" name="what_lyzr_does" className="form-input" value={form.what_lyzr_does} onChange={e => set('what_lyzr_does', e.target.value)} placeholder="In your own words, what problem does Lyzr solve and who is it for..." rows={3} />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="built_products">Are you passionate about building products? Have you built any before?</label>
                  <textarea id="built_products" name="built_products" className="form-input" value={form.built_products} onChange={e => set('built_products', e.target.value)} placeholder="Tell us about products you've shipped — side projects, startups, open source tools, anything you're proud of..." rows={4} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' as const, paddingTop: 8 }}>
                <button type="submit" className="form-submit" disabled={loading} style={{ flex: 1, minWidth: 180 }}>
                  {loading ? 'Submitting...' : 'Submit Project →'}
                </button>
                <span style={{ fontSize: 11, color: 'rgba(26,17,14,.35)', fontFamily: 'var(--font-body)', flexShrink: 0 }}>
                  Deadline: Sat May 3 · 6 PM IST
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
