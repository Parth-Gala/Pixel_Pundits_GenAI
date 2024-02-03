import express from 'express';
import { addFood, getFoods } from '../controllers/food.js';

const router = express.Router()

router.post("/addFood", addFood);

//Get
// router.get("/:id", getFood);

//Get All
router.get("/", getFoods);

export default router;