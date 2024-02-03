import Meal from "../models/meal.js";

export const addMeal = async (req, res) => {
  const newMeal = new Meal(req.body);
    try {
      const addMeal = await newMeal.save();
      return res.status(201).send(addMeal);
    } catch (error) {
      next(error);
    }
  };
