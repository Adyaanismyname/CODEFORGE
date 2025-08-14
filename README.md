# CODEFORGE

Elevating ideas into beautiful, high‑performance digital products—websites, apps, and automation—crafted with care.

---

## ✨ Highlights
- Smooth video hero with buttery scrolling (Lenis)
- Delightful motion (Framer Motion) with reduced‑motion support
- Mobile‑first, responsive layout
- Services, About, Testimonials, Contact, and Footer sections
- Accessible forms with async submission
- Tailwind utilities layered over custom CSS for strong contrast on video

---

## 📸 Preview
- Hero with typing effect showcasing: WEBSITES • AUTOMATION SCRIPTS • APPS
- Crisp white Contact section for clarity and focus
- Dimmed, cinematic Footer overlaying the background video

Add your media to `public/`:
- `public/landing-page.webm` (primary hero video)
- Optional fallbacks: `landing-page.mp4`, `landing-page.jpg/png`

---

## 🚀 Tech Stack
- Vite + React
- Framer Motion
- Lenis (smooth scroll)
- Tailwind CSS (utilities)
- ESLint (Vite + React refresh)

---

## 🛠️ Setup

1) Install dependencies
```
npm install
```

2) Start the dev server
```
npm run dev
```

3) Build for production
```
npm run build
```

4) Preview the production build
```
npm run preview
```

---

## 🧩 Project Structure
```
codeforge/
  public/
    landing-page.webm
    landing-page.mp4 (optional)
    landing-page.png (optional)
  src/
    App.jsx
    App.css
    main.jsx
    components/ (if you split sections)
```

---

## ⚙️ Environment (Email)
If you use the contact form backend (`/api/send-email.js`), set environment variables:
```
EMAIL_SERVICE=...
EMAIL_USER=...
EMAIL_PASS=...
ADMIN_EMAIL=...
```

---

## 🧭 Key Features
- Animated hero with typing effect and parallax fade on scroll
- Smooth, precise section navigation via Lenis
- Services grid with hover depth and micro‑interactions
- Testimonials with ratings and client meta
- Contact form with loading states and friendly feedback
- Aesthetic footer with dimmed overlay for readability on video

---

## 🎨 Theming
- Primary accent: Orange (#ff7f00)
- Typography: JetBrains Mono (monospace aesthetic)
- Strong text contrast via Tailwind utilities + text shadow

---

## 📦 Scripts (package.json)
- `dev` – Vite dev server
- `build` – Production build
- `preview` – Preview built app

---

## 🧪 Quality
- Honors prefers‑reduced‑motion
- Linted with ESLint config included
- Mobile‑first media queries and fluid sizing (clamp)

---

## 🔧 Customization Tips
- Replace `CODEFORGE` and copy in `App.jsx` with your brand voice
- Swap the hero video in `public/landing-page.webm`
- Update contact email in the footer and API handler

---

## 📬 Contact
- Email: hello@codeforge.dev
- Made with ❤️ by the CodeForge team

---

## 📝 License
Copyright © CodeForge. All rights reserved.
