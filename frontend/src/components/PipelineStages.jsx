import React, { useState, useEffect } from 'react';
import { pipelineStagesData } from '../data/missionData';

export default function PipelineStages({ onProgressUpdate }) {
  const [stages, setStages] = useState(pipelineStagesData);
  const [currentProgress, setCurrentProgress] = useState(64);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 99) {
          clearInterval(timer);
          return 99;
        }
        const next = +(prev + 0.4).toFixed(1);
        if (onProgressUpdate) onProgressUpdate(Math.round(next));
        return next;
      });
    }, 900);

    return () => clearInterval(timer);
  }, [onProgressUpdate]);

  return (
    <div className="card" style={{ padding: '16px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 650, marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Pipeline <span className="sub">RTX-class GPU · 78%</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {stages.map((st, idx) => {
          const isFifth = idx === 4; // Dense stereo stage is live
          const progress = isFifth ? Math.min(100, Math.round(currentProgress)) : st.initialProgress;
          const isDone = progress === 100;
          const isActive = progress > 0 && progress < 100;

          return (
            <div 
              key={st.name} 
              style={{
                display: 'flex',
                gap: '10px',
                padding: '8px 0',
                borderTop: idx === 0 ? 'none' : '1px solid var(--line)',
                alignItems: 'flex-start'
              }}
            >
              <span 
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  flex: 'none',
                  marginTop: '1px',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '11px',
                  color: isDone ? '#fff' : (isActive ? 'var(--acc)' : '#fff'),
                  background: isDone ? 'var(--acc)' : (isActive ? '#fff' : 'var(--line)'),
                  border: isActive ? '2px solid var(--acc)' : 'none'
                }}
              >
                {isDone ? '✓' : ''}
              </span>

              <p style={{ flex: 1, minWidth: 0, margin: 0 }}>
                <b style={{ fontSize: '13px', display: 'block', color: 'var(--ink)' }}>{st.name}</b>
                <small style={{ color: 'var(--mute)', display: 'block', fontSize: '12px' }}>{st.tool}</small>
                {isActive && (
                  <div style={{ height: '5px', borderRadius: '9px', background: 'var(--line)', marginTop: '6px', overflow: 'hidden' }}>
                    <i 
                      style={{ 
                        display: 'block', 
                        height: '100%', 
                        background: 'var(--acc)', 
                        borderRadius: '9px', 
                        width: `${progress}%`,
                        transition: 'width 0.4s ease'
                      }} 
                    />
                  </div>
                )}
              </p>

              <small style={{ color: 'var(--mute)', fontSize: '12px' }}>
                {isDone ? 'Done' : (isActive ? `${progress}%` : 'Queued')}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
