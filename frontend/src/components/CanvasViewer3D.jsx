import React, { useRef, useEffect, useState, useCallback } from 'react';

// Procedural building footprints [cx, cz, w, d, h]
const BUILDINGS = [
  [-30, -10, 18, 16, 22],
  [-4, -14, 20, 14, 14],
  [24, -8, 16, 18, 25],
  [-22, 18, 16, 12, 10],
  [8, 16, 22, 14, 17],
  [34, 20, 12, 12, 8]
];

// Generate deterministic points cloud
function generatePoints() {
  let seed = 42;
  const rn = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const points = [];
  const add = (x, y, z, v, h) => points.push({ x, y, z, v, h });

  // Ground plane points
  for (let i = 0; i < 2600; i++) {
    add(rn() * 100 - 50, 0, rn() * 70 - 35, 1, 0);
  }

  // Structures & facades
  BUILDINGS.forEach(([cx, cz, w, d, h]) => {
    for (let i = 0; i < 420; i++) {
      const u = rn();
      const t = rn();
      const k = rn();
      add(cx + (u - 0.5) * w, h, cz + (t - 0.5) * d, 1, h); // roof
      add(cx + (u - 0.5) * w, t * h, cz + d / 2, 1, t * h); // front
      add(cx + w / 2, t * h, cz + (u - 0.5) * d, k < 0.5 ? 1 : 0, t * h); // right
      add(cx - w / 2, t * h, cz + (u - 0.5) * d, k < 0.2 ? 1 : 0, t * h); // left
      add(cx + (u - 0.5) * w, t * h, cz - d / 2, 0, t * h); // rear
    }
  });

  return points;
}

const ALL_POINTS = generatePoints();

export default function CanvasViewer3D({ 
  viewMode = 'tex', 
  isFast = false, 
  confidenceHeatmap = false,
  warnOnInferred = true,
  onToast 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [mode, setMode] = useState(viewMode);
  const [fast, setFast] = useState(isFast);
  const [measuring, setMeasuring] = useState(false);
  const [pickedPoints, setPickedPoints] = useState([]);
  const [hudContent, setHudContent] = useState('Turn on Measure, then click two points on the model.');

  // Camera transforms & state stored in refs to avoid re-renders during high-freq drag
  const cameraRef = useRef({
    yaw: 0.6,
    pit: 0.55,
    zm: 1.0,
    dragging: null,
    moved: false,
    projected: []
  });

  // Keep mode & fast in sync with props
  useEffect(() => {
    setMode(viewMode);
  }, [viewMode]);

  useEffect(() => {
    setFast(isFast);
  }, [isFast]);

  // Update HUD text on changes
  useEffect(() => {
    if (!pickedPoints.length) {
      setHudContent(measuring ? 'Click two points on the model.' : 'Turn on Measure, then click two points on the model.');
      return;
    }
    if (pickedPoints.length === 1) {
      setHudContent('Point 1 set. Click a second point.');
      return;
    }
    const [a, b] = pickedPoints;
    const dist = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    const hasInferred = !a.v || !b.v;

    let msg = `<b>${dist.toFixed(1)} m</b> · ±${hasInferred ? '1.8' : '0.4'} m`;
    if (hasInferred && warnOnInferred) {
      msg += `<br><span style="color:var(--warn)">Warning: an endpoint is AI-inferred, so treat this as an estimate.</span>`;
    } else {
      msg += `<br><span style="color:var(--acc)">Both points verified by triangulation.</span>`;
    }
    setHudContent(msg);
  }, [pickedPoints, measuring, warnOnInferred]);

  const renderScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { yaw, pit, zm } = cameraRef.current;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const projectPoint = (p) => {
      const c = Math.cos(yaw);
      const s = Math.sin(yaw);
      const x = p.x * c - p.z * s;
      const z = p.x * s + p.z * c;
      const cp = Math.cos(pit);
      const sp = Math.sin(pit);
      const y = p.y * cp - z * sp;
      const d = p.y * sp + z * cp;
      return {
        x: W / 2 + (x * zm * W) / 115,
        y: H * 0.66 - (y * zm * W) / 115,
        d
      };
    };

    const sourcePoints = fast ? ALL_POINTS.filter((_, i) => i % 3 === 0) : ALL_POINTS;
    const projected = sourcePoints.map((p) => ({ p, q: projectPoint(p) })).sort((a, b) => a.q.d - b.q.d);
    cameraRef.current.projected = projected;

    const sz = fast ? 2.6 : 1.7;

    for (const { p, q } of projected) {
      let c;
      if (mode === 'conf' || confidenceHeatmap) {
        c = p.v ? '#0e6f68' : '#e0a02c';
      } else if (mode === 'pts') {
        c = '#4b5654';
      } else {
        const l = p.y === 0 ? 150 : 120 + p.h * 2.4;
        c = p.v
          ? `rgb(${Math.floor(l * 0.62)},${Math.floor(l * 0.7)},${Math.floor(l * 0.68)})`
          : `rgb(${Math.floor(l * 0.72)},${Math.floor(l * 0.7)},${Math.floor(l * 0.6)})`;
      }
      ctx.fillStyle = c;
      ctx.fillRect(q.x, q.y, sz, sz);
    }

    // Render picked points
    pickedPoints.forEach((k) => {
      const q = projectPoint(k);
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = k.v ? '#0e6f68' : '#c7811a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(q.x, q.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    // Render connecting measurement line
    if (pickedPoints.length === 2) {
      const a = projectPoint(pickedPoints[0]);
      const b = projectPoint(pickedPoints[1]);
      ctx.strokeStyle = '#17201f';
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [fast, mode, confidenceHeatmap, pickedPoints]);

  useEffect(() => {
    renderScene();
  }, [renderScene]);

  // Pointer interactions
  const handlePointerDown = (e) => {
    cameraRef.current.dragging = [e.clientX, e.clientY];
    cameraRef.current.moved = false;
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const cam = cameraRef.current;
    if (!cam.dragging) return;
    const dx = e.clientX - cam.dragging[0];
    const dy = e.clientY - cam.dragging[1];

    if (Math.abs(dx) + Math.abs(dy) > 3) cam.moved = true;

    cam.yaw += dx * 0.008;
    cam.pit = Math.max(0.15, Math.min(1.2, cam.pit + dy * 0.005));
    cam.dragging = [e.clientX, e.clientY];
    renderScene();
  };

  const handlePointerUp = (e) => {
    const cam = cameraRef.current;
    cam.dragging = null;

    if (!cam.moved && measuring) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let best = null;
      let bd = 1e9;
      for (const { p, q } of cam.projected) {
        const d = (q.x - mx) ** 2 + (q.y - my) ** 2;
        if (d < bd) {
          bd = d;
          best = p;
        }
      }

      if (bd < 400 && best) {
        setPickedPoints((prev) => {
          if (prev.length === 2) return [best];
          return [...prev, best];
        });
      }
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const cam = cameraRef.current;
    cam.zm = Math.max(0.6, Math.min(2.6, cam.zm * (e.deltaY < 0 ? 1.08 : 0.93)));
    renderScene();
  };

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      renderScene();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderScene]);

  const handleClearMeasurement = () => {
    setPickedPoints([]);
  };

  const toggleMeasure = () => {
    setMeasuring((prev) => !prev);
  };

  return (
    <div className="card" style={{ padding: '16px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 650, marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        3D model <span className="sub">Drag to rotate · scroll to zoom</span>
      </h2>

      {/* Control Tools Bar */}
      <div className="tools">
        <div className="seg" role="group" aria-label="View mode">
          <button 
            type="button" 
            className={mode === 'tex' ? 'on' : ''} 
            onClick={() => setMode('tex')}
          >
            Textured
          </button>
          <button 
            type="button" 
            className={mode === 'conf' ? 'on' : ''} 
            onClick={() => setMode('conf')}
          >
            Confidence
          </button>
          <button 
            type="button" 
            className={mode === 'pts' ? 'on' : ''} 
            onClick={() => setMode('pts')}
          >
            Points
          </button>
        </div>

        <div className="seg" role="group" aria-label="Path">
          <button 
            type="button" 
            className={!fast ? 'on' : ''} 
            onClick={() => {
              setFast(false);
              onToast && onToast('Accurate reconstruction model active');
            }}
          >
            Accurate
          </button>
          <button 
            type="button" 
            className={fast ? 'on' : ''} 
            onClick={() => {
              setFast(true);
              onToast && onToast('Fast preview: Gaussian splatting, rough geometry');
            }}
          >
            Fast preview
          </button>
        </div>

        <button 
          type="button" 
          className={`btn ${measuring ? 'p' : ''}`}
          onClick={toggleMeasure}
          aria-pressed={measuring}
        >
          Measure
        </button>

        <button 
          type="button" 
          className="btn"
          onClick={handleClearMeasurement}
        >
          Clear
        </button>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="vw" ref={containerRef} style={{ position: 'relative', background: '#eef1ef', borderRadius: '8px', overflow: 'hidden' }}>
        <canvas 
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
          style={{ display: 'block', width: '100%', height: '420px', cursor: 'grab', touchAction: 'none' }}
          aria-label="Interactive 3D model"
        />

        <div className="leg" style={{ position: 'absolute', right: '10px', top: '10px', background: 'rgba(255,255,255,.94)', border: '1px solid var(--line)', borderRadius: '8px', padding: '6px 10px', fontSize: '12px', display: 'flex', gap: '12px', zIndex: 2 }}>
          <span><i className="dot" style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', marginRight: '5px', background: '#0e6f68' }}></i>Verified</span>
          <span><i className="dot" style={{ display: 'inline-block', width: '9px', height: '9px', borderRadius: '50%', marginRight: '5px', background: '#e0a02c' }}></i>AI-inferred</span>
        </div>

        <div 
          className="hud" 
          style={{ position: 'absolute', left: '10px', bottom: '10px', background: 'rgba(255,255,255,.94)', border: '1px solid var(--line)', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', maxWidth: '300px', zIndex: 2 }}
          dangerouslySetInnerHTML={{ __html: hudContent }}
        />
      </div>
    </div>
  );
}
