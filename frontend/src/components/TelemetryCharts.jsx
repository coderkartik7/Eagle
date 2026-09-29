import React, { useMemo } from 'react';
import { confidenceBreakdown, sceneCleaningStats } from '../data/missionData';

export default function TelemetryCharts({ onToast }) {
  // Flight path SVG paths (Raw GPS vs Filtered Kalman)
  const { rawPath, filteredPath } = useMemo(() => {
    let r = 7;
    const g = () => {
      r = (r * 16807) % 2147483647;
      return r / 2147483647 - 0.5;
    };
    let a = '';
    let b = '';
    for (let i = 0; i <= 40; i++) {
      const x = 15 + i * 6.8;
      const y = 85 + Math.sin(i / 6) * 45;
      const n = x + g() * 8;
      const m = y + g() * 16;
      a += (i ? 'L' : 'M') + n.toFixed(1) + ' ' + m.toFixed(1);
      b += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return { rawPath: a, filteredPath: b };
  }, []);

  // Frame sharpness bar chart
  const sharpnessBars = useMemo(() => {
    const bars = [];
    for (let i = 0; i < 60; i++) {
      const h = 8 + Math.abs(Math.sin(i * 1.7) * 22) + (i % 17 === 0 ? -8 : 0);
      bars.push({
        x: i * 5,
        y: 38 - h,
        height: Math.max(3, h),
        fill: h < 14 ? '#e0a02c' : '#0e6f68'
      });
    }
    return bars;
  }, []);

  return (
    <>
      {/* Row 1 of Analysis & Telemetry Grid */}
      <section className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', marginBottom: '12px' }}>
        {/* Input & Telemetry */}
        <div className="card" style={{ padding: '16px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 650, marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Input & telemetry <span className="chip g">JWT auth</span>
          </h2>
          <div className="drop">
            <div>
              <b>op0927_4k.mp4</b>
              <div className="sub">2.1 GB · 3840×2160</div>
            </div>
            <button className="btn" onClick={() => onToast && onToast('Replace stream dialog opened')}>Replace</button>
          </div>
          <div className="row"><span>Flight log</span><span>GPS · IMU · Baro</span></div>
          <div className="row"><span>Camera intrinsics</span><span>Estimated (COLMAP)</span></div>
          <div className="row"><span>RTK / PPK</span><span>Not supplied</span></div>
          <div className="row"><span>Altitude</span><span>88 m AGL</span></div>
          <div className="row"><span>Coordinate system</span><span>WGS84 → UTM 44N</span></div>
        </div>

        {/* Flight path Kalman fused */}
        <div className="card" style={{ padding: '16px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 650, marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Flight path <span className="sub">Kalman-fused GPS/IMU/Baro</span>
          </h2>
          <svg viewBox="0 0 300 170" width="100%" role="img" aria-label="Raw GPS versus filtered trajectory">
            <rect x="1" y="1" width="298" height="168" rx="6" fill="none" stroke="#e3e6e3" />
            <path d={rawPath} fill="none" stroke="#c9cfcd" strokeWidth="1.5" />
            <path d={filteredPath} fill="none" stroke="#0e6f68" strokeWidth="2" />
            <circle cx="15" cy="85" r="4" fill="#0e6f68" />
            <text x="22" y="100" style={{ font: '11px system-ui', fill: 'var(--mute)' }}>Start</text>
            <text x="255" y="158" style={{ font: '11px system-ui', fill: 'var(--mute)' }}>Land</text>
          </svg>
          <div className="sub" style={{ marginTop: '8px' }}>
            <i className="dot" style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', marginRight: '5px', background: '#c9cfcd' }}></i>
            Raw GPS &nbsp;
            <i className="dot" style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', marginRight: '5px', background: '#0e6f68' }}></i>
            Filtered · drift cut 71%
          </div>
        </div>

        {/* Confidence Breakdown */}
        <div className="card" style={{ padding: '16px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 650, marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Confidence <span className="sub">Verified vs AI-inferred</span>
          </h2>
          <svg viewBox="0 0 300 130" width="100%" role="img" aria-label="Confidence by surface type">
            {confidenceBreakdown.map((item, i) => (
              <g key={item.label}>
                <text x="0" y={i * 26 + 15} style={{ font: '11px system-ui', fill: 'var(--mute)' }}>{item.label}</text>
                <rect x="100" y={i * 26 + 5} width="160" height="12" rx="6" fill="#e3e6e3" />
                <rect x="100" y={i * 26 + 5} width={item.val * 1.6} height="12" rx="6" fill={item.val > 60 ? '#0e6f68' : '#e0a02c'} />
                <text x="266" y={i * 26 + 15} style={{ font: '11px system-ui', fill: 'var(--mute)' }}>{item.val}%</text>
              </g>
            ))}
          </svg>
          <div className="sub" style={{ marginTop: '6px' }}>
            Measurements in amber zones show a warning and are excluded from reports by default.
          </div>
        </div>
      </section>

      {/* Row 2: Scene Cleaning, Analysis Tools, Export */}
      <section className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', marginBottom: '12px' }}>
        {/* Scene cleaning */}
        <div className="card" style={{ padding: '16px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 650, marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Scene cleaning <span className="chip">{sceneCleaningStats.maskedCount} objects masked</span>
          </h2>
          <div className="row"><span>Vehicles (YOLOv8)</span><span>{sceneCleaningStats.vehicles}</span></div>
          <div className="row"><span>People (Mask R-CNN)</span><span>{sceneCleaningStats.people}</span></div>
          <div className="row"><span>Animals</span><span>{sceneCleaningStats.animals}</span></div>
          <div className="row"><span>Motion check (RAFT)</span><span>{sceneCleaningStats.motionCheck}</span></div>
          <div className="row"><span>Blurred frames dropped</span><span>{sceneCleaningStats.blurredFramesDropped}</span></div>
          
          <svg viewBox="0 0 300 40" width="100%" style={{ marginTop: '8px' }} role="img" aria-label="Frame sharpness over time">
            {sharpnessBars.map((bar, i) => (
              <rect key={i} x={bar.x} y={bar.y} width="3" height={bar.height} rx="1.5" fill={bar.fill} opacity="0.8" />
            ))}
          </svg>
        </div>

        {/* Analysis tools */}
        <div className="card" style={{ padding: '16px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 650, marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Analysis tools
          </h2>
          <div className="row">
            <span>Change detection vs baseline</span>
            <button className="btn" onClick={() => onToast && onToast('Comparing with baseline OP-0921: 6 changed structures')}>Compare</button>
          </div>
          <div className="row">
            <span>Thermal / IR fusion</span>
            <span className="chip g">Roadmap</span>
          </div>
          <div className="row">
            <span>Confidence heatmap</span>
            <button 
              className="sw" 
              aria-pressed="false"
              onClick={(e) => {
                const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
                e.currentTarget.setAttribute('aria-pressed', (!isPressed).toString());
                onToast && onToast(`Confidence heatmap ${!isPressed ? 'enabled' : 'disabled'}`);
              }}
              aria-label="Confidence heatmap"
            />
          </div>
          <div className="row">
            <span>Warn on inferred measurements</span>
            <button 
              className="sw" 
              aria-pressed="true"
              onClick={(e) => {
                const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
                e.currentTarget.setAttribute('aria-pressed', (!isPressed).toString());
                onToast && onToast(`Warning alerts ${!isPressed ? 'enabled' : 'disabled'}`);
              }}
              aria-label="Warn on inferred"
            />
          </div>
          <div className="row">
            <span>Edge / offline processing</span>
            <button 
              className="sw" 
              aria-pressed="true" 
              onClick={(e) => {
                const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
                e.currentTarget.setAttribute('aria-pressed', (!isPressed).toString());
                onToast && onToast(`Offline processing mode ${!isPressed ? 'activated' : 'deactivated'}`);
              }}
              aria-label="Offline mode"
            />
          </div>
        </div>

        {/* Measurements & export */}
        <div className="card" style={{ padding: '16px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 650, marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Measurements & export
          </h2>
          <div className="row"><span>Tallest structure</span><span>24.6 m</span></div>
          <div className="row"><span>Roof area, block B</span><span>1,180 m²</span></div>
          <div className="row"><span>Road width, main</span><span>11.2 m</span></div>

          <div className="tw" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
            {['.ply', '.obj', '.las', 'GeoJSON', 'PDF report'].map((ext) => (
              <button 
                key={ext} 
                className="btn ex"
                onClick={() => onToast && onToast(`${ext} export started`)}
              >
                {ext}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
