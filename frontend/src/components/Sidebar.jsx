import React from 'react';
import { 
  Box, 
  Layers, 
  Plane, 
  Cpu, 
  Sliders, 
  FolderGit2, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Activity
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, onLogout, userEmail }) {
  const menuItems = [
    { id: 'surveys', label: 'Surveys & Missions', icon: Plane },
    { id: 'viewer', label: '3D Mesh & Splat Studio', icon: Box },
    { id: 'pipeline', label: 'Single-Pass Reconstruction', icon: Cpu },
    { id: 'datasets', label: 'Geo-Spatial Datasets', icon: FolderGit2 },
    { id: 'settings', label: 'Processing Config', icon: Sliders },
  ];

  return (
    <aside style={styles.sidebar}>
      {/* Brand Header */}
      <div style={styles.brandContainer}>
        <div style={styles.logoBadge}>
          <Layers size={22} color="#ffffff" strokeWidth={2.4} />
        </div>
        <div>
          <div style={styles.brandTitle}>EAGLE</div>
          <div style={styles.brandTagline}>Single-Pass 3D Engine</div>
        </div>
      </div>

      {/* System Status Pill */}
      <div style={styles.statusPill}>
        <span style={styles.statusDot}></span>
        <span style={styles.statusText}>GPU Cluster Online (8 Nodes)</span>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navSectionLabel}>WORKSPACES</div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                ...styles.navItem,
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 500,
              }}
            >
              <div style={styles.navItemLeft}>
                <Icon size={19} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} color="var(--primary)" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile & Logout */}
      <div style={styles.footerContainer}>
        <div style={styles.userCard}>
          <div style={styles.avatar}>
            {(userEmail || 'Drone Operator').charAt(0).toUpperCase()}
          </div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{userEmail?.split('@')[0] || 'Operator'}</div>
            <div style={styles.userRole}>
              <ShieldCheck size={12} color="var(--primary)" style={{ marginRight: 4 }} />
              Certified Pilot
            </div>
          </div>
        </div>

        <button onClick={onLogout} style={styles.logoutBtn} title="Sign Out">
          <LogOut size={16} />
          <span>Exit Session</span>
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '280px',
    height: '100vh',
    position: 'sticky',
    top: 0,
    backgroundColor: 'var(--bg-surface)',
    borderRight: '1px solid var(--border-light)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 18px',
    boxSizing: 'border-box',
    zIndex: 20,
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--border-light)',
  },
  logoBadge: {
    width: '38px',
    height: '38px',
    backgroundColor: 'var(--primary)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(14, 111, 104, 0.25)',
  },
  brandTitle: {
    fontSize: '18px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: 'var(--text-main)',
  },
  brandTagline: {
    fontSize: '11px',
    fontWeight: '500',
    color: 'var(--text-muted)',
    letterSpacing: '0.4px',
  },
  statusPill: {
    margin: '18px 0 14px 0',
    padding: '6px 12px',
    backgroundColor: '#eff8f5',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid rgba(14, 111, 104, 0.15)',
  },
  statusDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)',
  },
  statusText: {
    fontSize: '11px',
    color: 'var(--primary)',
    fontWeight: '600',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flexGrow: 1,
    marginTop: '6px',
  },
  navSectionLabel: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#8c9c99',
    marginBottom: '8px',
    paddingLeft: '10px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    fontSize: '13.5px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    transition: 'all 0.18s ease',
  },
  navItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  footerContainer: {
    borderTop: '1px solid var(--border-light)',
    paddingTop: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  userCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 10px',
    backgroundColor: 'var(--bg-subtle)',
    borderRadius: 'var(--radius-md)',
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px',
  },
  userInfo: {
    overflow: 'hidden',
  },
  userName: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--text-main)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  userRole: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '9px',
    borderRadius: 'var(--radius-md)',
    fontSize: '12.5px',
    fontWeight: '600',
    color: '#a33a3a',
    backgroundColor: '#fdf3f3',
    border: '1px solid rgba(220, 38, 38, 0.1)',
  }
};
