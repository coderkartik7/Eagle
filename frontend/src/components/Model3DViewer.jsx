import React, { useState } from 'react';
import { 
  Box, 
  RotateCw, 
  Maximize2, 
  Layers, 
  Sliders, 
  Eye, 
  Compass, 
  SunMedium, 
  Grid,
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

export default function Model3DViewer({ project }) {
  const [renderMode, setRenderMode] = useState('splat'); // 'splat' | 'mesh' | 'dense' | 'dem'
  const [wireframe, setWireframe] = useState(false);
  const [elevationColor, setElevationColor] = useState(true);

  if (!project) return null;

  return (
    <div style={styles.container}>
      {/* Top Controller Bar */}
      <div style={styles.topBar}>
        <div style={styles.metaInfo}>
          <div style={styles.badge}>ACTIVE INSPECTION</div>
          <h2 style={styles.projectName}>{project.name}</h2>
          <span style={styles.projectSite}>• {project.site}</span>
        </div>

        {/* View Switchers */}
        <div style={styles.toggleGroup}>
          <button 
            onClick={() => setRenderMode('splat')}
            style={{
              ...styles.toggleBtn,
              backgroundColor: renderMode === 'splat' ? 'var(--primary)' : 'transparent',
              color: renderMode === 'splat' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            3D Gaussian Splats
          </button>
          <button 
            onClick={() => setRenderMode('mesh')}
            style={{
              ...styles.toggleBtn,
              backgroundColor: renderMode === 'mesh' ? 'var(--primary)' : 'transparent',
              color: renderMode === 'mesh' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Textured Mesh
          </button>
          <button 
            onClick={() => setRenderMode('dense')}
            style={{
              ...styles.toggleBtn,
              backgroundColor: renderMode === 'dense' ? 'var(--primary)' : 'transparent',
              color: renderMode === 'dense' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Point Cloud ({project.denseCloudPoints})
          </button>
        </div>

        <div style={styles.actions}>
          <button style={styles.actionIconBtn} title="Download Point Cloud LAS / OBJ">
            <Download size={16} />
          </button>
          <button style={styles.actionIconBtn} title="Share Link">
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Mock Area */}
      <div style={styles.canvasArea}>
        {/* Dynamic Canvas Simulation */}
        <div style={styles.canvasBackground}>
          {/* Mock 3D Grid Planes */}
          <div style={styles.gridOverlay}></div>

          {/* Center 3D Object Illustration */}
          <div style={styles.modelObjectContainer}>
            <div style={styles.orbitalRing}></div>
            <div style={styles.orbitalRing2}></div>

            <div style={styles.core3DObject}>
              <Box size={84} color="#0e6f68" strokeWidth={1.2} style={styles.spinningBox} />
            </div>

            <div style={styles.floatingTag}>
              <Sparkles size={13} color="var(--primary)" />
              <span>Single-Pass Radiance Field Synthesized</span>
            </div>
          </div>

          {/* Compass & Orientation Gizmo */}
          <div style={styles.orientationGizmo}>
            <div style={styles.gizmoCircle}>
              <Compass size={24} color="var(--primary)" />
              <span style={styles.gizmoNorth}>N</span>
            </div>
            <div style={styles.scaleBar}>Scale: 1m = 100px</div>
          </div>

          {/* HUD Overlay Stats */}
          <div style={styles.hudOverlay}>
            <div style={styles.hudStat}>
              <span style={styles.hudLabel}>CAMERA TRAJECTORY</span>
              <span style={styles.hudValue}>{project.captureType}</span>
            </div>
            <div style={styles.hudStat}>
              <span style={styles.hudLabel}>ALTITUDE</span>
              <span style={styles.hudValue}>{project.flightAltitude}</span>
            </div>
            <div style={styles.hudStat}>
              <span style={styles.hudLabel}>PRECISION</span>
              <span style={styles.hudValue}>{project.groundResolution}</span>
            </div>
            <div style={styles.hudStat}>
              <span style={styles.hudLabel}>SURFACE MESH</span>
              <span style={styles.hudValue}>{project.meshTriangles} polys</span>
            </div>
          </div>

          {/* Bottom Floating Control Bar */}
          <div style={styles.floatingControls}>
            <button 
              onClick={() => setWireframe(!wireframe)}
              style={{
                ...styles.controlPill,
                backgroundColor: wireframe ? 'var(--primary)' : 'rgba(255,255,255,0.9)',
                color: wireframe ? '#ffffff' : 'var(--text-main)',
              }}
            >
              <Grid size={15} />
              <span>Wireframe: {wireframe ? 'ON' : 'OFF'}</span>
            </button>

            <button 
              onClick={() => setElevationColor(!elevationColor)}
              style={{
                ...styles.controlPill,
                backgroundColor: elevationColor ? 'var(--primary)' : 'rgba(255,255,255,0.9)',
                color: elevationColor ? '#ffffff' : 'var(--text-main)',
              }}
            >
              <SunMedium size={15} />
              <span>False-Color Elevation: {elevationColor ? 'ACTIVE' : 'OFF'}</span>
            </button>

            <button style={styles.controlPill}>
              <RotateCw size={15} />
              <span>Reset Camera</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-card)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '28px',
  },
  topBar: {
    padding: '16px 22px',
    borderBottom: '1px solid var(--border-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '14px',
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  badge: {
    fontSize: '9.5px',
    fontWeight: '800',
    backgroundColor: 'var(--primary-light)',
    color: 'var(--primary)',
    padding: '3px 8px',
    borderRadius: '4px',
    letterSpacing: '0.6px',
  },
  projectName: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  projectSite: {
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
  toggleGroup: {
    display: 'flex',
    backgroundColor: 'var(--bg-subtle)',
    padding: '3px',
    borderRadius: 'var(--radius-md)',
    gap: '2px',
  },
  toggleBtn: {
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.18s ease',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  actionIconBtn: {
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasArea: {
    height: '420px',
    position: 'relative',
    backgroundColor: '#0c1211',
    overflow: 'hidden',
  },
  canvasBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle at center, #162a26 0%, #08100f 100%)',
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(14, 111, 104, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(14, 111, 104, 0.12) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    perspective: '600px',
    transform: 'rotateX(55deg) translateY(-20px)',
  },
  modelObjectContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  orbitalRing: {
    position: 'absolute',
    width: '260px',
    height: '260px',
    borderRadius: '50%',
    border: '1px dashed rgba(14, 111, 104, 0.4)',
    transform: 'rotateX(68deg) rotateY(15deg)',
    animation: 'spin 20s linear infinite',
  },
  orbitalRing2: {
    position: 'absolute',
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    border: '1px solid rgba(16, 185, 129, 0.25)',
    transform: 'rotateX(40deg) rotateZ(30deg)',
  },
  core3DObject: {
    backgroundColor: 'rgba(14, 111, 104, 0.15)',
    padding: '24px',
    borderRadius: '24px',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(14, 111, 104, 0.3)',
    boxShadow: '0 0 50px rgba(14, 111, 104, 0.35)',
  },
  floatingTag: {
    marginTop: '22px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: 'var(--text-main)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '11.5px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  orientationGizmo: {
    position: 'absolute',
    top: '18px',
    right: '18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
    zIndex: 6,
  },
  gizmoCircle: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
  },
  gizmoNorth: {
    position: 'absolute',
    top: '2px',
    fontSize: '9px',
    fontWeight: '800',
    color: '#ef4444',
  },
  scaleBar: {
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'var(--font-mono)',
  },
  hudOverlay: {
    position: 'absolute',
    top: '18px',
    left: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    zIndex: 6,
  },
  hudStat: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    backdropFilter: 'blur(6px)',
    padding: '6px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  hudLabel: {
    fontSize: '8.5px',
    fontWeight: '700',
    color: '#8ec5be',
    letterSpacing: '0.6px',
  },
  hudValue: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#ffffff',
  },
  floatingControls: {
    position: 'absolute',
    bottom: '18px',
    display: 'flex',
    gap: '10px',
    zIndex: 6,
  },
  controlPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    borderRadius: '24px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.15)',
  }
};
