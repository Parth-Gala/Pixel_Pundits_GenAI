import express from 'express';
import {getRecommendedDiet} from '../controllers/aidiet.js';

const router = express.Router()

// Get Recommended Diet for User
router.get("/diet", getRecommendedDiet);

export default router;