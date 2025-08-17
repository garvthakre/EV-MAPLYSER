import express from 'express';
import { 
  getAllLocationSuggestions,
  getLocationSuggestionById,
  createLocationSuggestion,
  updateLocationSuggestion,
  deleteLocationSuggestion
} from '../controllers/LocationSuggestion.js';

import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getAllLocationSuggestions);  
router.get('/:id', getLocationSuggestionById);  

// Protected (must be logged in):
router.post('/', authMiddleware, createLocationSuggestion);
router.put('/:id', authMiddleware, updateLocationSuggestion);
router.delete('/:id', authMiddleware, deleteLocationSuggestion);

export default router;
