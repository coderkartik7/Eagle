import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  FileVideo, 
  Cpu, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Layers, 
  ShieldCheck,
  Plane,
  Camera,
  ArrowRight
} from 'lucide-react';
import { processingStepsSimulation } from '../data/missionData';

export default function VideoUploadProcessing({ onProcessingComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // 10-second processing animation lifecycle
  useEffect(() => {
    if (!isProcessing) return;

    const totalSteps = processingStepsSimulation.length;
    const totalDurationMs = 10000;
    const intervalMs = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += intervalMs;
      const progress = Math.min(100, Math.round((elapsed / totalDurationMs) * 100));
      setProgressPercent(progress);

      const stepIndex = Math.min(
        totalSteps - 1,
        Math.floor((elapsed / totalDurationMs) * totalSteps)
      );
      setCurrentStepIndex(stepIndex);

      if (elapsed >= totalDurationMs) {
        clearInterval(interval);
        setTimeout(() => {
          onProcessingComplete({
            fileName: selectedFile?.name || 'op0927_4k.mp4',
            fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024 * 1024)).toFixed(1)} GB` : '2.1 GB'
          });
        }, 500);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isProcessing, onProcessingComplete, selectedFile]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const startReconstruction = (e) => {
    e?.preventDefault();
    setIsProcessing(true);
    setProgressPercent(0);
    setCurrentStepIndex(0);
  };

  const loadDemoFile = () => {
    setSelectedFile({
      name: 'op0927_4k.mp4',
      size: 2.1 * 1024 * 1024 * 1024
    });
  };

  return (
    <div style={styles.wrapper}>
      {/* Top Banner */}
      <header style={styles.header}>
        <div style={styles.brandRow}>
          <img src="/logo.png" alt="Eagle" style={styles.logoImg} />
          <span style={styles.badgePill}>v0.1 Prototype</span>
        </div>
        <div style={styles.headerStatus}>
          <span style={styles.statusDot}></span>
          <span>GPU Workers Ready (8x H100)</span>
        </div>
      </header>

      <main style={styles.mainContainer}>
        {!isProcessing ? (
          /* Upload State */
          <div style={styles.uploadCard}>
            <div style={styles.cardHeader}>
              <h1 style={styles.title}>Single-Pass Flight Video Ingestion</h1>
              <p style={styles.subtitle}>
                Upload raw drone video footage (MP4, MOV) and optional telemetry logs. 
                Eagle's pipeline transforms continuous single-pass sweeps into metric 3D models.
              </p>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                ...styles.dropZone,
                borderColor: isDragOver ? 'var(--acc)' : 'var(--line)',
                backgroundColor: isDragOver ? 'var(--accs)' : 'var(--bg)'
              }}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept="video/*,.mp4,.mov,.mkv" 
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              
              <div style={styles.uploadIconWrap}>
                <Upload size={28} color="var(--acc)" />
              </div>

              {selectedFile ? (
                <div style={styles.fileSelectedInfo}>
                  <div style={styles.fileNameRow}>
                    <FileVideo size={18} color="var(--acc)" />
                    <span style={styles.fileName}>{selectedFile.name}</span>
                  </div>
                  <span style={styles.fileSize}>
                    {(selectedFile.size / (1024 * 1024 * 1024)).toFixed(2)} GB • Ready to reconstruct
                  </span>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={styles.dropMainText}>Drop drone flight video here, or <span style={{ color: 'var(--acc)', textDecoration: 'underline' }}>browse</span></div>
                  <div style={styles.dropSubText}>Supports 4K/UHD, 1080p 60fps, DJI D-Log, RTK synchronized feeds</div>
                </div>
              )}
            </div>

            {/* Quick Demo Pre-load */}
            <div style={styles.demoPromptRow}>
              <span style={{ color: 'var(--mute)', fontSize: '12px' }}>No video handy?</span>
              <button type="button" onClick={loadDemoFile} style={styles.demoBtn}>
                Load sample single-pass dataset (OP-0927 Riverside 4K)
              </button>
            </div>

            {/* Ingestion Parameters */}
            <div style={styles.specsGrid}>
              <div style={styles.specBox}>
                <Camera size={16} color="var(--acc)" />
                <div>
                  <span style={styles.specLabel}>CAMERA & SENSOR</span>
                  <div style={styles.specVal}>Auto-calibrated (COLMAP)</div>
                </div>
              </div>

              <div style={styles.specBox}>
                <Plane size={16} color="var(--acc)" />
                <div>
                  <span style={styles.specLabel}>TRAJECTORY RECON</span>
                  <div style={styles.specVal}>Single Continuous Pass</div>
                </div>
              </div>

              <div style={styles.specBox}>
                <ShieldCheck size={16} color="var(--acc)" />
                <div>
                  <span style={styles.specLabel}>ACCURACY TARGET</span>
                  <div style={styles.specVal}>Metric (Sub-meter georef)</div>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <button
              onClick={startReconstruction}
              style={styles.launchBtn}
            >
              <span>Initialize Pipeline & Synthesize 3D Model</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Processing State (10-second simulation) */
          <div style={styles.processingCard}>
            <div style={styles.processingHeader}>
              <div style={styles.processingSpinnerBadge}>
                <Loader2 size={24} color="var(--acc)" style={{ animation: 'spin 1.5s linear infinite' }} />
              </div>
              <h2 style={styles.processingTitle}>Reconstructing 3D Spatial Geometry</h2>
              <p style={styles.processingSub}>
                Executing neural structure-from-motion & Gaussian splatting on single-pass capture...
              </p>
            </div>

            {/* Progress Bar */}
            <div style={styles.progressContainer}>
              <div style={styles.progressLabelRow}>
                <span style={styles.stepCounterText}>
                  Stage {currentStepIndex + 1} of {processingStepsSimulation.length}: {processingStepsSimulation[currentStepIndex].stage}
                </span>
                <span style={styles.progressPercentText}>{progressPercent}%</span>
              </div>
              <div style={styles.progressBarBg}>
                <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }} />
              </div>
            </div>

            {/* Active Stage Callout */}
            <div style={styles.activeStageBanner}>
              <div style={styles.stageDotActive}></div>
              <div>
                <div style={styles.activeStageTitle}>
                  {processingStepsSimulation[currentStepIndex].desc}
                </div>
                <div style={styles.activeStageDetail}>
                  {processingStepsSimulation[currentStepIndex].detail}
                </div>
              </div>
            </div>

            {/* Stage List Checklist */}
            <div style={styles.stagesFlowList}>
              {processingStepsSimulation.map((step, idx) => {
                const isComplete = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div 
                    key={step.stage} 
                    style={{
                      ...styles.stageRowItem,
                      opacity: idx > currentStepIndex ? 0.45 : 1,
                      backgroundColor: isCurrent ? 'var(--accs)' : 'transparent'
                    }}
                  >
                    <div style={styles.stageStatusIcon}>
                      {isComplete ? (
                        <CheckCircle2 size={16} color="var(--acc)" />
                      ) : isCurrent ? (
                        <Loader2 size={15} color="var(--acc)" style={{ animation: 'spin 1s linear infinite' }} />
                      ) : (
                        <div style={styles.pendingDot} />
                      )}
                    </div>
                    <span style={{
                      ...styles.stageNameText,
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? 'var(--acc)' : 'var(--ink)'
                    }}>
                      {step.stage}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'inherit',
  },
  header: {
    padding: '16px 36px',
    backgroundColor: 'var(--card)',
    borderBottom: '1px solid var(--line)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoImg: {
    height: '36px',
    width: 'auto',
    objectFit: 'contain',
  },
  badgePill: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--acc)',
    backgroundColor: 'var(--accs)',
    padding: '3px 9px',
    borderRadius: '99px',
  },
  headerStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--mute)',
    fontWeight: '550',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  uploadCard: {
    backgroundColor: 'var(--card)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--r)',
    padding: '36px',
    maxWidth: '680px',
    width: '100%',
    boxShadow: '0 4px 20px -2px rgba(14, 111, 104, 0.08)',
  },
  cardHeader: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--ink)',
    marginBottom: '6px',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '13.5px',
    color: 'var(--mute)',
    lineHeight: 1.5,
  },
  dropZone: {
    border: '2px dashed var(--line)',
    borderRadius: '10px',
    padding: '36px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  uploadIconWrap: {
    width: '54px',
    height: '54px',
    borderRadius: '50%',
    backgroundColor: 'var(--accs)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px',
  },
  dropMainText: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--ink)',
    marginBottom: '4px',
  },
  dropSubText: {
    fontSize: '12px',
    color: 'var(--mute)',
  },
  fileSelectedInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  fileNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  fileName: {
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--acc)',
  },
  fileSize: {
    fontSize: '12px',
    color: 'var(--mute)',
  },
  demoPromptRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '12px',
    marginBottom: '20px',
  },
  demoBtn: {
    fontSize: '12px',
    color: 'var(--acc)',
    fontWeight: 600,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  specsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  specBox: {
    backgroundColor: 'var(--bg)',
    borderRadius: '8px',
    border: '1px solid var(--line)',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  specLabel: {
    fontSize: '9.5px',
    fontWeight: 700,
    color: 'var(--mute)',
    letterSpacing: '0.5px',
  },
  specVal: {
    fontSize: '11.5px',
    fontWeight: 650,
    color: 'var(--ink)',
    marginTop: '2px',
  },
  launchBtn: {
    width: '100%',
    backgroundColor: 'var(--acc)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '14px',
    fontWeight: 650,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 4px 14px rgba(14, 111, 104, 0.28)',
    cursor: 'pointer',
  },
  processingCard: {
    backgroundColor: 'var(--card)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--r)',
    padding: '36px',
    maxWidth: '620px',
    width: '100%',
    boxShadow: '0 4px 20px -2px rgba(14, 111, 104, 0.1)',
  },
  processingHeader: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  processingSpinnerBadge: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'var(--accs)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  processingTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--ink)',
  },
  processingSub: {
    fontSize: '13px',
    color: 'var(--mute)',
    marginTop: '4px',
  },
  progressContainer: {
    marginBottom: '20px',
  },
  progressLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: 650,
    marginBottom: '6px',
  },
  stepCounterText: {
    color: 'var(--acc)',
  },
  progressPercentText: {
    color: 'var(--ink)',
  },
  progressBarBg: {
    height: '8px',
    backgroundColor: 'var(--line)',
    borderRadius: '99px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'var(--acc)',
    transition: 'width 0.12s linear',
  },
  activeStageBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 14px',
    borderRadius: '8px',
    backgroundColor: 'var(--accs)',
    border: '1px solid rgba(14, 111, 104, 0.2)',
    marginBottom: '20px',
  },
  stageDotActive: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--acc)',
    marginTop: '5px',
    flex: 'none',
  },
  activeStageTitle: {
    fontSize: '12.5px',
    fontWeight: 700,
    color: 'var(--acc)',
  },
  activeStageDetail: {
    fontSize: '11.5px',
    color: 'var(--ink)',
    marginTop: '2px',
  },
  stagesFlowList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    borderTop: '1px solid var(--line)',
    paddingTop: '14px',
  },
  stageRowItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 10px',
    borderRadius: '6px',
    transition: 'all 0.2s',
  },
  stageStatusIcon: {
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--line)',
  },
  stageNameText: {
    fontSize: '12.5px',
  }
};
