import { useState } from 'react'
import { SEOResult, FormState } from './types'
import InputForm from './components/InputForm'
import ResultsPanel from './components/ResultsPanel'
import Header from './components/Header'
import './App.css'

const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/seo-meta'

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SEOResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (form: FormState) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: form.url, keyword: form.keyword }),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error('Workflow returned an error. Please try again.')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <InputForm onGenerate={handleGenerate} loading={loading} />
        {error && (
          <div className="error-banner animate-fade-up">
            <span className="error-icon">⚠</span>
            <span>{error}</span>
          </div>
        )}
        {result && <ResultsPanel result={result} />}
      </main>
      <footer className="footer">
        <p>SEO Meta Optimizer · Powered by AI & n8n</p>
      </footer>
    </div>
  )
}

export default App
