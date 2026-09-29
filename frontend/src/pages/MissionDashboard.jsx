import React, { useState } from 'react';
import CanvasViewer3D from '../components/CanvasViewer3D';
import PipelineStages from '../components/PipelineStages';
import TelemetryCharts from '../components/TelemetryCharts';
import { missionKpis, recentMissionsList } from '../data/missionData';

export default function MissionDashboard({ videoMeta, onNavigateUpload, onToast }) {
  const [activeModelAccurateProgress, setActiveModelAccurateProgress] = useState(64);

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)' }}>
      {/* Sidebar Navigation */}
      <nav aria-label="Main" style={styles.nav}>
        <div style={styles.brand}>
          <img src="/logo.png" alt="Eagle" style={styles.logo} />
        </div>
        
        <a href="#missions" className="on" style={styles.navLink}>
          Missions <span style={{ fontSize: '11px', background: 'var(--acc)', color: '#fff', padding: '1px 6px', borderRadius: '10px' }}>3</span>
        </a>
        <a href="#viewer" style={styles.navLink}>3D Viewer</a>
        <a href="#change" style={styles.navLink}>Change Detection</a>
        <a href="#reports" style={styles.navLink}>Reports</a>
        <a href="#datasources" style={styles.navLink}>Data Sources</a>
        <a href="#settings" style={styles.navLink}>Settings</a>
        
        {/* Navigation to Upload new video */}
        <button 
          onClick={onNavigateUpload}
          style={styles.uploadNewBtn}
        >
          + Ingest New Video
        </button>

        <div style={{ flex: 1 }}></div>

        <div className="op" style={styles.operatorBox}>
          <b style={{ display: 'block', color: 'var(--ink)', fontSize: '13px' }}>Cdr. R. Sharma</b>
          Analyst · secure session
          <br />
          <span style={{ color: 'var(--acc)', fontWeight: 600 }}>● Offline mode on</span>
        </div>
      </nav>

      {/* Main Mission Content */}
      <main style={styles.main}>
        {/* Top Header */}
        <header style={styles.header}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 650, margin: 0 }}>Mission OP-0927 · Riverside Sector</h1>
            <div className="sub" style={{ color: 'var(--mute)', fontSize: '12px', marginTop: '2px' }}>
              Single pass · 3m 42s · 4K 30 fps · captured 27 Sep 2026, 16:05 {videoMeta?.fileName && `(${videoMeta.fileName})`}
            </div>
          </div>

          <span className="chip" style={styles.chipSuccess}>Preview ready</span>
          <span className="chip w" style={styles.chipWarn}>
            Accurate model {activeModelAccurateProgress}%
          </span>

          <div style={{ flex: 1 }}></div>

          <button 
            className="btn" 
            onClick={() => onToast('Report generated with verified measurements')}
          >
            Generate report
          </button>
          
          <button 
            className="btn p" 
            onClick={() => onToast('Exporting model with georeference')}
          >
            Export model
          </button>
        </header>

        {/* Key Metrics / KPIs */}
        <section className="kpis" aria-label="Key metrics" style={styles.kpis}>
          {missionKpis.map((kpi) => (
            <div key={kpi.label} className="card kpi" style={{ padding: '16px' }}>
              <b style={{ fontSize: '22px', fontWeight: 650, display: 'block', letterSpacing: '-0.02em' }}>
                {kpi.val}
              </b>
              <span style={{ fontSize: '12px', color: 'var(--mute)' }}>{kpi.label}</span>
            </div>
          ))}
        </section>

        {/* 3D Canvas & Interactive Pipeline Grid */}
        <section className="grid" style={styles.grid}>
          <CanvasViewer3D onToast={onToast} />

          <div className="stack" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <PipelineStages onProgressUpdate={setActiveModelAccurateProgress} />
          </div>
        </section>

        {/* Telemetry, Charts, Scene Cleaning & Export Sections */}
        <TelemetryCharts onToast={onToast} />

        {/* Recent Missions list */}
        <section className="card" style={{ padding: '16px', marginTop: '12px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 650, marginBottom: '10px' }}>Recent missions</h2>
          {recentMissionsList.map((m, idx) => (
            <div 
              key={m.id} 
              className="row" 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0', 
                borderTop: idx === 0 ? 'none' : '1px solid var(--line)', 
                fontSize: '13px' 
              }}
            >
              <span style={{ color: 'var(--mute)' }}>{m.title}</span>
              <span style={{ fontWeight: 550 }}>{m.status}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

const styles = {
  nav: {
    width: '210px',
    flex: 'none',
    borderRight: '1px solid var(--line)',
    padding: '20px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    backgroundColor: 'var(--card)',
    height: '100vh',
    position: 'sticky',
    top: 0,
  },
  brand: {
    padding: '0 8px 18px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  logo: {
    display: 'block',
    maxWidth: '100%',
    height: '34px',
    width: 'auto',
    objectFit: 'contain',
  },
  navLink: {
    padding: '8px 10px',
    borderRadius: '7px',
    color: 'var(--mute)',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13.5px',
    fontWeight: 500,
  },
  uploadNewBtn: {
    marginTop: '10px',
    padding: '8px 10px',
    borderRadius: '7px',
    backgroundColor: 'var(--accs)',
    color: 'var(--acc)',
    border: '1px solid var(--acc)',
    fontSize: '12.5px',
    fontWeight: 650,
    cursor: 'pointer',
    textAlign: 'center',
  },
  operatorBox: {
    borderTop: '1px solid var(--line)',
    padding: '12px 8px 0',
    fontSize: '12px',
    color: 'var(--mute)',
  },
  main: {
    flex: 1,
    overflow: 'auto',
    padding: '20px 24px 32px',
    minWidth: 0,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  chipSuccess: {
    fontSize: '12px',
    padding: '3px 9px',
    borderRadius: '99px',
    backgroundColor: 'var(--accs)',
    color: 'var(--acc)',
    fontWeight: 600,
  },
  chipWarn: {
    fontSize: '12px',
    padding: '3px 9px',
    borderRadius: '99px',
    backgroundColor: 'var(--warns)',
    color: 'var(--warn)',
    fontWeight: 600,
  },
  kpis: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '12px',
    marginBottom: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1fr)',
    gap: '12px',
    marginBottom: '12px',
  }
};
