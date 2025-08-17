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
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (for dashboard display)
router.get('/dashboard-stats', getDashboardStats);
router.get('/usage-analytics', getUsageAnalytics);

// Protected routes (require authentication)
router.get('/station-performance', authMiddleware, getStationPerformance);
router.get('/peak-usage', authMiddleware, getPeakUsageAnalysis);
router.get('/revenue-trends', authMiddleware, getRevenueTrends);
router.get('/maintenance-overview', authMiddleware, getMaintenanceOverview);
router.get('/profits-analysis', authMiddleware, getProfitsAnalysis);

export default router;