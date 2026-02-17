import { useState } from 'react'
import { FormState } from '../types'
import './InputForm.css'

interface Props {
  onGenerate: (form: FormState) => void
  loading: boolean
}

export default function InputForm({ onGenerate, loading }: Props) {
  const [form, setForm] = useState<FormState>({ url: '', keyword: '' })
  const [touched, setTouched] = useState({ url: false, keyword: false })

  const urlValid = form.url.startsWith('http') && form.url.length > 10
  const keywordValid = form.keyword.trim().length > 1

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ url: true, keyword: true })
    if (urlValid && keywordValid) {
      onGenerate(form)
    }
  }

  return (
    <section className="form-section animate-fade-up">
      <div className="form-hero">
        <h1 className="form-title">
          Optimize Your<br />
          <span className="gradient-text">SEO Metadata</span>
        </h1>
        <p className="form-subtitle">
          Enter your page URL and target keyword. Our AI analyzes the top 3 competitors
          and generates optimized meta titles & descriptions instantly.
        </p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className={`form-field ${touched.url && !urlValid ? 'field-error' : ''} ${urlValid ? 'field-valid' : ''}`}>
            <label className="field-label">
              <span className="label-icon">🔗</span>
              Page URL
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className="field-input"
                placeholder="https://yourwebsite.com/page"
                value={form.url}
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                onBlur={() => setTouched(t => ({ ...t, url: true }))}
                disabled={loading}
              />
              {urlValid && <span className="input-check">✓</span>}
            </div>
            {touched.url && !urlValid && (
              <span className="field-hint">Please enter a valid URL starting with https://</span>
            )}
          </div>

          <div className={`form-field ${touched.keyword && !keywordValid ? 'field-error' : ''} ${keywordValid ? 'field-valid' : ''}`}>
            <label className="field-label">
              <span className="label-icon">🎯</span>
              Target Keyword
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                className="field-input"
                placeholder="e.g. men t shirts online india"
                value={form.keyword}
                onChange={e => setForm(f => ({ ...f, keyword: e.target.value }))}
                onBlur={() => setTouched(t => ({ ...t, keyword: true }))}
                disabled={loading}
              />
              {keywordValid && <span className="input-check">✓</span>}
            </div>
            {touched.keyword && !keywordValid && (
              <span className="field-hint">Please enter a target keyword</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`generate-btn ${loading ? 'btn-loading' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="btn-spinner" />
              <span>Analyzing competitors & generating...</span>
            </>
          ) : (
            <>
              <span className="btn-lightning">⚡</span>
              <span>Generate Optimized Metadata</span>
            </>
          )}
        </button>

        {loading && (
          <div className="loading-steps animate-fade-in">
            <div className="step active">
              <span className="step-dot" />
              Fetching top 3 competitors from Google
            </div>
            <div className="step">
              <span className="step-dot" />
              Scraping your page metadata
            </div>
            <div className="step">
              <span className="step-dot" />
              AI generating optimized variations
            </div>
          </div>
        )}
      </form>
    </section>
  )
}
