import React from 'react';
import { 
  Box, 
  Layers, 
  Maximize2, 
  RotateCcw, 
  Eye, 
  Sliders, 
  Sparkles,
  Download,
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function ProjectCard({ project, onSelect, isSelected }) {
  const isComplete = project.status === 'Completed';

  return (
    <div 
      onClick={() => onSelect(project)}
      style={{
        ...styles.card,
        borderColor: isSelected ? 'var(--primary)' : 'var(--border-light)',
        boxShadow: isSelected ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        transform: isSelected ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* 3D Preview Banner */}
      <div 
        style={{
          ...styles.previewArea,
          background: project.previewGradient || 'var(--primary)',
        }}
      >
        <div style={styles.previewOverlay}>
          <div style={styles.badgeRow}>
            <span style={{
              ...styles.statusBadge,
              backgroundColor: isComplete ? 'rgba(16, 185, 129, 0.9)' : 'rgba(245, 158, 11, 0.9)',
              color: '#ffffff',
            }}>
              {isComplete ? <CheckCircle2 size={12} style={{marginRight: 4}} /> : <Clock size={12} style={{marginRight: 4}} />}
              {project.status}
            </span>
            <span style={styles.timeBadge}>{project.duration}</span>
          </div>

          <div style={styles.previewCenterIcon}>
            <Box size={36} color="rgba(255,255,255,0.75)" strokeWidth={1.4} />
          </div>

          <div style={styles.reconstructionPill}>
            <Sparkles size={11} color="#a7f3d0" />
            <span>{project.reconstructionQuality}</span>
          </div>
        </div>
      </div>

      {/* Body details */}
      <div style={styles.body}>
        <div style={styles.titleRow}>
          <h3 style={styles.name}>{project.name}</h3>
          <span style={styles.date}>{project.date}</span>
        </div>
        <p style={styles.site}>{project.site}</p>

        {/* Technical specs grid */}
        <div style={styles.specsGrid}>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>PLATFORM</span>
            <span style={styles.specValue}>{project.droneModel}</span>
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>GS RESOLUTION</span>
            <span style={styles.specValue}>{project.groundResolution}</span>
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>CLOUD POINTS</span>
            <span style={styles.specValue}>{project.denseCloudPoints}</span>
          </div>
          <div style={styles.specItem}>
            <span style={styles.specLabel}>IMAGES</span>
            <span style={styles.specValue}>{project.imagesCaptured} frames</span>
          </div>
        </div>

        {/* Tags */}
        <div style={styles.tagsContainer}>
          {project.tags.map((tag, idx) => (
            <span key={idx} style={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Action strip */}
        <div style={styles.cardFooter}>
          <button style={styles.actionBtn}>
            <Eye size={14} />
            <span>Inspect 3D</span>
          </button>
          <button style={styles.iconBtn} title="Export mesh">
            <Download size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-light)',
    overflow: 'hidden',
    transition: 'all 0.22s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  previewArea: {
    height: '160px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewOverlay: {
    position: 'absolute',
    inset: 0,
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  badgeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    backdropFilter: 'blur(4px)',
  },
  timeBadge: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: '3px 8px',
    borderRadius: '6px',
    backdropFilter: 'blur(4px)',
  },
  previewCenterIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reconstructionPill: {
    backgroundColor: 'rgba(14, 111, 104, 0.85)',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '6px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backdropFilter: 'blur(6px)',
    maxWidth: 'fit-content',
  },
  body: {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontSize: '15.5px',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  date: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  site: {
    fontSize: '12.5px',
    color: 'var(--text-muted)',
    marginTop: '3px',
    marginBottom: '14px',
  },
  specsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    padding: '12px',
    backgroundColor: 'var(--bg-subtle)',
    borderRadius: 'var(--radius-md)',
    marginBottom: '14px',
  },
  specItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  specLabel: {
    fontSize: '9.5px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.6px',
  },
  specValue: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--text-main)',
    marginTop: '2px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '16px',
  },
  tag: {
    fontSize: '10.5px',
    padding: '3px 8px',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-subtle)',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    borderTop: '1px solid var(--border-light)',
    paddingTop: '12px',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12.5px',
    fontWeight: '600',
    color: 'var(--primary)',
    padding: '6px 12px',
    borderRadius: '6px',
    backgroundColor: 'var(--primary-light)',
  },
  iconBtn: {
    padding: '6px 10px',
    borderRadius: '6px',
    color: 'var(--text-muted)',
    border: '1px solid var(--border-light)',
    display: 'flex',
    alignItems: 'center',
  }
};
