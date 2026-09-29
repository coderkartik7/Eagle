import React, { useState } from 'react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import Model3DViewer from '../components/Model3DViewer';
import { mockProjects, systemMetrics, singlePassPipelineSteps } from '../data/mockData';
import { 
  Plus, 
  Activity, 
  HardDrive, 
  Cpu, 
  Clock, 
  Sliders, 
  CheckCircle,
  FileCheck,
  Compass,
  UploadCloud,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

export default function Dashboard({ userEmail, activeTab, onSelectTab }) {
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [filterTag, setFilterTag] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMissionName, setNewMissionName] = useState('');
  const [newDroneModel, setNewDroneModel] = useState('DJI Matrice 350 RTK');
  const [newSite, setNewSite] = useState('');

  const filterOptions = ['All', 'Single-Pass', 'Infrastructure', 'Asset Inspection', 'Preservation'];

  const filteredProjects = filterTag === 'All' 
    ? projects 
    : projects.filter(p => p.tags.includes(filterTag));

  const handleCreateMission = (e) => {
    e.preventDefault();
    if (!newMissionName.trim()) return;

    const newProj = {
      id: `proj-${Date.now().toString().slice(-4)}`,
      name: newMissionName,
      site: newSite || 'Custom Drone Sector Grid',
      droneModel: newDroneModel,
      status: 'Processing',
      flightAltitude: '55m AGL',
      captureType: 'Autonomous Single-Pass Sweep',
      imagesCaptured: 340,
      groundResolution: '1.1 cm/px',
      duration: '16m 30s',
      reconstructionQuality: 'Gaussian Splatting (Queued)',
      denseCloudPoints: 'Calculating...',
      meshTriangles: 'Pending',
      date: new Date().toISOString().split('T')[0],
      previewGradient: 'linear-gradient(135deg, #0e6f68 0%, #06312e 100%)',
      tags: ['Single-Pass', 'Queued', 'RTK-Locked']
    };

    setProjects([newProj, ...projects]);
    setSelectedProject(newProj);
    setIsModalOpen(false);
    setNewMissionName('');
    setNewSite('');
  };

  return (
    <div style={styles.dashboardContainer}>
      <Header 
        title="Mission Operations & 3D Reconstruction" 
        subtitle="Single-Pass photogrammetry, Gaussian Radiance fields & metric inspection."
        onOpenNewMission={() => setIsModalOpen(true)}
      />

      <main style={styles.content}>
        {/* Metric Badges Banner */}
        <div style={styles.metricGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricIconWrap}>
              <Activity size={18} color="var(--primary)" />
            </div>
            <div>
              <div style={styles.metricLabel}>SURVEYS RECONSTRUCTED</div>
              <div style={styles.metricVal}>{systemMetrics.totalSurveys} missions</div>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricIconWrap}>
              <Clock size={18} color="var(--primary)" />
            </div>
            <div>
              <div style={styles.metricLabel}>PROCESSING LATENCY</div>
              <div style={styles.metricVal}>{systemMetrics.pipelineLatency}</div>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricIconWrap}>
              <Cpu size={18} color="var(--primary)" />
            </div>
            <div>
              <div style={styles.metricLabel}>GPU WORKERS</div>
              <div style={styles.metricVal}>{systemMetrics.activeGpuClusters}</div>
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricIconWrap}>
              <HardDrive size={18} color="var(--primary)" />
            </div>
            <div>
              <div style={styles.metricLabel}>STORAGE QUOTA</div>
              <div style={styles.metricVal}>{systemMetrics.storageUsed}</div>
            </div>
          </div>
        </div>

        {/* 3D Model Studio Viewer */}
        <Model3DViewer project={selectedProject} />

        {/* Pipeline Architecture Stage Strip (Single Pass Pipeline) */}
        <div style={styles.pipelineSection}>
          <div style={styles.pipelineHeader}>
            <div style={styles.pipelineTitleRow}>
              <span style={styles.pipelineBadge}>AUTOMATED PIPELINE</span>
              <h3 style={styles.pipelineHeading}>Single-Pass Neural Reconstruction Pipeline</h3>
            </div>
            <span style={styles.pipelineSub}>No cross-hatching or multi-angle hovering required</span>
          </div>

          <div style={styles.pipelineStepsRow}>
            {singlePassPipelineSteps.map((step, idx) => (
              <div key={step.step} style={styles.pipelineStepBlock}>
                <div style={styles.stepIndicator}>
                  <div style={styles.stepBubble}>{step.step}</div>
                  {idx < singlePassPipelineSteps.length - 1 && <div style={styles.stepConnector}></div>}
                </div>
                <div style={styles.stepTextContent}>
                  <h4 style={styles.stepTitle}>{step.title}</h4>
                  <p style={styles.stepDescription}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter and Survey Grid */}
        <div style={styles.surveysSection}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Reconstructed Missions & Scans</h2>
              <p style={styles.sectionSubtitle}>Select any flight pass to inspect point cloud and surface geometry</p>
            </div>

            <div style={styles.filterPills}>
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterTag(filter)}
                  style={{
                    ...styles.filterPill,
                    backgroundColor: filterTag === filter ? 'var(--primary)' : 'var(--bg-surface)',
                    color: filterTag === filter ? '#ffffff' : 'var(--text-muted)',
                    borderColor: filterTag === filter ? 'var(--primary)' : 'var(--border-light)'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Projects */}
          <div style={styles.projectGrid}>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                isSelected={selectedProject?.id === project.id}
                onSelect={(proj) => {
                  setSelectedProject(proj);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* New Flight Pass Ingestion Modal */}
      {isModalOpen && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalCard}>
            <div style={styles.modalHeader}>
              <div>
                <h3 style={styles.modalTitle}>Ingest Drone Flight Telemetry</h3>
                <p style={styles.modalSubtitle}>Initialize single-pass 3D reconstruction</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={styles.closeBtn}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateMission} style={styles.modalForm}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>MISSION NAME</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Solar Array Inspection Grid 5"
                  value={newMissionName}
                  onChange={(e) => setNewMissionName(e.target.value)}
                  style={styles.modalInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>SURVEY SITE / SECTOR</label>
                <input 
                  type="text" 
                  placeholder="e.g. West Perimeter Terminal B"
                  value={newSite}
                  onChange={(e) => setNewSite(e.target.value)}
                  style={styles.modalInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>DRONE PLATFORM & SENSOR</label>
                <select 
                  value={newDroneModel}
                  onChange={(e) => setNewDroneModel(e.target.value)}
                  style={styles.modalInput}
                >
                  <option value="DJI Matrice 350 RTK">DJI Matrice 350 RTK (Full-Frame Zenmuse P1)</option>
                  <option value="Skydio X10">Skydio X10 (Autonomous Photogrammetry)</option>
                  <option value="WingtraOne Gen II">WingtraOne Gen II (VTOL High Precision)</option>
                  <option value="DJI Mavic 3 Enterprise">DJI Mavic 3 Enterprise (Compact Survey)</option>
                </select>
              </div>

              <div style={styles.dropZone}>
                <UploadCloud size={28} color="var(--primary)" />
                <span style={styles.dropText}>Drag drone geotagged photos (.JPG / .DNG) or flight CSV logs</span>
                <span style={styles.dropSub}>RTK base station observations automatically synchronized</span>
              </div>

              <div style={styles.modalActions}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.submitModalBtn}>
                  Start 3D Reconstruction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-main)',
  },
  content: {
    padding: '30px 36px 60px 36px',
    maxWidth: '1440px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  metricGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '18px',
    marginBottom: '28px',
  },
  metricCard: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-light)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    boxShadow: 'var(--shadow-subtle)',
  },
  metricIconWrap: {
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    backgroundColor: 'var(--primary-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.6px',
  },
  metricVal: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--text-main)',
    marginTop: '2px',
  },
  pipelineSection: {
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-light)',
    padding: '24px',
    marginBottom: '32px',
    boxShadow: 'var(--shadow-card)',
  },
  pipelineHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid var(--border-light)',
    paddingBottom: '14px',
  },
  pipelineTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  pipelineBadge: {
    fontSize: '9.5px',
    fontWeight: '800',
    backgroundColor: 'var(--primary-light)',
    color: 'var(--primary)',
    padding: '3px 8px',
    borderRadius: '4px',
    letterSpacing: '0.6px',
  },
  pipelineHeading: {
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  pipelineSub: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  pipelineStepsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
  },
  pipelineStepBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  stepIndicator: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    position: 'relative',
  },
  stepBubble: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepConnector: {
    position: 'absolute',
    left: '28px',
    right: '-16px',
    height: '2px',
    backgroundColor: 'var(--primary-light)',
    zIndex: 1,
  },
  stepTextContent: {
    paddingRight: '6px',
  },
  stepTitle: {
    fontSize: '12.5px',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '4px',
  },
  stepDescription: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    lineHeight: 1.45,
  },
  surveysSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  sectionSubtitle: {
    fontSize: '12.5px',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  filterPills: {
    display: 'flex',
    gap: '8px',
  },
  filterPill: {
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.16s ease',
  },
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
    gap: '22px',
  },
  modalBackdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(18, 25, 24, 0.45)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '20px',
  },
  modalCard: {
    backgroundColor: 'var(--bg-surface)',
    width: '100%',
    maxWidth: '520px',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    boxShadow: 'var(--shadow-hover)',
    border: '1px solid var(--border-light)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  modalSubtitle: {
    fontSize: '12.5px',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  closeBtn: {
    padding: '6px',
    borderRadius: '6px',
    color: 'var(--text-muted)',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  inputLabel: {
    fontSize: '10.5px',
    fontWeight: '700',
    letterSpacing: '0.6px',
    color: 'var(--text-muted)',
  },
  modalInput: {
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-light)',
    fontSize: '13.5px',
    outline: 'none',
    backgroundColor: 'var(--bg-subtle)',
    color: 'var(--text-main)',
  },
  dropZone: {
    border: '2px dashed var(--border-light)',
    borderRadius: 'var(--radius-md)',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--bg-subtle)',
    textAlign: 'center',
    margin: '6px 0',
  },
  dropText: {
    fontSize: '12.5px',
    fontWeight: '600',
    color: 'var(--text-main)',
  },
  dropSub: {
    fontSize: '11px',
    color: 'var(--text-muted)',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px',
  },
  cancelBtn: {
    padding: '10px 18px',
    borderRadius: 'var(--radius-md)',
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-muted)',
    backgroundColor: 'var(--bg-subtle)',
  },
  submitModalBtn: {
    padding: '10px 20px',
    borderRadius: 'var(--radius-md)',
    fontSize: '13px',
    fontWeight: '700',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(14, 111, 104, 0.3)',
  }
};
