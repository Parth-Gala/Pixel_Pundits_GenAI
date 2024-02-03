import express from 'express';
import { addFood, getFoods, getFoodNutrition } from '../controllers/food.js';

const router = express.Router()

router.post("/addFood", addFood);

//Get
// router.get("/:id", getFood);

//Get All
router.get("/", getFoods);

//Get Food Nutritional Content
router.get("/nutrition", getFoodNutrition);

export default router;