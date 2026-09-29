import React from 'react';
import { 
  Bell, 
  Search, 
  UploadCloud, 
  Sparkles, 
  HelpCircle,
  HardDriveDownload
} from 'lucide-react';

export default function Header({ title, subtitle, onOpenNewMission }) {
  return (
    <header style={styles.header}>
      <div>
        <h1 style={styles.title}>{title}</h1>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>

      <div style={styles.actions}>
        {/* Search */}
        <div style={styles.searchBox}>
          <Search size={16} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search missions, surveys, RTK tags..." 
            style={styles.searchInput}
          />
        </div>

        {/* Action Button */}
        <button style={styles.primaryButton} onClick={onOpenNewMission}>
          <UploadCloud size={17} />
          <span>Ingest Drone Flight</span>
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '28px 36px 20px 36px',
    backgroundColor: 'var(--bg-main)',
    borderBottom: '1px solid var(--border-light)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backdropFilter: 'blur(8px)',
  },
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: 'var(--text-main)',
    letterSpacing: '-0.4px',
  },
  subtitle: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-light)',
    padding: '8px 14px',
    borderRadius: 'var(--radius-md)',
    width: '280px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '13px',
    width: '100%',
    color: 'var(--text-main)',
    backgroundColor: 'transparent',
  },
  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    padding: '9px 18px',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    fontSize: '13.5px',
    boxShadow: '0 4px 14px rgba(14, 111, 104, 0.28)',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};
