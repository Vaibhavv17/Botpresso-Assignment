# SEO Meta Optimizer — Frontend

A professional React + TypeScript frontend for the n8n SEO Metadata workflow.

---

## 🚀 Setup Instructions

### Step 1 — Install Dependencies

```bash
cd seo-meta-optimizer
npm install
```

### Step 2 — Connect Your n8n Webhook

Open `src/App.tsx` and replace line 5:

```ts
// Change this:
const N8N_WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE'

// To your actual n8n webhook URL:
const N8N_WEBHOOK_URL = 'https://your-n8n.com/webhook/seo-meta'
```

### Step 3 — Run the App

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### Step 4 — Build for Production

```bash
npm run build
```

---

## 📦 What's Installed

| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `typescript` | Type safety |
| `vite` | Fast dev server & build tool |
| `lucide-react` | Icon library |

---

## 🔧 Project Structure

```
src/
├── components/
│   ├── Header.tsx        # Top navigation bar
│   ├── InputForm.tsx     # URL + Keyword input form
│   └── ResultsPanel.tsx  # Results display with variations
├── types/
│   └── index.ts          # TypeScript interfaces
├── App.tsx               # Main app + API call
├── App.css
└── index.css             # Global styles & CSS variables
```

---

## ⚠️ CORS Note

If you get a CORS error when calling n8n, open your Webhook node in n8n and enable **"Allow All Origins"** in the node settings.
