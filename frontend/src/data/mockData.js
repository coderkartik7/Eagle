export const mockProjects = [
  {
    id: "proj-001",
    name: "Suburban Grid Survey Alpha",
    site: "North Sector Valley, Ridge 4",
    droneModel: "DJI Matrice 350 RTK",
    status: "Completed",
    flightAltitude: "65m AGL",
    captureType: "Nadir + 45° Oblique",
    imagesCaptured: 412,
    groundResolution: "1.4 cm/px",
    duration: "18m 42s",
    reconstructionQuality: "Ultra High (NeRF + Photogrammetry)",
    denseCloudPoints: "14.8M",
    meshTriangles: "2.4M",
    date: "2026-09-28",
    previewGradient: "linear-gradient(135deg, #0e6f68 0%, #173634 100%)",
    tags: ["Infrastructure", "Single-Pass", "RTK-Locked"]
  },
  {
    id: "proj-002",
    name: "Industrial Facility Plant B",
    site: "Terminal Complex Pier 9",
    droneModel: "Skydio X10",
    status: "Processing",
    flightAltitude: "45m AGL",
    captureType: "Autonomous Volumetric Scan",
    imagesCaptured: 620,
    groundResolution: "0.9 cm/px",
    duration: "24m 10s",
    reconstructionQuality: "Gaussian Splatting (In-Progress 78%)",
    denseCloudPoints: "28.1M",
    meshTriangles: "Pending",
    date: "2026-09-29",
    previewGradient: "linear-gradient(135deg, #1b3d39 0%, #082623 100%)",
    tags: ["Asset Inspection", "Thermal Overlay", "Real-Time"]
  },
  {
    id: "proj-003",
    name: "Quarry Topography Elevation",
    site: "South Pit Quarry Zone C",
    droneModel: "WingtraOne Gen II",
    status: "Completed",
    flightAltitude: "120m AGL",
    captureType: "Single-Pass Corridor",
    imagesCaptured: 285,
    groundResolution: "2.1 cm/px",
    duration: "14m 15s",
    reconstructionQuality: "DEM + Textured Mesh",
    denseCloudPoints: "9.2M",
    meshTriangles: "1.7M",
    date: "2026-09-26",
    previewGradient: "linear-gradient(135deg, #244d47 0%, #0f2d29 100%)",
    tags: ["Volumetrics", "Mining", "GeoTIFF Export"]
  },
  {
    id: "proj-004",
    name: "Heritage Clock Tower Archival",
    site: "Historic District Square",
    droneModel: "DJI Mavic 3 Enterprise",
    status: "Completed",
    flightAltitude: "30m Orbital",
    captureType: "Cylindrical Multi-tier",
    imagesCaptured: 540,
    groundResolution: "0.6 cm/px",
    duration: "21m 05s",
    reconstructionQuality: "PBR Textured Mesh (8K)",
    denseCloudPoints: "32.6M",
    meshTriangles: "5.1M",
    date: "2026-09-24",
    previewGradient: "linear-gradient(135deg, #094e49 0%, #03211f 100%)",
    tags: ["Preservation", "Photorealistic", "OBJ / GLTF"]
  }
];

export const systemMetrics = {
  totalSurveys: 142,
  reconstructedHours: "384 hrs",
  avgPrecisionMeters: "± 0.012 m",
  activeGpuClusters: "8 Nodes (V100/H100)",
  pipelineLatency: "4.2 min avg",
  storageUsed: "1.42 TB / 10 TB"
};

export const singlePassPipelineSteps = [
  {
    step: "01",
    title: "Trajectory & Telemetry Ingestion",
    desc: "Single-pass flight logs, RTK base station sync, IMU poses, and sensor metadata are verified."
  },
  {
    step: "02",
    title: "Sparse Keypoint Matching",
    desc: "GPU-accelerated SIFT/SuperPoint feature extraction across variable camera orientations."
  },
  {
    step: "03",
    title: "Structure from Motion & Depth Prior",
    desc: "Bundle adjustment optimizes camera intrinsics and resolves spatial camera poses in 3D."
  },
  {
    step: "04",
    title: "Neural Radiance / Gaussian Splatting",
    desc: "Synthesizes continuous volumetric scene radiance directly from single-pass multi-angle frames."
  },
  {
    step: "05",
    title: "Mesh Extraction & Metric Calibration",
    desc: "Watertight Poisson surface reconstruction and metric georeferencing for CAD/GIS export."
  }
];
