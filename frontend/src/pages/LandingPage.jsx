import React, { useState } from 'react';
import { 
  Layers, 
  ArrowRight, 
  Plane, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Database,
  Crosshair,
  Lock,
  Mail,
  Zap,
  Globe
} from 'lucide-react';
import { singlePassPipelineSteps } from '../data/mockData';

export default function LandingPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('pilot@eagle-recon.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(email || 'pilot@eagle-recon.ai');
    }, 450);
  };

  return (
    <div style={styles.container}>
      {/* Top Navbar */}
      <header style={styles.navBar}>
        <div style={styles.brandRow}>
          <div style={styles.logoBadge}>
            <Layers size={22} color="#ffffff" strokeWidth={2.4} />
          </div>
          <span style={styles.brandTitle}>EAGLE</span>
          <span style={styles.versionPill}>v0.1 Prototype</span>
        </div>

        <div style={styles.navLinks}>
          <span style={styles.navLink}>Single-Pass Architecture</span>
          <span style={styles.navLink}>Photogrammetry vs Splatting</span>
          <span style={styles.navLink}>Docs</span>
        </div>
      </header>

      {/* Hero Section + Login Split */}
      <main style={styles.heroSection}>
        {/* Left Column: Hero Content */}
        <div style={styles.heroContent}>
          <div style={styles.heroTag}>
            <Crosshair size={14} color="var(--primary)" />
            <span>Autonomous Drone Photogrammetry & Volumetrics</span>
          </div>

          <h1 style={styles.headline}>
            Instant 3D models from a <span style={styles.highlightText}>single drone pass</span>.
          </h1>

          <p style={styles.description}>
            Eliminate tedious cross-hatch flight grids and hours of battery swapping.
            Eagle reconstructs high-fidelity 3D meshes, Gaussian splats, and volumetric 
            DEMs straight from continuous single-trajectory drone imagery.
          </p>

          <div style={styles.statGrid}>
            <div style={styles.statItem}>
              <span style={styles.statNum}>65%</span>
              <span style={styles.statLabel}>Flight Time Saved</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNum}>&lt; 5 min</span>
              <span style={styles.statLabel}>Cloud Point Synthesis</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNum}>±1.2 cm</span>
              <span style={styles.statLabel}>RTK Georeference Accuracy</span>
            </div>
          </div>

          {/* Architecture Preview Cards */}
          <div style={styles.pipelineHighlight}>
            <h4 style={styles.pipelineHighlightTitle}>The Single-Pass Advantage</h4>
            <div style={styles.stepsList}>
              {singlePassPipelineSteps.slice(0, 3).map((item) => (
                <div key={item.step} style={styles.stepMiniCard}>
                  <span style={styles.stepNum}>{item.step}</span>
                  <div>
                    <h5 style={styles.stepHead}>{item.title}</h5>
                    <p style={styles.stepDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Clean Login Card */}
        <div style={styles.loginCardContainer}>
          <div style={styles.loginCard}>
            <div style={styles.loginCardHeader}>
              <h2 style={styles.loginTitle}>Operator Access</h2>
              <p style={styles.loginSubtitle}>Sign in to launch or inspect drone reconstruction missions</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>OPERATOR EMAIL</label>
                <div style={styles.inputWrapper}>
                  <Mail size={16} color="var(--text-muted)" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@organization.com"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>FLIGHT API TOKEN / PASSWORD</label>
                <div style={styles.inputWrapper}>
                  <Lock size={16} color="var(--text-muted)" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.loginOptionRow}>
                <label style={styles.rememberLabel}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                  <span>Remember RTK credentials</span>
                </label>
                <span style={styles.forgotLink}>Reset Token</span>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                style={styles.submitBtn}
              >
                <span>{isSubmitting ? 'Authenticating Telemetry...' : 'Enter Eagle Dashboard'}</span>
                <ArrowRight size={17} />
              </button>
            </form>

            <div style={styles.loginDemoNotice}>
              <div style={styles.demoNoticeHeader}>
                <Zap size={14} color="var(--primary)" />
                <span>Prototype Quick-Start</span>
              </div>
              <p style={styles.demoNoticeText}>
                Pre-configured for local testing. Click "Enter Eagle Dashboard" to explore interactive 3D missions, Gaussian Splats, and mock flight telemetry.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-main)',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `
      radial-gradient(circle at 15% 10%, rgba(14, 111, 104, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 85% 60%, rgba(14, 111, 104, 0.06) 0%, transparent 45%)
    `,
  },
  navBar: {
    padding: '24px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--border-light)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoBadge: {
    width: '38px',
    height: '38px',
    backgroundColor: 'var(--primary)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(14, 111, 104, 0.3)',
  },
  brandTitle: {
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: 'var(--text-main)',
  },
  versionPill: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--primary)',
    backgroundColor: 'var(--primary-light)',
    padding: '3px 8px',
    borderRadius: '20px',
    marginLeft: '6px',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    fontSize: '13.5px',
    fontWeight: '600',
    color: 'var(--text-muted)',
  },
  navLink: {
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  heroSection: {
    flexGrow: 1,
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '60px 40px',
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.9fr',
    gap: '60px',
    alignItems: 'center',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  heroTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-light)',
    padding: '6px 14px',
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--primary)',
    width: 'fit-content',
    marginBottom: '20px',
    boxShadow: 'var(--shadow-subtle)',
  },
  headline: {
    fontSize: '44px',
    fontWeight: '800',
    lineHeight: 1.18,
    color: 'var(--text-main)',
    letterSpacing: '-1px',
    marginBottom: '20px',
  },
  highlightText: {
    color: 'var(--primary)',
    position: 'relative',
  },
  description: {
    fontSize: '16px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    maxWidth: '560px',
    marginBottom: '32px',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '40px',
  },
  statItem: {
    backgroundColor: 'var(--bg-surface)',
    padding: '16px 20px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-subtle)',
    display: 'flex',
    flexDirection: 'column',
  },
  statNum: {
    fontSize: '24px',
    fontWeight: '800',
    color: 'var(--primary)',
  },
  statLabel: {
    fontSize: '11.5px',
    fontWeight: '600',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  pipelineHighlight: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: 'var(--shadow-subtle)',
  },
  pipelineHighlightTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--text-main)',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: '14px',
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  stepMiniCard: {
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
  },
  stepNum: {
    fontSize: '11px',
    fontWeight: '800',
    color: 'var(--primary)',
    backgroundColor: 'var(--primary-light)',
    padding: '3px 8px',
    borderRadius: '6px',
    fontFamily: 'var(--font-mono)',
  },
  stepHead: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  stepDesc: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  loginCardContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  loginCard: {
    width: '100%',
    maxWidth: '430px',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-light)',
    padding: '36px 32px',
    boxShadow: 'var(--shadow-hover)',
  },
  loginCardHeader: {
    marginBottom: '26px',
  },
  loginTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  loginSubtitle: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    marginTop: '6px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '10.5px',
    fontWeight: '700',
    letterSpacing: '0.8px',
    color: 'var(--text-muted)',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-md)',
    padding: '11px 14px',
    backgroundColor: 'var(--bg-subtle)',
    transition: 'border-color 0.2s',
  },
  input: {
    border: 'none',
    outline: 'none',
    width: '100%',
    backgroundColor: 'transparent',
    fontSize: '13.5px',
    color: 'var(--text-main)',
  },
  loginOptionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
  },
  rememberLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  forgotLink: {
    color: 'var(--primary)',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    padding: '13px',
    borderRadius: 'var(--radius-md)',
    fontWeight: '700',
    fontSize: '14px',
    marginTop: '8px',
    boxShadow: '0 4px 16px rgba(14, 111, 104, 0.35)',
  },
  loginDemoNotice: {
    marginTop: '24px',
    padding: '14px',
    backgroundColor: 'var(--bg-subtle)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid rgba(14, 111, 104, 0.1)',
  },
  demoNoticeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11.5px',
    fontWeight: '700',
    color: 'var(--primary)',
    marginBottom: '4px',
  },
  demoNoticeText: {
    fontSize: '11.5px',
    color: 'var(--text-muted)',
    lineHeight: 1.45,
  }
};
