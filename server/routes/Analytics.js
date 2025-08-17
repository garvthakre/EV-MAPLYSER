// routes/Analytics.js
import express from 'express';
import {
  getDashboardStats,
  getUsageAnalytics,
  getStationPerformance,
  getPeakUsageAnalysis,
  getRevenueTrends,
  getMaintenanceOverview,
  getProfitsAnalysis
} from '../controllers/Analytics.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

// Public routes (for dashboard display)
router.get('/dashboard-stats', getDashboardStats);
router.get('/usage-analytics', getUsageAnalytics);

// Protected routes (require authentication)
router.get('/station-performance',   getStationPerformance);
router.get('/peak-usage',   getPeakUsageAnalysis);
router.get('/revenue-trends',   getRevenueTrends);
router.get('/maintenance-overview',  getMaintenanceOverview);
router.get('/profits-analysis',  getProfitsAnalysis);

export default router;