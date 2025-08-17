import express from 'express';
import {
  getAllMaintenanceLogs,
  getMaintenanceLogById,
  createMaintenanceLog,
  updateMaintenanceLog,
  deleteMaintenanceLog
} from '../controllers/MaintenanceLogs.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getAllMaintenanceLogs);
router.get('/:id', getMaintenanceLogById);

// Protected endpoints
router.post('/', authMiddleware, createMaintenanceLog);
router.put('/:id', authMiddleware, updateMaintenanceLog);
router.delete('/:id', authMiddleware, deleteMaintenanceLog);

export default router;
