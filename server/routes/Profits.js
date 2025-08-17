import express from 'express';
import {
  getAllProfits,
  getProfitById,
  createProfit,
  updateProfit,
  deleteProfit
} from '../controllers/Profits.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProfits);
router.get('/:id', getProfitById);

// Protected
router.post('/', authMiddleware, createProfit);
router.put('/:id', authMiddleware, updateProfit);
router.delete('/:id', authMiddleware, deleteProfit);

export default router;
