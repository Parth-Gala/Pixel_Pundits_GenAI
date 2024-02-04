import Meal from "../models/Meal.js";

export const addMeal = async (req, res, next) => {
  // console.log(req.body);
  const newMeal = new Meal(req.body);
    try {
      await newMeal.save();
      const foodId = newMeal._id;
      res.status(201).json({ foodId });
    } catch (error) {
      next(error);
    }
  };
