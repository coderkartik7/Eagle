# Eagle — Single-Pass Drone 3D Reconstruction

Eagle is a web application and processing interface engineered for **single-pass aerial photogrammetry and 3D reconstruction**. 

Unlike conventional multi-pass cross-hatch flight routines that require extensive battery swapping and redundant passes, Eagle ingests continuous single-trajectory aerial imagery (nadir + oblique camera angles) and leverages neural radiance fields and 3D Gaussian Splatting to synthesize high-density point clouds, textured 3D meshes, and metric Digital Elevation Models (DEM).

---

## Key Features & Highlights

- **Single-Pass Reconstruction Pipeline**: Ingests IMU poses, RTK base station sync, and video/still multi-angle captures with zero flight pattern repetition.
- **Interactive 3D Mesh & Splat Studio**: Toggle seamlessly between 3D Gaussian Splats, textured meshes, and dense point cloud visualizations with false-color elevation and wireframe overlays.
- **Flight & Mission Telemetry Tracking**: Instant visibility into altitude (AGL), ground sampling resolution (GSD), dense point cloud count, and camera trajectory.
- **Minimalist, Professional Dark-on-Light Aesthetic**: Tailored earthy green accent (`#0e6f68`), rounded cards, crisp Plus Jakarta Sans typography, and intuitive sidebar navigation.
- **Zero-Config Vercel Deployment**: Includes pre-configured `vercel.json` and optimized build outputs ready to deploy in one click.

---

## Project Structure

```
frontend/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # SVGs, brand assets, and icons
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx      # Sticky top navbar with search and ingestion trigger
│   │   ├── Model3DViewer.jsx # Interactive 3D Splat/Mesh model studio
│   │   ├── ProjectCard.jsx # Mission cards with technical metrics & tags
│   │   └── Sidebar.jsx     # Navigation sidebar with operator profile & status
│   ├── data/               # Mock JSON / JS telemetry data
│   │   └── mockData.js     # Flight missions, GPU telemetry, and pipeline stages
│   ├── pages/              # Main route views
│   │   ├── LandingPage.jsx # Hero showcase and pilot/operator login
│   │   └── Dashboard.jsx   # Mission workspace, 3D viewer, & telemetry ingestion
│   ├── App.jsx             # Main router & session state coordinator
│   ├── index.css           # Design tokens, color system (#0e6f68), and typography
│   └── main.jsx            # React root entry
├── index.html              # HTML shell with custom meta & typography
├── package.json            # React 19 + Vite + Lucide icons
├── vercel.json             # Single-Page App rewrites for Vercel
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## Deploy to Vercel (Zero-Config)

Eagle is configured for zero-friction deployment to Vercel:

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Root Directory to `frontend` (or leave default if repository root).
4. Framework Preset: **Vite**
5. Click **Deploy**. Vercel will run `npm run build` and route all paths to `index.html` via `vercel.json`.

---

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS Design Tokens (Earthy green `#0e6f68`, glassmorphism, responsive cards)
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & JetBrains Mono
