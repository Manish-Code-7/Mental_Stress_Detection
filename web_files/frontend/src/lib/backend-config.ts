/**
 * Backend API Configuration
 * 
 * Set BACKEND_URL environment variable or it will default to:
 * - Development: http://127.0.0.1:8001
 * - Production: Use NEXT_PUBLIC_BACKEND_URL
 */

export const BACKEND_BASE_URL = 
  process.env.NEXT_PUBLIC_BACKEND_URL || 
  process.env.BACKEND_URL || 
  "http://127.0.0.1:8001";

export const BACKEND_ENDPOINTS = {
  health: `${BACKEND_BASE_URL}/health`,
  predict: `${BACKEND_BASE_URL}/predict`,
  stats: `${BACKEND_BASE_URL}/stats`,
  datasetStats: `${BACKEND_BASE_URL}/dataset-stats`,
  eda: `${BACKEND_BASE_URL}/eda`,
  metrics: `${BACKEND_BASE_URL}/metrics`,
  tests: `${BACKEND_BASE_URL}/tests`,
  figures: `${BACKEND_BASE_URL}/figures`,
} as const;



