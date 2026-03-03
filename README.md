# Fenrir Security — Frontend Assessment

This is my submission for the Fenrir Security frontend design challenge. I had to recreate three screens from a B2B security scanning product — a signup page, a scan dashboard, and a live scan detail view. Both dark and light mode are fully supported.

**Live:** [https://technical-assessment-blue.vercel.app](https://technical-assessment-blue.vercel.app)  
**Repo:** [https://github.com/ayushigarg-247/Technical-Assessment](https://github.com/ayushigarg-247/Technical-Assessment)

--------------------------------------------

## What I used

- React 19 + Vite
- React Router v6
- Plain CSS (no Tailwind, no component libraries)
- Lucide React for icons
- No backend — all data is mocked locally

I went with vanilla CSS instead of Tailwind because I wanted full control over the design tokens and theming system. The dark/light switch runs entirely on CSS custom properties, so it's instant — no flicker, no rerender overhead.

-----------------------------------------------

## Running it locally

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`. That's it.

--------------------------------------------------

## How the app is structured

The `context/` folder has the theme logic, `data/` has all the mock data, `components/` has the reusable pieces (sidebar, badges, chips, toast, theme toggle), and `pages/` has the three main screens. `App.jsx` wires up the routes and `index.css` handles all the design tokens and base styles.

---------------------------------------------------

## Screen-by-screen breakdown

**Login page**
Split layout — dark marketing panel on the left, signup form on the right. The form validates all fields before letting you through. Password has a show/hide toggle. Clicking "Log in" or submitting the form takes you straight to the dashboard.

**Dashboard**
Shows an org-level stats bar at the top with live severity counts and trend arrows. Below that is the scan table — you can search by name or type, and filter by status. Each row shows a progress bar, colored vulnerability badges, and a status chip. Clicking any row opens the scan detail page.

**Scan detail**
This one has the most going on. There's a circular progress indicator and a five-step tracker at the top. The main area is split into two panels — the left is a live console that streams log lines every 3 seconds to feel like a real agent running, and the right panel shows vulnerability finding cards stacked by severity. The console has two tabs (Activity Log and Verification Loops) and auto-scrolls as new entries come in.

----------------------------------------------------------

## Theme system

Dark and light mode both feel intentional — not just color-inverted. I set up CSS custom properties on `[data-theme="dark"]` and `[data-theme="light"]` for backgrounds, surfaces, borders, shadows, and text colors separately. The toggle writes to `localStorage` so your preference sticks after a refresh.

----------------------------------------------------------

## Mock data

Everything lives in `src/data/mockData.js` — scan rows, activity log lines, vulnerability findings, org stats, all of it. The log streaming on the scan detail page is just a `useEffect` adding one entry to state every 3 seconds, not a real websocket.

--------------------------------------------------

## What I'd improve with more time

- Load the correct scan data based on the row clicked (right now it always shows the same mock scan on screen 3)
- Add skeleton loaders while mock data "resolves"
- Animate the mobile sidebar instead of just toggling visibility
- Real auth flow with protected routes

---------------------------------------------------------

## Deploy

```bash
npm run build
```

The `dist/` folder can be dropped into Vercel or Netlify directly.

**Live URL:** [https://technical-assessment-blue.vercel.app](https://technical-assessment-blue.vercel.app)
