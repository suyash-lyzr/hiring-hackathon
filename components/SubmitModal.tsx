'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { User } from '@supabase/supabase-js'

interface SubmitModalProps {
  user: User
  onClose: () => void
}

export default function SubmitModal({ user, onClose }: SubmitModalProps) {
  const supabase = createClient()

  const name = user.user_metadata?.full_name || user.user_metadata?.name || ''
  const email = user.email || ''

  const [form, setForm] = useState({
    name,
    email,
    demo_url: '',
    github_url: '',
    video_url: '',
    write_up: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.demo_url || !form.github_url || !form.video_url || !form.write_up) {
      setError('Please fill in all required fields.')
      return
    }

    setLoading(true)
    try {
      const { error: dbError } = await supabase.from('submissions').insert({
        user_id: user.id,
        email: form.email,
        name: form.name,
        demo_url: form.demo_url,
        github_url: form.github_url,
        video_url: form.video_url,
        write_up: form.write_up,
      })

      if (dbError) {
        if (dbError.code === '23505') {
          setError('You have already submitted a project. Only one submission per person is allowed.')
        } else {
          setError(dbError.message || 'Failed to submit. Please try again.')
        }
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

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Submit Your Project</div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          {success ? (
            <div className="form-success">
              <div className="form-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="form-success-title">Submission received!</div>
              <p className="form-success-sub">
                Thanks for submitting your project. The Lyzr Architect team will review it after May 3rd. Winners will be announced on Sunday, May 4th.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="form-error-msg">{error}</div>}

              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="demo_url">Live Demo URL *</label>
                <input
                  id="demo_url"
                  name="demo_url"
                  type="url"
                  className="form-input"
                  value={form.demo_url}
                  onChange={handleChange}
                  placeholder="https://your-app.vercel.app"
                  required
                />
                <div className="form-hint">A public URL where a judge can try your builder live.</div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="github_url">GitHub Repo URL *</label>
                <input
                  id="github_url"
                  name="github_url"
                  type="url"
                  className="form-input"
                  value={form.github_url}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  required
                />
                <div className="form-hint">Must be public with a README. MIT or Apache 2.0 license.</div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="video_url">Demo Video URL *</label>
                <input
                  id="video_url"
                  name="video_url"
                  type="url"
                  className="form-input"
                  value={form.video_url}
                  onChange={handleChange}
                  placeholder="https://loom.com/share/..."
                  required
                />
                <div className="form-hint">Loom or YouTube. 3 minutes max. Show prompt → live preview.</div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="write_up">Architecture Write-up *</label>
                <textarea
                  id="write_up"
                  name="write_up"
                  className="form-input"
                  value={form.write_up}
                  onChange={handleChange}
                  placeholder="Describe your socket protocol, sandbox lifecycle, and the hardest tradeoff you made..."
                  required
                  rows={6}
                />
                <div className="form-hint">One page on your socket protocol, sandbox lifecycle, and hardest tradeoff.</div>
              </div>

              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Project'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
