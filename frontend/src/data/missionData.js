export const pipelineStagesData = [
  { name: "Frame extraction", tool: "OpenCV · adaptive sampling", initialProgress: 100 },
  { name: "Deblur & quality filter", tool: "DeblurGANv2 · Laplacian check", initialProgress: 100 },
  { name: "Dynamic object masking", tool: "YOLOv8 · RAFT · SAM", initialProgress: 100 },
  { name: "Pose estimation (SfM)", tool: "COLMAP · SuperPoint/SuperGlue", initialProgress: 100 },
  { name: "Dense stereo + depth fill", tool: "COLMAP MVS · MiDaS/DPT", initialProgress: 64 },
  { name: "Meshing & texture", tool: "Poisson · Open3D · MeshLab", initialProgress: 0 },
  { name: "Georeferencing", tool: "Kalman · pyproj · Umeyama", initialProgress: 0 }
];

export const processingStepsSimulation = [
  { 
    stage: "Ingestion & Checksum", 
    desc: "Extracting telemetry stream, timecode alignment & frame checksums...",
    detail: "4K 30fps H.264 stream decoded • 3,410 frames identified" 
  },
  { 
    stage: "Adaptive Frame Extraction", 
    desc: "Running optical flow keyframe selection to eliminate redundant hover frames...",
    detail: "1,284 keyframes selected based on translation baseline" 
  },
  { 
    stage: "Deblur & Quality Filtering", 
    desc: "Laplacian variance inspection & DeblurGANv2 neural sharpening...",
    detail: "212 blurry/high-angular-velocity frames isolated and dropped" 
  },
  { 
    stage: "Dynamic Object & Transient Masking", 
    desc: "YOLOv8 & RAFT optical flow masking vehicles, pedestrians and moving flora...",
    detail: "154 transient foreground elements segmented and masked" 
  },
  { 
    stage: "Pose Estimation & Structure from Motion", 
    desc: "GPU SuperPoint/SuperGlue keypoint matching & bundle adjustment...",
    detail: "99.0% camera poses registered • 0.62px reprojection error" 
  },
  { 
    stage: "Dense Stereo & 3D Gaussian Splatting", 
    desc: "Synthesizing multi-view dense point cloud & 3D Gaussian radiance fields...",
    detail: "4.8M dense points reconstructed • 81% surface verified" 
  },
  { 
    stage: "Georeferencing & Poisson Meshing", 
    desc: "Kalman-fusing GPS/IMU with Umeyama metric scale alignment...",
    detail: "0.42m RMSE without GCPs • WGS84 to UTM 44N transformation verified" 
  }
];

export const confidenceBreakdown = [
  { label: "Roofs", val: 96 },
  { label: "Facades (front)", val: 91 },
  { label: "Roads", val: 88 },
  { label: "Facades (rear)", val: 34 },
  { label: "Under overhangs", val: 22 }
];

export const sceneCleaningStats = {
  maskedCount: 154,
  vehicles: 38,
  people: 112,
  animals: 4,
  motionCheck: "Passed",
  blurredFramesDropped: 212
};

export const missionKpis = [
  { val: "1,284", label: "Frames used of 3,410" },
  { val: "99.0%", label: "Camera poses registered" },
  { val: "0.62 px", label: "Reprojection error" },
  { val: "4.8 M", label: "Dense points" },
  { val: "0.42 m", label: "Georef RMSE, no GCPs" },
  { val: "81%", label: "Surface verified", isVerifiedKpi: true }
];

export const recentMissionsList = [
  { id: "OP-0927", title: "OP-0927 · Riverside Sector", status: "Processing · 64%" },
  { id: "OP-0926", title: "OP-0926 · Bridge approach", status: "Complete · 88% verified · 0.38 m RMSE" },
  { id: "OP-0921", title: "OP-0921 · Flood-damaged block", status: "Complete · 79% verified · 0.51 m RMSE" }
];
