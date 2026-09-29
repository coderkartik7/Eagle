import React, { useState } from 'react';
import VideoUploadProcessing from './pages/VideoUploadProcessing';
import MissionDashboard from './pages/MissionDashboard';
import './index.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('upload'); // 'upload' | 'dashboard'
  const [videoMeta, setVideoMeta] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2400);
  };

  const handleProcessingComplete = (meta) => {
    setVideoMeta(meta);
    setCurrentPage('dashboard');
    showToast('Mission OP-0927: 3D Model & Telemetry ready');
  };

  return (
    <>
      {currentPage === 'upload' ? (
        <VideoUploadProcessing 
          onProcessingComplete={handleProcessingComplete} 
        />
      ) : (
        <MissionDashboard 
          videoMeta={videoMeta}
          onNavigateUpload={() => setCurrentPage('upload')}
          onToast={showToast}
        />
      )}

      {/* Global Toast Notification */}
      <div 
        id="toast" 
        role="status" 
        className={toastVisible ? 's' : ''}
      >
        {toastMessage}
      </div>
    </>
  );
}
