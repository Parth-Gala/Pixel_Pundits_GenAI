import express from 'express';
// import { addMeal, updateMeal, deleteMeal, getMeal } from '../controllers/meals.js';
import {addMeal} from '../controllers/meal.js';

const router = express.Router()

router.post("/addMeal", addMeal);

// // Update
// router.put("/:id", updateMeal);

// //Delete
// router.delete("/:id", deleteMeal);

// //Get
// router.get("/:id", getMeal);

// //Get All
// router.get("/", getMeals);

export default router;