import express from 'express';
import {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
} from '../controllers/Feedback.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllFeedback);        // Protect if admin-only
router.get('/:id', authMiddleware, getFeedbackById);
router.post('/', authMiddleware, createFeedback);
router.put('/:id', authMiddleware, updateFeedback);
router.delete('/:id', authMiddleware, deleteFeedback);

export default router;
