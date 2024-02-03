import FoodItem from '../models/FoodItem.js';
import { createError } from "../utils/error.js";

export const addFood = async (req, res) => {
    const newFood = new FoodItem({
        name: req.body.name,
        servingSize: req.body.servingSize,
        macronutrients: {
            calories: req.body.macronutrients.calories,
            protein: req.body.macronutrients.protein,
            carbs: req.body.macronutrients.carbs,
            fat: {
                total: req.body.macronutrients.fat.total,
                saturated: req.body.macronutrients.fat.saturated,
                unsaturated: req.body.macronutrients.fat.unsaturated,
            }
        },
        ingredients: req.body.ingredients,
        allergens: req.body.allergens,
        tags: req.body.tags,
      });
      
    try {
        await newFood.save();
        const foodId = newFood._id;
        res.status(201).json({ food: newFood, foodId});
    } catch (error) {
        next(createError(401, error.message));
    }
};

export const getFoods = async (req, res) => {
    try {
        const foods = await FoodItem.findById(req.param.id);
        res.status(200).json(foods);
    } catch (error) {
        res.status(404).json(createError(402, error.message ));
    }
};