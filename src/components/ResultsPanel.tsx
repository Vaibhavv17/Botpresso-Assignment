import { useState } from 'react'
import { SEOResult, Variation } from '../types'
import './ResultsPanel.css'

interface Props {
  result: SEOResult
}

function CharBar({ value, min, max, label }: { value: number; min: number; max: number; label: string }) {
  const pct = Math.min((value / max) * 100, 100)
  const ok = value >= min && value <= max
  const over = value > max

  return (
    <div className="char-bar-wrapper">
      <div className="char-bar-header">
        <span className="char-label">{label}</span>
        <span className={`char-count ${ok ? 'count-ok' : over ? 'count-over' : 'count-low'}`}>
          {value} / {max}
          {ok ? ' ✓' : over ? ' ↑' : ' ↓'}
        </span>
      </div>
      <div className="char-bar-track">
        <div
          className={`char-bar-fill ${ok ? 'fill-ok' : over ? 'fill-over' : 'fill-low'}`}
          style={{ width: `${pct}%` }}
        />
        <div className="char-bar-min" style={{ left: `${(min / max) * 100}%` }} />
      </div>
      <div className="char-bar-range">
        <span>{min} min</span>
        <span>{max} max</span>
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className={`copy-btn ${copied ? 'copy-btn-success' : ''}`} onClick={handleCopy}>
      {copied ? (
        <>
          <span>✓</span>
          Copied!
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

function VariationCard({ v, index }: { v: Variation; index: number }) {
  const colors = ['#6c63ff', '#ff6584', '#43e97b']
  const labels = ['Variation A', 'Variation B', 'Variation C']

  return (
    <div className="variation-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="variation-header" style={{ borderColor: colors[index] + '40' }}>
        <div className="variation-badge" style={{ background: colors[index] + '20', color: colors[index] }}>
          <span className="variation-dot" style={{ background: colors[index] }} />
          {labels[index]}
        </div>
        <div className={`variation-status ${v.title_ok && v.description_ok ? 'status-ok' : 'status-warn'}`}>
          {v.title_ok && v.description_ok ? '✓ Optimized' : '⚠ Check lengths'}
        </div>
      </div>

      <div className="variation-body">
        <div className="meta-block">
          <div className="meta-block-header">
            <span className="meta-type-label">META TITLE</span>
            <CopyButton text={v.meta_title} />
          </div>
          <p className="meta-title-text">{v.meta_title}</p>
          <CharBar
            value={v.meta_title_length || v.meta_title.length}
            min={50} max={60}
            label="Characters"
          />
        </div>

        <div className="meta-divider" />

        <div className="meta-block">
          <div className="meta-block-header">
            <span className="meta-type-label">META DESCRIPTION</span>
            <CopyButton text={v.meta_description} />
          </div>
          <p className="meta-desc-text">{v.meta_description}</p>
          <CharBar
            value={v.meta_description_length || v.meta_description.length}
            min={150} max={160}
            label="Characters"
          />
        </div>
      </div>
    </div>
  )
}

export default function ResultsPanel({ result }: Props) {
  return (
    <section className="results-section animate-fade-up">
      {/* Section Header */}
      <div className="results-header">
        <div className="results-title-row">
          <h2 className="results-title">Analysis Complete</h2>
          <div className="results-meta-tag">
            <span>🎯</span>
            {result.keyword || 'Keyword analyzed'}
          </div>
        </div>
        {result.url && (
          <p className="results-url">
            <span className="url-icon">🔗</span>
            <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a>
          </p>
        )}
      </div>

      {/* Current Meta */}
      <div className="current-meta-card">
        <div className="current-meta-label">
          <span className="current-meta-icon">📄</span>
          <span>Current Metadata</span>
          <span className="current-meta-badge">LIVE PAGE</span>
        </div>
        <div className="current-meta-grid">
          <div className="current-meta-item">
            <span className="current-meta-type">Title</span>
            <p className="current-meta-value">{result.current_meta.title || 'Not found'}</p>
            <span className="current-meta-chars">{result.current_meta.title.length} chars</span>
          </div>
          <div className="current-meta-item">
            <span className="current-meta-type">Description</span>
            <p className="current-meta-value">{result.current_meta.description || 'Not found'}</p>
            <span className="current-meta-chars">{result.current_meta.description.length} chars</span>
          </div>
        </div>
      </div>

      {/* Divider with label */}
      <div className="section-divider">
        <div className="divider-line" />
        <span className="divider-label">⚡ AI-Generated Optimizations</span>
        <div className="divider-line" />
      </div>

      {/* Variations Grid */}
      <div className="variations-grid">
        {result.optimized_variations.map((v, i) => (
          <VariationCard key={v.variation} v={v} index={i} />
        ))}
      </div>

      {/* SERP Preview hint */}
      <div className="serp-hint">
        <span>💡</span>
        <span>Tip: Paste these into <a href="https://serpsimulator.com" target="_blank" rel="noopener noreferrer">serpsimulator.com</a> to preview how they appear in Google search results.</span>
      </div>
    </section>
  )
}
