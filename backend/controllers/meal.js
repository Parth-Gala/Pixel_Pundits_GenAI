import Meal from '../models/Meal.js';
// import FoodItem from '../models/FoodItem';
// import { createError } from "../utils/error.js";
export const addMeal = async (req, res) => {
  const newMeal = new Meal(req.body);
    try {
      const addMeal = await newMeal.save();
      return res.status(201).send(addMeal);
    } catch (error) {
      next(error);
    }
  };

