import express from 'express';
import {
  getAllUsageLogs,
  getUsageLogById,
  createUsageLog,
  updateUsageLog,
  deleteUsageLog
} from '../controllers/UsageLogs.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getAllUsageLogs);
router.get('/:id', getUsageLogById);

// Protected
router.post('/', authMiddleware, createUsageLog);
router.put('/:id', authMiddleware, updateUsageLog);
router.delete('/:id', authMiddleware, deleteUsageLog);

export default router;
